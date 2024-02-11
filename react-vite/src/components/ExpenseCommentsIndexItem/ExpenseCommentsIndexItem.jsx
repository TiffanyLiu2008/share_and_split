import './ExpenseCommentsIndexItem.css';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import UpdateComment from '../UpdateComment';
import DeleteCommentModal from '../DeleteCommentModal';

function ExpenseCommentsIndexItem({eachComment}) {
  const {creator_id, expense_id, comment, created_at, creator_username} = eachComment;
  const expenseId = expense_id;
  const sessionUser = useSelector(state => state.session.user);
  const sessionUserId = sessionUser ? sessionUser.id : null;
  const isCreator = sessionUserId === creator_id;
  const convertDate = (oldDate) => {
    const str = oldDate.split(' ');
    const month = str[2];
    const day = str[1];
    const year = str[3];
    return `${month} ${day}, ${year}`;
  };
  const date = convertDate(created_at);

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
