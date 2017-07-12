'use strict';
chrome.runtime.sendMessage({ method: 'getLocalStorage' }, function (res) {
    console.log(res.globalStatus);
    });


