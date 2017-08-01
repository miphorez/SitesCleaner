'use strict';
(function controlContentOnTwitter(){

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
    // div.innerText = 'hi';
    var a=document.createElement('a');   
    a.setAttribute('href',"https://support.twitter.com");
    a.innerText = 'Справочный центр';
    div.appendChild(a);
    container.appendChild(div);
}());   


