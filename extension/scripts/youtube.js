'use strict';

(function injectJS(document) {
    var s = document.createElement('script')
    s.src = chrome.extension.getURL('scripts/stopautoplay.js')
    s.onload = function () {
        this.parentNode.removeChild(this);
        s = undefined;
    }
    document.documentElement.appendChild(s)
}(document));
