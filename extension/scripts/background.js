(function(window, chrome) {
    "use strict";

    var arrayURLs = {
        'online-life': 'onlinelife.js', 
        'vk.com': 'vkcom.js', 
        'onlinemultfilmy.ru': 'onlinemultfilmy.js', 
        'twitter.com': 'twitter.js', 
        'youtube.com': 'youtube.js' 
      };


     // * Тайм-аут используется для повторного использования, если необходимо
    var updateTimeout = -1;

     // * Данные времени выполнения, в настоящее время только клавиша ctrl
    var local = {
        ctrl: false
    };

     // * Синхронизация данных, в настоящее время только параметры
    var sync = {
        front: false,
        toggle: false,
        ctrl: false,
        badge: false,
        ignore: []      // Игнорируйте других, поскольку они нам не нужны.
                
    };

    function isExecJScript(){
        return sync.front === 0;
    }

    // Следите за изменением URL-адреса вкладки или перезагрузки страницы
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.url || changeInfo.status) {
            ctrlInTab(tabId);
            update();
        }
        if ((changeInfo.status === 'complete') && isExecJScript()){
            checkURL(tab, tabId);
        }
    });

    function isControlledSite(tab) {
        var front = isEnabled(tab);

        for (var url in arrayURLs) {
          if (tab.url.indexOf(url) !== -1){
            changeIcon(front ? "" : "r");
            return true;
          }
        }
        changeIcon('off');
        return false;
    }

    function changeIcon(status) {
        chrome.browserAction.setIcon({
        path: "images/SiteCleaner(48)" + status + ".png"
        });
    }

    function checkURL(tab, tabId){

        for (var iURL in arrayURLs) {
          if (tab.url.indexOf(iURL) !== -1){
            chrome.tabs.executeScript(tabId, {
                file: "scripts/jquery-3.2.1.min.js",
                allFrames: true,
                matchAboutBlank: true,
                runAt: "document_start"
            }, function() {chrome.runtime.lastError; });
            chrome.tabs.executeScript(tabId, {
                file: "scripts/"+"css_"+arrayURLs[iURL],
                allFrames: true,
                matchAboutBlank: true,
                runAt: "document_start"
            }, function() {chrome.runtime.lastError; });
            chrome.tabs.executeScript(tabId, {
                file: "scripts/"+arrayURLs[iURL],
                allFrames: true,
                matchAboutBlank: true,
                runAt: "document_start"
            }, function() {chrome.runtime.lastError; });
            return;
          }
        }

    }

     // * Проверьте, игнорируется ли домен, если возможно
     // * @param {Object} tab
    function isIgnored(tab) {
        var iURL = tab && tab.url.match(/https?:\/+([^\/]+)/);

        return iURL ? sync.ignore.indexOf(iURL[1].toLowerCase()) >= 0 : null;
    }

    // Следите за созданием новых вкладок, установите фокус, если включено
    chrome.tabs.onCreated.addListener(function(tab) {
        ctrlInTab(tab.id);
        if (tab.url !== "chrome://newtab/") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (isEnabled(tab, tabs[0])) {
                    chrome.tabs.update(tab.id, {selected: true});
                }
            });
        }
    });


     // * Включить включенное состояние
    function toggle() {
        sync.front = sync.front ? 0 : -1;
        // alert(sync.front);
        chrome.storage.sync.set(sync);
        update();
        chrome.tabs.reload();
    }

     // * Переключить игнорирование текущего домена
    function ignore() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var iURL = tabs[0].url.match(/.*?:\/+([^\/]+)/)[1];

            if (iURL && iURL.length) {
                var index = sync.ignore.indexOf(iURL);

                if (index >= 0) {
                    sync.ignore.splice(index, 1);
                } else {
                    sync.ignore.push(iURL);
                    sync.ignore.sort(function(a, b) {
                        return a.replace(/^www\./i, "") - b.replace(/^www\./i, "");
                    });
                }
                chrome.storage.sync.set(sync);
                update();
            }
        });
    }

    // Команды от горячих клавиш - в настоящее время только переключатель активности контроля
    chrome.commands.onCommand.addListener(function(command) {
        switch (command) {
            case "toggle":
                return toggle();
            case "ignore":
                return ignore();
        }
    });

     // * Внесите сценарий содержимого
     // * @param {Number} tabId
    function ctrlInTab(tabId) {
        if (sync.ctrl) {
            chrome.tabs.executeScript(tabId, {
                file: "",
                allFrames: true,
                matchAboutBlank: true,
                runAt: "document_start"
            }, function() {
                chrome.runtime.lastError; // Не беспокойтесь, если мы не сможем перехватить вкладку
            });
        }
    }

     // * Внесите сценарий содержимого, чтобы следить за клавишей вкладки во всех вкладках 
     // * (Которые этого еще не сделали).
    function ctrlInAllTabs() {
        chrome.tabs.query({}, function(tabs) {
            for (var i in tabs) {
                ctrlInTab(tabs[i].id);
            }
        });
    }

    // Следите за изменением настроек
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        var storage = areaName === "local" ? local : sync;
        for (var key in changes) {
            storage[key] = changes[key].newValue;
        }
        if (storage === sync && changes.sync && changes.sync.newValue) {
            ctrlInAllTabs();
        }
        update();
    });

     // * Проверьте, включены ли мы
     // * @param {Object} oldTab Текущая существующая вкладка
     // * @param {Object} newTab Вкладка открыта или не определена, если вы просто проверяете отображение и т. Д.
     // * @returns {Boolean}
    function isEnabled(oldTab, newTab) {
        var now = Date.now(),
                time = sync.front,
                ignored = isIgnored(oldTab) && (!newTab || isIgnored(newTab));

        if (!sync.badge) {
            chrome.browserAction.setBadgeText({text: ignored ? "!" : ""});
        }
        window.clearTimeout(updateTimeout);
        if (time > now) {
            updateTimeout = setTimeout(update, time - now + 50);
            ignored = true;
        } else if (time === -1) {
            ignored = true;
        }
        return (!sync.ctrl || !local.ctrl) && !ignored;
    }

     // * Обновить значок, название и действие
    function update() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var front = isEnabled(tabs[0]);
            if (sync.toggle) {
                front = sync.front >= 0;
            }
            isControlledSite(tabs[0]);
            // chrome.browserAction.setTitle({title: chrome.i18n.getMessage(front ? "extTitleEnabled" : "extTitleDisabled")});
            // chrome.browserAction.setPopup({popup: sync.toggle ? "" : "popup.html"});
        });
    }

     // * Вызывается при запуске - кешируйте нашу информацию
    function startup() {
        chrome.storage.sync.get(null, function(items) {
            for (var key in items) {
                sync[key] = items[key];
            }
            ctrlInAllTabs();
            update();
        });
    }

    // Нажмите кнопку для отключения, если мы не используем меню (по выбору)
    chrome.browserAction.onClicked.addListener(toggle);

    // Обновить отображение при изменении активной вкладки
    chrome.tabs.onActivated.addListener(update);

    // Когда мы были установлены в запущенном браузере
    chrome.runtime.onInstalled.addListener(startup);

    // Когда мы уже установлены и запускаем браузер
    chrome.runtime.onStartup.addListener(startup);

}(window, chrome));

chrome.runtime.onMessageExternal.addListener(function (req, sender, sendResponse) {
    if (req.method === 'getLocalStorage') {
console.info("sendResponse");
        sendResponse({globalStatus: "goodbye"});
    }
});

