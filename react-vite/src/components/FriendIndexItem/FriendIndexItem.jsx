import './FriendIndexItem.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteFriendModal from '../DeleteFriendModal';

function FriendIndexItem({friend}) {
  const {username} = friend;

  return (
    <div>
      <p className='friendUsername'>{username}</p>
      <OpenModalMenuItem itemText='Remove' modalComponent={<DeleteFriendModal friend={friend}/>}/>
    </div>
  );
}

export default FriendIndexItem;
