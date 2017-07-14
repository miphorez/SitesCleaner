'use strict';
function changeIcon(status) {
        chrome.browserAction.setIcon({
        path: {
            19: "images/SiteCleaner(19)" + status + ".png"
        }
    });
}

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){
    isControlledSite(tab);
  });
});

function isControlledSite(tab) {
    if ((tab.url.indexOf('online-life') !== -1) || 
        (tab.url.indexOf('youtube.com') !== -1)) {
        changeIcon('');
        return true;
    }
    changeIcon('_disable');
    return false;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo && changeInfo.status === 'complete' && tab.url.indexOf('online-life') !== -1) {
        chrome.tabs.executeScript(tabId, {
            file: "scripts/onlinelife.js"
        });
    }
});
