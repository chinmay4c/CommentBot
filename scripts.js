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
    const commentText = document.createElement('p');
    commentText.textContent = text;

    const commentActionsDiv = document.createElement('div');
    commentActionsDiv.classList.add('comment-actions');

    const replyButton = document.createElement('span');
    replyButton.textContent = 'Reply';
    replyButton.onclick = function () {
        toggleReplyInput(replyInputDiv);
    };

    const editButton = document.createElement('span');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        editComment(commentDiv, commentText, commentActionsDiv);
    };

    const deleteButton = document.createElement('span');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        commentDiv.remove();
    };

    commentActionsDiv.appendChild(replyButton);
    commentActionsDiv.appendChild(editButton);
    commentActionsDiv.appendChild(deleteButton);

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

    const replyContainerDiv = document.createElement('div');
    replyContainerDiv.classList.add('reply-container');

    commentBodyDiv.appendChild(commentText);
    commentDiv.appendChild(commentBodyDiv);
    commentDiv.appendChild(commentActionsDiv);
    commentDiv.appendChild(replyInputDiv);
    commentDiv.appendChild(replyContainerDiv);

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
    replyDiv.classList.add('comment');
    const replyTextP = document.createElement('p');
    replyTextP.textContent = replyText;

    const deleteReplyButton = document.createElement('span');
    deleteReplyButton.textContent = 'Delete';
    deleteReplyButton.style.float = 'right';
    deleteReplyButton.style.cursor = 'pointer';
    deleteReplyButton.style.color = '#007bff';
    deleteReplyButton.onclick = function () {
        replyDiv.remove();
    };

    replyDiv.appendChild(replyTextP);
    replyDiv.appendChild(deleteReplyButton);

    const replyContainerDiv = commentDiv.querySelector('.reply-container');
    replyContainerDiv.appendChild(replyDiv);

    replyInputDiv.style.display = 'none';
    replyInputDiv.querySelector('textarea').value = '';

    updateReplyCount(commentDiv);
}

function editComment(commentDiv, commentText, commentActionsDiv) {
    const editInputDiv = document.createElement('div');
    editInputDiv.classList.add('edit-input');

    const editTextarea = document.createElement('textarea');
    editTextarea.value = commentText.textContent;

    const saveEditButton = document.createElement('button');
    saveEditButton.textContent = 'Save';
    saveEditButton.onclick = function () {
        commentText.textContent = editTextarea.value;
        editInputDiv.remove();
        commentActionsDiv.style.display = 'flex';
    };

    const cancelEditButton = document.createElement('button');
    cancelEditButton.textContent = 'Cancel';
    cancelEditButton.onclick = function () {
        editInputDiv.remove();
        commentActionsDiv.style.display = 'flex';
    };

    editInputDiv.appendChild(editTextarea);
    editInputDiv.appendChild(saveEditButton);
    editInputDiv.appendChild(cancelEditButton);

    commentDiv.appendChild(editInputDiv);
    commentActionsDiv.style.display = 'none';
}

function updateReplyCount(commentDiv) {
    const replyCount = commentDiv.querySelectorAll('.reply-container .comment').length;
    let replyCountSpan = commentDiv.querySelector('.reply-count');

    if (!replyCountSpan) {
        replyCountSpan = document.createElement('span');
        replyCountSpan.classList.add('reply-count');
        commentDiv.querySelector('.comment-actions').appendChild(replyCountSpan);
    }

    replyCountSpan.textContent = `${replyCount} replies`;
}
