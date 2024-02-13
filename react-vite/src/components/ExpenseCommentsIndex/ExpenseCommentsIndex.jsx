import './ExpenseCommentsIndex.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetExpenseComments } from '../../redux/comments';
import ExpenseCommentsIndexItem from '../ExpenseCommentsIndexItem/ExpenseCommentsIndexItem';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateComment from '../CreateComment';

function ExpenseCommentsIndex() {
  const dispatch = useDispatch();
  const {expenseId} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetExpenseComments(expenseId));
      } catch (error) {
        console.error('Fetching expense comments error', error);
      }
    };
    fetchData();
  }, [dispatch, expenseId]);
  const comments = useSelector(state => state.comments[expenseId]);
  const isLoading = !comments;
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
      <p className='heading'>Comments:</p>
      <OpenModalMenuItem itemText='Add' modalComponent={<CreateComment expenseId={expenseId}/>}/>
      <ul className='expenseCommentsIndex'>
        {Object.values(comments).map((comment) => (
          <li className='eachComment' key={comment.id}>
            <ExpenseCommentsIndexItem eachComment={comment} key={comment.id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseCommentsIndex;
