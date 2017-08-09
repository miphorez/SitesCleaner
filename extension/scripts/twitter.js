'use strict';

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
delElementById("page-container > div.dashboard.dashboard-left > div.module.Trends.trends");
delElementById("page-container > div.dashboard.dashboard-right");
delElementById("page-container > div.dashboard.dashboard-left > div.Footer.module.roaming-module");

delElementByClass("MoveableModule");
delElementByClass("flex-module-header");
delElementByClass("u-sizeFit");
delElementByClass("flex-module-inner");

(function controlContentOnTwitter(){
    var attrId = document.querySelector('div[data-section-id="wtf"]');
    if (attrId !== null) {
        attrId.setAttribute('class', 'noclass');
    }

    attrId = document.querySelector('div[class="flex-module import-prompt"]');
    if (attrId !== null) {
        attrId.innerHTML = '';
    }

    attrId = document.querySelector('div[class="flex-module import-prompt"]');
    if (attrId !== null) {
        attrId.style.padding = "0";
    }

    attrId = document.querySelector('div[class="flex-module"]');
    if (attrId !== null) {
        attrId.style.padding = "0";
    }

    var elementsByClass = document.getElementById("stream-items-id");
    if (elementsByClass){
            var elementsLI = elementsByClass.getElementsByTagName('li');
            var cntLI = 0;
            while (cntLI < elementsLI.length) {
                var hrefA = elementsLI[cntLI].getAttribute('class');
                if ((hrefA.indexOf("WtfLargeCarouselStreamItem") !== -1) 
                    ){
                	console.log("WtfLargeCarouselStreamItem");
                    elementsLI[cntLI].parentNode.removeChild(elementsLI[cntLI]);
                    continue;
                }
                cntLI++;
            }
    }
}());   

(function addLinkForChangeAkkaunt(){
    var divlink =document.getElementById('link_to_accaunt'); 
    console.log(divlink);
    if (divlink) return;
    var container =document.getElementById('page-container').children[0]; 
    var div=document.createElement('div');   
    div.setAttribute('id','link_to_accaunt');
    div.setAttribute('class','twitter_link_to_accaunt');
    var a=document.createElement('a');   
    a.setAttribute('href',"https://support.twitter.com");
    a.innerText = 'Справочный центр';
    div.appendChild(a);
    container.appendChild(div);
}());   


