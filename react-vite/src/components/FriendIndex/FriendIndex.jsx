import './FriendIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllFriends } from '../../redux/friends';
import FriendIndexItem from '../FriendIndexItem';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateFriendModal from '../CreateFriendModal';

function FriendIndex() {
  const dispatch = useDispatch();
  const friends = useSelector(state => Object.values(state.friends));
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(thunkGetAllFriends()).then(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div>
      <h1>Welcome</h1>
      <ul className='friendIndex'>
        {friends.map((friend) => (
          <li className='eachFriend' key={friend.Id}>
            <FriendIndexItem friend={friend} key={friend.id}/>
          </li>
        ))}
      </ul>
      <OpenModalMenuItem itemText='Add' modalComponent={<CreateFriendModal/>}/>
    </div>
  );
}

export default FriendIndex;
