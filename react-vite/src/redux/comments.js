const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

const loadComments = (expenseId, comments) => ({
    type: LOAD_COMMENTS,
    expenseId,
    comments
});
const receiveComment = (expenseId, comment) => ({
    type: RECEIVE_COMMENT,
    expenseId,
    comment
});
const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
});
const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

export const thunkGetExpenseComments = (expenseId) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}/comments`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadComments(expenseId, data));
        return data;
    }
    return response;
};
export const thunkGetCommentDetails = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveComment(data));
        return data;
    }
    return response;
};
export const thunkCreateComment = (expenseId, comment) => async (dispatch) => {
    const response = await fetch(`/api/expenses/${expenseId}/comments`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveComment(expenseId, data));
        return data;
    }
    return response;
};
export const thunkUpdateComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateComment(data));
        return data;
    }
    return response;
};
export const thunkDeleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(commentId));
        return data;
    }
    return response;
};

function commentsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_COMMENTS:
            const commentsState = {};
            action.comments.comments.forEach((comment) => {
                commentsState[comment.id] = comment;
            });
            return {...state, [action.expenseId]: commentsState};
        case RECEIVE_COMMENT:
            return {...state, [action.expenseId]: action.comment};
        case UPDATE_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case DELETE_COMMENT:
            const newState = {...state};
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;
