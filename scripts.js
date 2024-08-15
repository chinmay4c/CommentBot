document.addEventListener('DOMContentLoaded', () => {
    const commentInput = document.getElementById('new-comment');
    const commentsList = document.getElementById('comments-list');
    const postCommentButton = document.getElementById('post-comment');

    postCommentButton.addEventListener('click', () => {
        if (commentInput.value.trim()) {
            addComment(commentInput.value.trim());
            commentInput.value = '';
        }
    });

    commentInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            postCommentButton.click();
        }
    });

    function addComment(text, isReply = false) {
        const commentElement = createCommentElement(text, isReply);
        if (isReply) {
            return commentElement;
        } else {
            commentsList.prepend(commentElement);
            commentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function createCommentElement(text, isReply) {
        const commentDiv = createElement('div', 'comment');
        const commentMetaDiv = createElement('div', 'comment-meta');
        const commentAuthor = createElement('span', 'comment-author', 'Anonymous');
        const commentTime = createElement('span', 'comment-time', formatDate(new Date()));
        commentMetaDiv.append(commentAuthor, commentTime);

        const commentBodyDiv = createElement('div', 'comment-body');
        const commentText = createElement('p', null, text);

        const commentActionsDiv = createActions(['Reply', 'Edit', 'Delete'], [
            () => toggleReplyInput(replyInputDiv),
            () => editComment(commentDiv, commentText, commentActionsDiv),
            () => {
                if (confirm('Are you sure you want to delete this comment?')) {
                    commentDiv.remove();
                }
            }
        ]);

        const replyInputDiv = createReplyInput(commentDiv);
        const replyCountDiv = createElement('div', 'reply-count', '0 replies');

        commentBodyDiv.appendChild(commentText);
        commentDiv.append(commentMetaDiv, commentBodyDiv, commentActionsDiv, replyCountDiv, replyInputDiv, createElement('div', 'reply-container'));

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
        const replyTextarea = createElement('textarea', null, null, { placeholder: 'Write a reply...' });
        const postReplyButton = createElement('button', null, 'Post Reply');

        postReplyButton.addEventListener('click', () => {
            if (replyTextarea.value.trim()) {
                postReply(replyTextarea.value.trim(), commentDiv, replyInputDiv);
                replyTextarea.value = '';
            }
        });

        replyTextarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postReplyButton.click();
            }
        });

        replyInputDiv.append(replyTextarea, postReplyButton);
        return replyInputDiv;
    }

    function postReply(text, commentDiv, replyInputDiv) {
        const replyContainerDiv = commentDiv.querySelector('.reply-container');
        const replyDiv = addComment(text, true);
        replyContainerDiv.appendChild(replyDiv);
        replyInputDiv.style.display = 'none';
        updateReplyCount(commentDiv);
        replyDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function updateReplyCount(commentDiv) {
        const replyContainer = commentDiv.querySelector('.reply-container');
        const replyCount = replyContainer.children.length;
        const replyCountDiv = commentDiv.querySelector('.reply-count');
        replyCountDiv.textContent = `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`;
    }

    function editComment(commentDiv, commentText, commentActionsDiv) {
        const currentText = commentText.textContent;
        const editInput = createElement('div', 'edit-input');
        const editTextarea = createElement('textarea', null, currentText);
        const saveButton = createElement('button', null, 'Save');

        editInput.append(editTextarea, saveButton);
        commentDiv.insertBefore(editInput, commentActionsDiv);
        commentText.style.display = 'none';
        commentActionsDiv.style.display = 'none';

        saveButton.addEventListener('click', () => {
            const newText = editTextarea.value.trim();
            if (newText) {
                commentText.textContent = newText;
            }
            commentText.style.display = '';
            commentActionsDiv.style.display = '';
            editInput.remove();
        });
    }

    function toggleReplyInput(replyInputDiv) {
        replyInputDiv.style.display = replyInputDiv.style.display === 'none' ? 'flex' : 'none';
    }

    function createElement(tag, className, textContent = '', attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    }

    function formatDate(date) {
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit'
        });
    }
});