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
const deleteComment = (expenseId, commentId) => ({
    type: DELETE_COMMENT,
    expenseId,
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
        body: comment
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveComment(expenseId, data));
        return data;
    }
    return response;
};
export const thunkUpdateComment = (comment) => async (dispatch) => {
    const commentId = comment.get('id');
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: comment
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(updateComment(data));
        return data;
    }
    return response;
};
export const thunkDeleteComment = (expenseId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteComment(expenseId, commentId));
        return data;
    }
    return response;
};

const initialState = {comments: []};
function commentsReducer(state = initialState, action) {
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
      return {...state, [action.expenseId]: action.comment};
    case DELETE_COMMENT:
      const updatedComments = {...state[action.expenseId]};
      delete updatedComments[action.commentId];
      return {...state, [action.expenseId]: updatedComments};
    default:
      return state;
  }
}

export default commentsReducer;
