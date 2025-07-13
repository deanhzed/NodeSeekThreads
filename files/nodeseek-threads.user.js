// ==UserScript==
// @name         NodeSeek Threads
// @name:zh-CN   NodeSeek 楼中楼 (Threads)
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Enhances NodeSeek with nested comments, making conversations easier to follow.
// @description:zh-CN 为 NodeSeek 网站提供嵌套评论（楼中楼）功能，让对话浏览更轻松。
// @author       Dean & Gemini
// @match        https://www.nodeseek.com/post-*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nodeseek.com
// @license      MIT
// @homepageURL  https://github.com/your-username/nodeseek-threads
// ==/UserScript==

(function() {
    'use strict';

    // --- Settings for signature display ---
    let showSignatures = GM_getValue('showSignatures', true);
    GM_registerMenuCommand(`${showSignatures ? 'Hide' : 'Show'} Signatures`, () => {
        GM_setValue('showSignatures', !showSignatures);
        window.location.reload();
    });

    // --- Core CSS Styles ---
    const nestedAvatarSize = 24;
    const avatarMargin = 8;
    const nestedIndent = nestedAvatarSize + avatarMargin;

    let styles = `
        /* --- Light Mode: Top-level Comments --- */
        body.light-layout .comments > .content-item {
            background: rgba(0,0,0,.05) !important;
            border: 1px solid rgba(0,0,0,.05) !important;
            padding: 10px 10px 10px 16px !important;
            margin-bottom: 10px !important;
            border-radius: 1px !important;
            transition: background .3s, border .3s;
            position: relative;
        }
        body.light-layout .comments > .content-item::before,
        body.light-layout .comments > .content-item::after {
            content: ""; position: absolute; top: 0; bottom: 0; width: 3px;
        }
        body.light-layout .comments > .content-item::before { left: 0; background-color: rgba(0,0,0,.1); }
        body.light-layout .comments > .content-item::after { left: 3px; background-color: rgba(0,0,0,.2); }

        /* --- Dark Mode: Top-level Comments --- */
        body.dark-layout .comments > .content-item {
            background: hsla(0,0%,100%,.01) !important;
            border: 1px solid hsla(0,0%,100%,.05) !important;
            padding: 10px 10px 10px 16px !important;
            margin-bottom: 10px !important;
            border-radius: 1px !important;
            transition: background .3s, border .3s;
            position: relative;
        }
        body.dark-layout .comments > .content-item::before,
        body.dark-layout .comments > .content-item::after {
            content: ""; position: absolute; top: 0; bottom: 0; width: 3px;
        }
        body.dark-layout .comments > .content-item::before { left: 0; background-color: hsla(0,0%,100%,.05); }
        body.dark-layout .comments > .content-item::after { left: 3px; background-color: hsla(0,0%,100%,.1); }

        /* --- Nested Replies Container --- */
        .nested-replies-container {
            border: 1px solid rgba(0,0,0,.1);
            border-left: none;
            margin-top: 10px;
            padding: 0 8px 5px 12px;
            border-radius: 1px;
            transition: border .3s;
            background: hsla(0,0%,100%,.01) !important;
            position: relative;
        }
        body.dark-layout .nested-replies-container {
             border-color: hsla(0,0%,100%,.1) !important;
             border-left: none;
        }
        .nested-replies-container::before,
        .nested-replies-container::after {
            content: ""; position: absolute; top: 0; bottom: 0; width: 2px;
        }
        body.light-layout .nested-replies-container::before { left: 0; background-color: rgba(0,0,0,.05); }
        body.light-layout .nested-replies-container::after { left: 2px; background-color: rgba(0,0,0,.1); }
        body.dark-layout .nested-replies-container::before { left: 0; background-color: hsla(0,0%,100%,.05); }
        body.dark-layout .nested-replies-container::after { left: 2px; background-color: hsla(0,0%,100%,.1); }

        /* --- Nested Comment Items --- */
        .nested-replies-container > .content-item.is-nested {
            border: none !important; padding: 8px 0 0 0 !important; margin-bottom: 0 !important;
            border-bottom: 1px dashed rgba(0,0,0,.08) !important; background: transparent !important; transition: border .3s;
        }
        body.dark-layout .nested-replies-container > .content-item.is-nested {
            border-bottom-color: hsla(0,0%,100%,.08) !important;
        }
        .nested-replies-container > .content-item.is-nested:last-child { border-bottom: none !important; }
        .nested-replies-container > .content-item.is-nested:first-child { padding-top: 5px !important; }

        /* --- Nested Elements Layout --- */
        .is-nested .avatar-normal {
            width: ${nestedAvatarSize}px !important;
            height: ${nestedAvatarSize}px !important;
        }
        .is-nested > .post-content, .is-nested > .signature {
            margin-left: ${nestedIndent}px;
        }
    `;

    if (!showSignatures) {
        styles += `.signature { display: none !important; }`;
    }

    GM_addStyle(styles);

    function processComments() {
        const comments = document.querySelectorAll('.content-item');
        const commentMap = new Map();
        comments.forEach(comment => {
            const floorId = comment.getAttribute('id');
            if (floorId) commentMap.set(floorId, comment);
        });

        comments.forEach(comment => {
            if (comment.classList.contains('nested-processed') || comment.parentElement.classList.contains('nested-replies-container')) {
                return;
            }

            const replyLink = comment.querySelector('.post-content a[href*="/post-"]');
            if (replyLink && replyLink.hash && !replyLink.closest('blockquote')) {
                const parentFloorId = replyLink.hash.substring(1);
                if (parentFloorId !== '0') {
                    const parentComment = commentMap.get(parentFloorId);
                    if (parentComment && parentComment !== comment) {
                        let container = parentComment.querySelector('.nested-replies-container');
                        if (!container) {
                            container = document.createElement('div');
                            container.className = 'nested-replies-container';
                            parentComment.appendChild(container);
                        }
                        container.appendChild(comment);
                        comment.classList.add('is-nested');
                    }
                }
            }
            comment.classList.add('nested-processed');
        });
    }

    const observer = new MutationObserver(() => { setTimeout(processComments, 200); });
    window.addEventListener('load', () => {
        processComments();
        const commentsContainer = document.querySelector('.comments');
        if (commentsContainer) {
            observer.observe(commentsContainer, { childList: true, subtree: true });
        }
    });
})();
