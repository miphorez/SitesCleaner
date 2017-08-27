
var $ = document.querySelector.bind( document );
var manifest = chrome.runtime.getManifest();

function init (){
  $('#ext-version').innerHTML = manifest.version + '. ';
  $('#ext-meta-footer').innerHTML = manifest.name + ' v. ' + manifest.version;
  $('#curr-year').innerHTML = (new Date()).getFullYear();
  document.title = manifest.name;

  $('#logo').addEventListener('dblclick', function(e){
    chrome.tabs.create({"url":"https://goo.gl/RRzARL","selected":true}, function(tab){
    });
  });

}
init();