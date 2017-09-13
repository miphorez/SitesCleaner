"use strict";

var DEBUG_REQUEST = false;

var blackListRequests = [

    //------------- onlinemultfilmy.ru -------------
        // "yandex", "vk.com/share.php", 
        "platform.twitter.com", "syndication.twitter.com",
        "onedrive.su", 
        "yastatic", "counter", "static.doubleclick.net",
        // "connect.ok", "connect.mail.ru"

        // "clients6.google.com", "www.googleapis.com",
        // "https://www.google.by/complete/search?client=chrome-omni&gs_ri=chrome-ext-ansg",
        // "googleads.g.doubleclick.net"

        "marketgid.com"
    ];

function forEachInArray(strForFinding){
    var flYes = false;
    blackListRequests.forEach(function(entry) {
        if (strForFinding.indexOf(entry) !== -1){
            flYes = true;
            if (!DEBUG_REQUEST) console.log(entry);
            return;
        }
    });
    return flYes;
}    

(function(window, chrome) {

    // запрет нежелательных обращений для всех сайтов
    chrome.webRequest.onBeforeRequest.addListener( function(details){
            if (DEBUG_REQUEST)  console.log(details.url);
            return { cancel: forEachInArray(details.url) };
        },
        {urls: [
            "<all_urls>"
        ]},
        ["blocking"]
    );

    function UrlForControl(url, js, unClear, isJQuery) {
        this.url = url;           //контролируемый домен  
        this.js = js;             //имя используемого скрипта
        this.unClear = unClear;   //true - использовать режим с отключенной очисткой
        this.isJQuery = isJQuery; //true - использовать язык jquery
    };

    var arrayURLs = [
        new UrlForControl('online-life', 'onlinelife.js', true, false),
        new UrlForControl('onlinemultfilmy.ru', 'onlinemultfilmy.js', true, false),
        new UrlForControl('twitter.com', 'twitter.js', true, true),
        new UrlForControl('vk.com', 'vkcom.js', false, false),
        new UrlForControl('youtube.com', 'youtube.js', true, true)
    ];    

     // * Синхронизация данных, в настоящее время только параметры
    var sync = {
        enable: false
                
    };

     // * Переключатель состояния enable/disable
    function toggle() {
        sync.enable = !sync.enable;
        chrome.storage.sync.set(sync);
        update();
        chrome.tabs.reload();
    }

    function isExecJScript(){
        return sync.enable;
    }

    // Следите за изменением URL-адреса вкладки или перезагрузки страницы
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.url || changeInfo.status) {
            update();
        }
        if (changeInfo.status === 'complete'){
            checkURL(tab, tabId);
        }
    });

    function isControlledSite(isEnable, strTabURL) {
        var flYes = false;
        arrayURLs.forEach(function(item, index, array) {
            var strUrl = item.url;
            if (strTabURL.indexOf(strUrl) !== -1){
                changeIcon(isEnable ? "" : "r");
                flYes = true;
                return true;
            }
        });
        if (flYes) return;
        changeIcon('off');
        return false;
    }

    function changeIcon(status) {
        chrome.browserAction.setIcon({
        path: "images/SiteCleaner(38)" + status + ".png"
        });
    }

    function isSiteUnClearing(tab){
        var flYes = false;
        arrayURLs.forEach(function(item, index, array) {
            if (tab.url.indexOf(item.url) !== -1){
                flYes = item.unClear;
            }
        });
        return flYes;
    }

    function checkURL(tab, tabId) {
        if (!isExecJScript() && isSiteUnClearing(tab)) return;

        arrayURLs.forEach(function(item, index, array) {
          if (tab.url.indexOf(item.url) !== -1){
            if (item.isJQuery) {
                chrome.tabs.executeScript(tabId, {
                    file: "scripts/jquery-3.2.1.min.js",
                    allFrames: true,
                    matchAboutBlank: true,
                    runAt: "document_start"
            }, function() {chrome.runtime.lastError; });
            }
            chrome.tabs.executeScript(tabId, {
                file: "scripts/"+item.js,
                allFrames: true,
                matchAboutBlank: true,
                runAt: "document_start"
            }, function() {chrome.runtime.lastError; });
            return;
          }
        });

    }


    // Команды от горячих клавиш - в настоящее время только переключатель активности контроля
    chrome.commands.onCommand.addListener(function(command) {
        switch (command) {
            case "toggle":
                return toggle();
        }
    });


    // Следите за изменением настроек
    chrome.storage.onChanged.addListener(function(changes, areaName) {
        for (var key in changes) {
            sync[key] = changes[key].newValue;
        }
        update();
    });

     // * Обновить значок, название и действие
    function update() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // if (tabs.length != 0){           
                isControlledSite(sync.enable, tabs[0].url);
                // chrome.browserAction.setTitle({title: chrome.i18n.getMessage(front ? "extTitleEnabled" : "extTitleDisabled")});
                // chrome.browserAction.setPopup({popup: sync.enable ? "../options/popup.html" : ""});
            // }
        });
    }

     // * Вызывается при запуске - кешируйте нашу информацию
    function startup() {
        chrome.storage.sync.get(null, function(items) {
            for (var key in items) {
                sync[key] = items[key];
            }
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

