import './FriendIndex.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllFriends } from '../../redux/friends';
import FriendIndexItem from '../FriendIndexItem';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import CreateFriendModal from '../CreateFriendModal';

function FriendIndex() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(thunkGetAllFriends());
      } catch (error) {
        console.error('Fetching friends error', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const friends = useSelector(state => state.friends.friends);
  const isLoading = !friends;
  if (isLoading) return (<>Loading...</>);

  return (
    <div>
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
