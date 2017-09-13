'use strict';

$("#page-container > div.dashboard.dashboard-right").remove();
$(".u-sizeFit").remove();
$(".MoveableModule").remove();
$("#page-container > div.dashboard.dashboard-left > div.module.Trends.trends").remove();
$("#page-container > div.dashboard.dashboard-left > div.Footer.module.roaming-module").remove();
$(".flex-module").remove();
$("#front-container > div.front-bg").remove();
$("#timeline > div.stream-container.conversations-enabled.js-request-more-stream-items > div.stream > div.stream-footer > div > div.HomeEmptyTimeline").remove();
$("#MoveableModule").css("display","none !important");
$("#MoveableModule").css("visibility","hidden !important");

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


function aniShowHide (objName) {
 if ( $(objName).css('display') == 'none' ) {
 $(objName).animate({height: 'show'}, 700);
 } else {
 $(objName).animate({height: 'hide'}, 300);
 }
}

var strChangeAccount = ''
+'<div id="switch_account">'
// +'<a id="a_change_account" href="#">Сменить аккаунт</a>'
+'<a id="a_change_account" href="#">switch account</a>'
+'<div id="div_change_account" class="change_account" style="display: none">'
+'<form action="https://twitter.com/sessions" class="t1-form signin" method="post">'
+'    <div class="username field">'
+'      <input type="text" id="signin-email" class="text-input email-input" name="session[username_or_email]" autocomplete="username" placeholder="Телефон, адрес электронной почты или имя пользователя ">'
+'    </div>'
+''
+'    <table class="flex-table password-signin">'
+'      <tbody>'
+'      <tr>'
+'        <td class="flex-table-primary">'
+'          <div class="password flex-table-form">'
+'            <input type="password" id="signin-password" class="text-input flex-table-input" name="session[password]" placeholder="Пароль" autocomplete="current-password">'
+'          </div>'
+'        </td>'
+'        <td class="flex-table-secondary">'
+'          <button type="submit" class="submit EdgeButton EdgeButton--medium EdgeButton--secondary flex-table-btn js-submit">'
+'            Войти'
+'          </button>'
+'        </td>'
+'      </tr>'
+'      </tbody>'
+'    </table>'
+''
+'    <input type="hidden" name="return_to_ssl" value="true">'
+''
+'    <input type="hidden" name="scribe_log">'
+'    <input type="hidden" name="redirect_after_login" value="/">'
+'    <input type="hidden" value="84ac3b0e49cead0502852f6e0b92db48bc0fc188" name="authenticity_token">'
+'      <input type="hidden" name="ui_metrics" autocomplete="off" value="{&quot;rf&quot;:{&quot;a9a533fb73036c1fcc82ea65d90d0c5ce4ff6f1be68cb42c4f40c5ffe1a4739d&quot;:-86,&quot;a197daf907a45d5fdb4b3e1fb20f8997e9a908a9def64824c150d111a13264d5&quot;:-35,&quot;ac1f4a44a6607c1620c755a30a8b05545e6e7433d964ff77a7cd0a5b3f00d7d7&quot;:-1,&quot;a2204b593850cebcc9ce6ba2b61f464734efc30e5d4566b6f22085df1b9f3eab&quot;:0},&quot;s&quot;:&quot;BDUXzPhZsAXGLeiyzMNIFG4n9R4GlnlGp9x2Arr-qdx3G4QP8roE_Sz30b3O7UJD63LMtN3tEGT1WK3QJJK7DH0QjgqxV60a-8U5HYFRrp86VJk2UYgKs_VpQ2WB62BsIQ3_MMmVTdwfdbB_0Rvt4XGIuGtF8xJgC6XbsPiHAkmFtiqJi5SFM3vcLnWLsxqSjPBU2Us_wVLZ4NZSPvrO5JEL0b0Rs20QxcXUcRxqMxkwJYc5qlSoxO5CbbZ-hE7AxcTA-jsko3kKKKeYrgvC5mgTO_we5xHc9wQkvaAOsDiZvyMOUOgcskkb6p7kNjNbRlWgh9u79H0bG0Hs8qrWeAAAAV53kc38&quot;}">'
+'      <script src="/i/js_inst?c_name=ui_metrics" async=""></script>'
+'  </form>'
+'</div>'
+'</div>';

var strSwitchAccount = ''
// +'<div id="switch_account">'
// +'<a id="a_change_account" href="#">Сменить аккаунт</a>'
// +'<a id="a_change_account" href="#">switch account</a>'
// +'<div id="div_change_account" class="change_account" style="display: none">'
+'<form action="https://twitter.com/sessions" class="t1-form signin" method="post">'
+'    <div class="username field">'
+'      <input type="text" id="signin-email" class="text-input email-input" name="session[username_or_email]" autocomplete="username" placeholder="Телефон, адрес электронной почты или имя пользователя ">'
+'    </div>'
+''
+'    <table class="flex-table password-signin">'
+'      <tbody>'
+'      <tr>'
+'        <td class="flex-table-primary">'
+'          <div class="password flex-table-form">'
+'            <input type="password" id="signin-password" class="text-input flex-table-input" name="session[password]" placeholder="Пароль" autocomplete="current-password">'
+'          </div>'
+'        </td>'
+'        <td class="flex-table-secondary">'
+'          <button type="submit" class="submit EdgeButton EdgeButton--medium EdgeButton--secondary flex-table-btn js-submit">'
+'            Войти'
+'          </button>'
+'        </td>'
+'      </tr>'
+'      </tbody>'
+'    </table>'
+''
+'    <input type="hidden" name="return_to_ssl" value="true">'
+''
+'    <input type="hidden" name="scribe_log">'
+'    <input type="hidden" name="redirect_after_login" value="/">'
+'    <input type="hidden" value="84ac3b0e49cead0502852f6e0b92db48bc0fc188" name="authenticity_token">'
+'      <input type="hidden" name="ui_metrics" autocomplete="off" value="{&quot;rf&quot;:{&quot;a9a533fb73036c1fcc82ea65d90d0c5ce4ff6f1be68cb42c4f40c5ffe1a4739d&quot;:-86,&quot;a197daf907a45d5fdb4b3e1fb20f8997e9a908a9def64824c150d111a13264d5&quot;:-35,&quot;ac1f4a44a6607c1620c755a30a8b05545e6e7433d964ff77a7cd0a5b3f00d7d7&quot;:-1,&quot;a2204b593850cebcc9ce6ba2b61f464734efc30e5d4566b6f22085df1b9f3eab&quot;:0},&quot;s&quot;:&quot;BDUXzPhZsAXGLeiyzMNIFG4n9R4GlnlGp9x2Arr-qdx3G4QP8roE_Sz30b3O7UJD63LMtN3tEGT1WK3QJJK7DH0QjgqxV60a-8U5HYFRrp86VJk2UYgKs_VpQ2WB62BsIQ3_MMmVTdwfdbB_0Rvt4XGIuGtF8xJgC6XbsPiHAkmFtiqJi5SFM3vcLnWLsxqSjPBU2Us_wVLZ4NZSPvrO5JEL0b0Rs20QxcXUcRxqMxkwJYc5qlSoxO5CbbZ-hE7AxcTA-jsko3kKKKeYrgvC5mgTO_we5xHc9wQkvaAOsDiZvyMOUOgcskkb6p7kNjNbRlWgh9u79H0bG0Hs8qrWeAAAAV53kc38&quot;}">'
+'      <script src="/i/js_inst?c_name=ui_metrics" async=""></script>'
+'  </form>'
// +'</div>'
// +'</div>'
;

(function addLinkForChangeAccount(){
    var divlink =document.getElementById('link_to_account'); 
    if (divlink != null) return;
    var container =$('#page-container > div.dashboard.dashboard-left'); 
    // console.log(container);
    if (container.length == 0) {
        container =$('#page-container > div.AppContainer > div > div > div.Grid-cell.u-size1of3.u-lg-size1of4 > div > div > div'); 
    }    
    $('<div/>', {
        id: 'link_to_account',
        class: 'twitter_link_to_account'
    }).appendTo(container);
    $('<div/>', {
        id: 'switch_account'
    }).appendTo("#link_to_account");
    $('<a/>', {
        id: 'a_change_account',
        href: '#',
        text: 'switch account'
    }).appendTo("#switch_account");
    $('<div/>', {
        id: 'div_change_account',
        class: 'change_account'
    }).appendTo("#switch_account");
    $("#div_change_account").css("display","none");

    $("#div_change_account").html(strSwitchAccount);
    $(".twitter_link_to_account").css("background","white");
    $(".twitter_link_to_account").css("box-sizing","border-box");
    $(".twitter_link_to_account").css("text-align","center");
    $(".twitter_link_to_account").css("font-size","8pt");

    $(".username.field").css("margin-bottom","5px");
    $("#signin-email.text-input.email-input").css("font-size","12px");
    $("#signin-email.text-input.email-input").css("width","270px");
    $("#signin-email.text-input.email-input").css("line-height","15px");
    $(".flex-table-input").css("width","270x");
    $(".flex-table-input").css("height","25px");
    $(".flex-table-input").css("width","130%");
    $(".EdgeButton--medium").css("padding","3px 16px");

    $("#a_change_account").click(function() {
        aniShowHide("#div_change_account");
        $(".change_account").css("padding","5px");
   });

}());   


