'use strict';
function changeIcon(status) {
        chrome.browserAction.setIcon({
        path: {
            19: "images/SiteCleaner(19)" + status + ".png",
            38: "images/SiteCleaner(38)" + status + ".png"
        }
    });
}
function getStatus() {
    return localStorage.getItem('onlinelifecleaner_extension_status') === 'true';
}
function setStatus(status) {
    localStorage.setItem('onlinelifecleaner_extension_status', "" + status);
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status === 'complete' && tab.url.indexOf('online-life') > -1) {
        chrome.tabs.executeScript(tabId, {
            file: "scripts/inject.js"
        });
    }
});
if (getStatus() === undefined) {
    setStatus(false);
}
if (getStatus()) {
    changeIcon('_off');
}
chrome.browserAction.onClicked.addListener(function (tab) {
    if (tab.url.indexOf('online-life') === -1) {
        return;
    }
    var status = getStatus();
    console.log("status: "+status);
    setStatus(!status);
    changeIcon((!status) ? '_off' : '');
    chrome.tabs.reload();
});
chrome.runtime.onMessage.addListener(function (req, sender, sendResponse) {
          if (req.method === 'getLocalStorage') {
        sendResponse({
            globalStatus: getStatus()
        });
    }
});
