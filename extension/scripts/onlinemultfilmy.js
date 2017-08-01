'use strict';

function delContent(){
        var elementsContentByClass = document.getElementsByClassName('post');
        if (elementsContentByClass){
            console.log(elementsContentByClass); 
            while(elementsContentByClass.length > 0){
                elementsContentByClass[0].parentNode.removeChild(elementsContentByClass[0]);
            }        
        }
}

(function controlContentOnPages(){
    var elementsByClass = document.getElementsByClassName('age_icon age_icon_16');
    if (elementsByClass.length>0){
        delContent();
        return;
    }
    elementsByClass = document.getElementsByClassName('age_icon age_icon_18');
    if (elementsByClass.length>0){
        delContent();
        return;
    }

    //категория фильма
    elementsByClass = document.getElementsByClassName('post-categories');
    if (elementsByClass.length>0){
        var eCategoriesA = elementsByClass[0].getElementsByTagName('a');
            var cntCategoriesA = 0;
            while (cntCategoriesA < eCategoriesA.length) {
                var hrefCategoriesA = eCategoriesA[cntCategoriesA].getAttribute('href');
                console.log(hrefCategoriesA);
                if ((hrefCategoriesA.indexOf("shoujo-ai") !== -1) ||
                    (hrefCategoriesA.indexOf("vampiry") !== -1) ||
                    (hrefCategoriesA.indexOf("demony") !== -1) ||
                    (hrefCategoriesA.indexOf("shonen-ai") !== -1) ||
                    (hrefCategoriesA.indexOf("uzhasy") !== -1) ||
                    (hrefCategoriesA.indexOf("etti") !== -1) ||
                    (hrefCategoriesA.indexOf("zombi") !== -1)
                    ){
                        delContent();
                        return;
                }
                cntCategoriesA++;
            }
    }

    //меню выбора жанров аниме
    elementsByClass = document.getElementsByClassName('genre-menu');
    if (elementsByClass.length>0){
        console.log(elementsByClass);
        var elementsUL = elementsByClass[0].getElementsByTagName('ul');
        for(var iUL =0; iUL<elementsUL.length; iUL++) {
            var elementsLI = elementsUL[iUL].getElementsByTagName('li');
            var cntLI = 0;
            while (cntLI < elementsLI.length) {
                var elementsA = elementsLI[cntLI].getElementsByTagName('a');
                var hrefA = elementsA[0].getAttribute('href');
                console.log(hrefA);
                if ((hrefA.indexOf("shoujo-ai") !== -1) ||
                    (hrefA.indexOf("vampiry") !== -1) ||
                    (hrefA.indexOf("demony") !== -1) ||
                    (hrefA.indexOf("shonen-ai") !== -1) ||
                    (hrefA.indexOf("uzhasy") !== -1) ||
                    (hrefA.indexOf("etti") !== -1) ||
                    (hrefA.indexOf("zombi") !== -1)
                    ){
                    elementsLI[cntLI].parentNode.removeChild(elementsLI[cntLI]);
                    continue;
                }
                cntLI++;
            }
        }
        return;
    }
// for(var ii =0; ii<posts.length; ii++) {
    //         if(posts[ii].innerText.search(textArr) > 0) {
    //             var thepost = document.getElementsByClassName('feed_row')[ii].children[0];
    //             var idToDel = thepost.getAttribute('id').split('post')[1];
    //             var delElement = document.getElementById('post'+idToDel);
    //             if(delElement) {
    //                 // console.log(delElement);
    //                 delElement.parentElement.removeChild(delElement);
    //             }
    //         }
    // }
}());   
