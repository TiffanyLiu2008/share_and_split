import './ExpenseCommentsIndex.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpenseComments } from '../../redux/comments';
import ExpenseCommentsIndexItem from '../ExpenseCommentsIndexItem/ExpenseCommentsIndexItem';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateComment from '../CreateComment';

function ExpenseCommentsIndex() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  const comments = useSelector(state => state.comments[expenseId]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
      dispatch(thunkGetExpenseComments(expenseId)).then(() => setIsLoading(false));
  }, [dispatch, expenseId]);
  // if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <p className='heading'>Comments:</p>
      <OpenModalMenuItem itemText='Add' modalComponent={<CreateComment/>}/>
      <ul className='expenseCommentsIndex'>
        {comments.map((comment) => {
          <li className='eachComment' key={comment.id}>
            <ExpenseCommentsIndexItem eachComment={comment} key={comment.id}/>
          </li>
        })}
      </ul>
    </div>
  );
}

export default ExpenseCommentsIndex;
