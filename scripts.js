function addComment() {
    const commentText = document.getElementById('new-comment').value;
    if (commentText.trim() === '') return;

    const commentElement = createCommentElement(commentText);
    document.getElementById('comments-list').appendChild(commentElement);
    document.getElementById('new-comment').value = '';
}

function createCommentElement(text) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    const commentBodyDiv = document.createElement('div');
    commentBodyDiv.classList.add('comment-body');
    commentBodyDiv.textContent = text;

    const replyButton = document.createElement('button');
    replyButton.textContent = 'Reply';
    replyButton.onclick = function () {
        toggleReplyInput(replyInputDiv);
    };

    const replyInputDiv = document.createElement('div');
    replyInputDiv.classList.add('reply-input');

    const replyTextarea = document.createElement('textarea');
    replyTextarea.placeholder = 'Reply to this comment...';

    const postReplyButton = document.createElement('button');
    postReplyButton.textContent = 'Post Reply';
    postReplyButton.onclick = function () {
        postReply(replyTextarea.value, commentDiv, replyInputDiv);
    };

    replyInputDiv.appendChild(replyTextarea);
    replyInputDiv.appendChild(postReplyButton);

    commentDiv.appendChild(commentBodyDiv);
    commentDiv.appendChild(replyButton);
    commentDiv.appendChild(replyInputDiv);

    return commentDiv;
}

function toggleReplyInput(replyInputDiv) {
    if (replyInputDiv.style.display === 'none' || replyInputDiv.style.display === '') {
        replyInputDiv.style.display = 'block';
    } else {
        replyInputDiv.style.display = 'none';
    }
}

function postReply(replyText, commentDiv, replyInputDiv) {
    if (replyText.trim() === '') return;

    const replyDiv = document.createElement('div');
    replyDiv.classList.add('comment-body');
    replyDiv.style.marginLeft = '20px';
    replyDiv.textContent = replyText;

    commentDiv.insertBefore(replyDiv, replyInputDiv);
    replyInputDiv.style.display = 'none';
    replyInputDiv.querySelector('textarea').value = '';
}
