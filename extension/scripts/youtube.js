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
 
 
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitJQ() {
  await sleep(1111);
    $(document).ready(function(){
        // $("#items").remove();
        // $("#continuations").remove();
        $("#comments").remove();
        // $("#page-manager > ytd-browse").remove();
        // $("#contents > ytd-item-section-renderer").remove();
        // $("#contents > ytd-vertical-channel-section-renderer").remove();
    });
}
waitJQ();
