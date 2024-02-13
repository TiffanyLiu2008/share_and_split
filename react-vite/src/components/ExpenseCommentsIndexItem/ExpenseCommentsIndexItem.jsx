import './ExpenseCommentsIndexItem.css';
import { useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateComment from '../UpdateComment';
import DeleteCommentModal from '../DeleteCommentModal';

function ExpenseCommentsIndexItem({eachComment}) {
  const {creator_id, comment, updated_at, creator_username} = eachComment;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isCreator = sessionUserId === creator_id;
  const convertDate = (oldDate) => {
    const dateObject = new Date(oldDate);
    const month = dateObject.toLocaleString('en-us', { month: 'short' });
    const day = dateObject.getDate();
    const year = dateObject.getFullYear();
    return `${month} ${day} ${year}`;
  };
  const date = convertDate(updated_at);

  return (
    <div>
      <p className='commentContent'>{comment}</p>
      <p className='commentCreatorUsername'>{creator_username}</p>
      <p className='commentCreatedAt'>{date}</p>
      {isCreator &&
        <div>
          <OpenModalMenuItem itemText='Edit' modalComponent={<UpdateComment eachComment={eachComment}/>}/>
          <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteCommentModal eachComment={eachComment}/>}/>
        </div>
      }
    </div>
  );
}

export default ExpenseCommentsIndexItem;
