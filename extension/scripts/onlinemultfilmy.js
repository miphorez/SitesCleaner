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

delElementById("sidebar");
delElementById("M51769Composite618594");
delElementById("bottom-search");
delElementById("add_favorite_tooltip");
delElementById("content > div > div:nth-child(17)");

delElementByClass("ggd_box");
delElementByClass("buttons-top");
delElementByClass("buttons-row");
delElementByClass("yawidget");
delElementByClass("link_text");
delElementByClass("bottom-line");
delElementByClass("soc-buttons");
delElementByClass("comments-box");
delElementByClass("warn");


(function controlContentOnPages(chrome){

    var elementsByClass = document.getElementsByClassName('age_icon age_icon_16');
    if (elementsByClass.length>0){
        delElementByClass('post');
        return;
    }
    elementsByClass = document.getElementsByClassName('age_icon age_icon_18');
    if (elementsByClass.length>0){
        delElementByClass('post');
        return;
    }

    //реклама игр
    var eDivByGame = document.getElementsByTagName('div');
    var cntDivByGame = 0;
    var lastDivByGame = null;
    while (cntDivByGame < eDivByGame.length) {
        var flYes = false;
        var eImgByGame = eDivByGame[cntDivByGame].getElementsByTagName('a');
        var cntImgByGame = 0;
        while (cntImgByGame < eImgByGame.length) {
            var hrefImgByGame = eImgByGame[cntImgByGame].getAttribute('href');
            // console.log(hrefImgByGame);

            if (hrefImgByGame != null)
                if ((hrefImgByGame.indexOf("gamezgid.ru") !== -1)
                    ){
                        console.log(hrefImgByGame);
                    flYes = true;
                    break;
                }

            cntImgByGame++;
        }

        if (flYes){
            console.log(eDivByGame[cntDivByGame]);
            lastDivByGame = eDivByGame[cntDivByGame];
        }

        cntDivByGame++;
    }
    if (lastDivByGame != null) lastDivByGame.parentNode.removeChild(lastDivByGame);

    //категория фильма
    elementsByClass = document.getElementsByClassName('post-categories');
    if (elementsByClass.length>0){
        var eCategoriesA = elementsByClass[0].getElementsByTagName('a');
            var cntCategoriesA = 0;
            while (cntCategoriesA < eCategoriesA.length) {
                var hrefCategoriesA = eCategoriesA[cntCategoriesA].getAttribute('href');
                // console.log(hrefCategoriesA);
                if ((hrefCategoriesA.indexOf("shoujo-ai") !== -1) ||
                    (hrefCategoriesA.indexOf("vampiry") !== -1) ||
                    (hrefCategoriesA.indexOf("demony") !== -1) ||
                    (hrefCategoriesA.indexOf("shonen-ai") !== -1) ||
                    (hrefCategoriesA.indexOf("uzhasy") !== -1) ||
                    (hrefCategoriesA.indexOf("etti") !== -1) ||
                    (hrefCategoriesA.indexOf("zombi") !== -1)
                    ){
                        delElementByClass('post');
                        break;
                }
                cntCategoriesA++;
            }
    }

    //меню выбора жанров аниме
    elementsByClass = document.getElementsByClassName('genre-menu');
    if (elementsByClass.length>0){
        // console.log(elementsByClass);
        var elementsUL = elementsByClass[0].getElementsByTagName('ul');
        for(var iUL =0; iUL<elementsUL.length; iUL++) {
            var elementsLI = elementsUL[iUL].getElementsByTagName('li');
            var cntLI = 0;
            while (cntLI < elementsLI.length) {
                var elementsA = elementsLI[cntLI].getElementsByTagName('a');
                var hrefA = elementsA[0].getAttribute('href');
                // console.log(hrefA);
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
    }
}(chrome));   
