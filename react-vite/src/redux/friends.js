const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const RECEIVE_FRIEND = 'friends/RECEIVE_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const loadFriends = (friends) => ({
    type: LOAD_FRIENDS,
    friends
});
const receiveFriend = (friend) => ({
    type: RECEIVE_FRIEND,
    friend
});
const deleteFriend = (friend) => ({
    type: DELETE_FRIEND,
    friend
});

export const thunkGetAllFriends = () => async (dispatch) => {
    const response = await fetch('api/friendships/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadFriends(data));
        return data;
    }
    return response;
};
export const thunkCreateFriend = (friend) => async (dispatch) => {
    const response = await fetch('api/friendships', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(friend)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(receiveFriend(data));
        return data;
    }
    return response;
};
export const thunkDeleteFriend = (friendId) => async (dispatch) => {
    const response = await fetch(`api/friendships/${friendId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(deleteFriend(friendId));
        return data;
    }
    return response;
};

function friendsReducer(state = {}, action) {
    switch (action.type) {
        case LOAD_FRIENDS:
            return {...state, ...action.friends}
            // const friendsState = {...state};
            // action.friends.friends.forEach((friend) => {
            //     if (!friendsState[friend.id]) {
            //         friendsState[friend.id] = friend;
            //     }
            // });
            // return {...friendsState};
        case RECEIVE_FRIEND:
            return {...state, [action.friend.id]: action.friend};
        case DELETE_FRIEND:
            const newState = {...state};
            delete newState[action.friendId];
            return newState;
        default:
            return state;
    }
}

export default friendsReducer;
