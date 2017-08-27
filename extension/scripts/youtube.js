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


function delElementById(content){
        if (content === '') return;
        var elementsContentById = document.getElementById(content);
        if (elementsContentById){
                elementsContentById.parentNode.removeChild(elementsContentById);
        }
}

function delElementByClass(content){
        if (content === '') return;
        var elementsContentByClass = document.getElementsByClassName(content);
        if (elementsContentByClass){
            while(elementsContentByClass.length > 0){
                elementsContentByClass[0].parentNode.removeChild(elementsContentByClass[0]);
            }        
        }
}
delElementById("movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles.ytp-endscreen-paginate > div");
delElementById("movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-endscreen-paginate.ytp-show-tiles > button.ytp-button.ytp-endscreen-next");
delElementById("movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-endscreen-paginate.ytp-show-tiles > button.ytp-button.ytp-endscreen-previous");
delElementById("movie_player > div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles");
delElementById("watch7-sidebar-contents");
delElementById("feed");
delElementById("appbar-content");
delElementById("watch-discussion");

delElementByClass("");
