document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.getElementById('new-comment');
    const commentsList = document.getElementById('comments-list');

    document.querySelector('.comment-input button').addEventListener('click', () => {
        if (commentInput.value.trim()) {
            addComment(commentInput.value.trim());
            commentInput.value = '';
        }
    });

    function addComment(text) {
        const commentElement = createCommentElement(text);
        commentsList.appendChild(commentElement);
        commentElement.scrollIntoView({ behavior: 'smooth' });
    }

    function createCommentElement(text) {
        const commentDiv = createElement('div', 'comment');
        const commentBodyDiv = createElement('div', 'comment-body');
        const commentText = createElement('p', null, text);

        const commentActionsDiv = createActions(['Reply', 'Edit', 'Delete'], [
            () => toggleReplyInput(replyInputDiv),
            () => editComment(commentDiv, commentText, commentActionsDiv),
            () => commentDiv.remove()
        ]);

        const replyInputDiv = createReplyInput(commentDiv);

        commentBodyDiv.appendChild(commentText);
        commentDiv.append(commentBodyDiv, commentActionsDiv, replyInputDiv, createElement('div', 'reply-container'));

        return commentDiv;
    }

    function createActions(actions, handlers) {
        const actionsDiv = createElement('div', 'comment-actions');
        actions.forEach((action, index) => {
            const actionSpan = createElement('span', null, action);
            actionSpan.addEventListener('click', handlers[index]);
            actionsDiv.appendChild(actionSpan);
        });
        return actionsDiv;
    }

    function createReplyInput(commentDiv) {
        const replyInputDiv = createElement('div', 'reply-input');
        const replyTextarea = createElement('textarea', null, null, { placeholder: 'Reply to this comment...' });
        const postReplyButton = createElement('button', null, 'Post Reply');

        postReplyButton.addEventListener('click', () => {
            if (replyTextarea.value.trim()) {
                postReply(replyTextarea.value.trim(), commentDiv, replyInputDiv);
                replyTextarea.value = '';
            }
        });

        replyInputDiv.append(replyTextarea, postReplyButton);
        return replyInputDiv;
    }

    function postReply(text, commentDiv, replyInputDiv) {
        const replyContainerDiv = commentDiv.querySelector('.reply-container');
        const replyDiv = createCommentElement(text);
        replyContainerDiv.appendChild(replyDiv);
        replyInputDiv.style.display = 'none';
        updateReplyCount(commentDiv);
        replyDiv.scrollIntoView({ behavior: 'smooth' });
    }

    

    function createElement(tag, className, textContent = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    }
});
