import './ExpenseCommentsIndexItem.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateComment from '../UpdateComment';
import DeleteCommentModal from '../DeleteCommentModal';

function ExpenseCommentsIndexItem() {
  const {creator_id, comment, created_at, creator_username} = comment;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isCreator = sessionUserId === creator_id;

  return (
    <div>
      <p className='commentContent'>{comment}</p>
      <p className='commentCreatorUsername'>{creator_username}</p>
      <p className='commentCreatedAt'>{created_at}</p>
      {isCreator &&
        <div>
          <OpenModalMenuItem itemText='Edit' modalComponent={<UpdateComment comment={comment}/>}/>
          <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteCommentModal comment={comment}/>}/>
        </div>
      }
    </div>
  );
}

export default ExpenseCommentsIndexItem;
