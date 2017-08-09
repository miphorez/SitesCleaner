'use strict';
function delElementById(content){
        var elementsContentById = document.getElementById(content);
        if (elementsContentById){
                elementsContentById.parentNode.removeChild(elementsContentById);
        }
}

function delElementByClass(content){
        var elementsContentByClass = document.getElementsByClassName(content);
        if (elementsContentByClass){
            while(elementsContentByClass.length > 0){
                elementsContentByClass[0].parentNode.removeChild(elementsContentByClass[0]);
            }        
        }
}

delElementById("right");
delElementById("back-top-x");
delElementById("vk_groups");
delElementById("films");
delElementById("mc-container");

delElementByClass("block_title");
delElementByClass("post-title");
delElementByClass("footer-wrap");
delElementByClass("nav");
delElementByClass("related-block");
delElementByClass("subs-cont-block");
delElementByClass("favorites-title");
delElementByClass("div.favorites-nav");
delElementByClass("");
        
(function controlContentOnPages(){
        var elementsNoindex = document.getElementsByTagName('noindex');
        var iNoindex =0;
        while(iNoindex < elementsNoindex.length) {
            var attrId = elementsNoindex[iNoindex].querySelector('div[id="mklink-text"]');
            if (attrId === null) {
                elementsNoindex[iNoindex].parentNode.removeChild(elementsNoindex[iNoindex]);
                continue;
            }
            iNoindex++;
        }

}());   
