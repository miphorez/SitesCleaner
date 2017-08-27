'use strict';

if (!document.body.classList.contains('vkcb')) {
    document.body.classList.add('vkcb');
}

function addButtons() {
    var postRepliesEls = document.querySelectorAll('div.post_info');
    [].forEach.call(postRepliesEls, function (node) {
        var postFullLikeEls = node.querySelector('div.post_full_like_wrap');
        if (!postFullLikeEls.querySelector('.vkcb-btn')) {
            var postLikeButton = postFullLikeEls.querySelector('.post_like');
            var postId = postLikeButton.getAttribute('onmouseover').match(/\d+_\d+/)[0];
            var buttonEl = document.createElement('a');
            buttonEl.href = '#';
            buttonEl.classList.add('post_like', '_like_wrap', 'vkcb-btn');
            buttonEl.setAttribute('onclick', "this.closest('.post_info').querySelector('.replies_wrap').classList.toggle('vkcb-show'); return false;");
            var buttonIconEl = document.createElement('i');
            buttonIconEl.classList.add('icon');
            var commentsEl = node.querySelector('.wr_header');
            var commentsCount = 0;
            if (commentsEl) {
                commentsCount = parseInt(commentsEl.getAttribute('offs').replace(/[^\/]+\//, ''), 10);
            }
            else {
                commentsCount = node.getElementsByClassName('reply').length;
            }
            var buttonCountEl = document.createElement('span');
            buttonCountEl.classList.add('post_share_count', '_count');
            buttonCountEl.textContent = commentsCount.toString();
            buttonEl.appendChild(buttonIconEl);
            buttonEl.appendChild(buttonCountEl);
            postFullLikeEls.appendChild(buttonEl);
        }
    });
};
addButtons();

function hunt() {
    var textArr = 'Рекламная запись';
    var posts = document.getElementsByClassName('feed_row');
    for(var ii =0; ii<posts.length; ii++) {
            if(posts[ii].innerText.search(textArr) > 0) {
                var thepost = document.getElementsByClassName('feed_row')[ii].children[0];
                var idToDel = thepost.getAttribute('id').split('post')[1];
                var delElement = document.getElementById('post'+idToDel);
                if(delElement) {
                    // console.log(delElement);
                    delElement.parentElement.removeChild(delElement);
                }
            }
    }
    setTimeout('hunt()',5000);
};
hunt();
