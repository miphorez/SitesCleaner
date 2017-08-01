'use strict';
    
$("#page-container > div.dashboard.dashboard-left > div.module.Trends.trends").remove();
$("#page-container > div.dashboard.dashboard-right").remove();
$("#page-container > div.dashboard.dashboard-left > div.Footer.module.roaming-module").remove();
$("div.MoveableModule").remove();

$(".flex-module-header").remove();
$("p.u-sizeFit").remove();
$("p.flex-module-inner").remove();
$('div[data-section-id="wtf"]').attr('class', 'noclass');
$('div[class="flex-module import-prompt"]').html('');

$('div[class="flex-module import-prompt"]').css({
                "padding": "0"
                });

$('div[class="flex-module"]').css({
                "padding": "0"
                });


