'use strict';

$("#page-container > div.dashboard.dashboard-right").remove();
$(".u-sizeFit").remove();
$(".MoveableModule").remove();
$("#page-container > div.dashboard.dashboard-left > div.module.Trends.trends").remove();
$("#page-container > div.dashboard.dashboard-left > div.Footer.module.roaming-module").remove();
$(".flex-module").remove();
$("#front-container > div.front-bg").remove();
$("#timeline > div.stream-container.conversations-enabled.js-request-more-stream-items > div.stream > div.stream-footer > div > div.HomeEmptyTimeline").remove();

(function controlContentOnTwitter(){
    var attrId = document.querySelector('div[data-section-id="wtf"]');
    if (attrId !== null) {
        attrId.setAttribute('class', 'noclass');
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
    if (divlink != null) return;
    var container =$('#page-container > div.dashboard.dashboard-left'); 
    console.log(container);
    if (container.length == 0) {
        console.log("container = 0");
        container =$('#page-container > div.AppContainer > div > div > div.Grid-cell.u-size1of3.u-lg-size1of4 > div > div > div'); 
        console.log("container.length = "+container.length);
    }    
    $('<div/>', {
        id: 'link_to_accaunt',
        class: 'twitter_link_to_accaunt',
    }).appendTo(container);
    $('<a/>', {
        href: 'https://twitter.com/logout',
        text: 'Выйти из аккаунта'
    }).appendTo("#link_to_accaunt");

}());   


