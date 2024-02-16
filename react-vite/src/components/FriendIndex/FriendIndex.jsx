import './FriendIndex.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllFriends } from '../../redux/friends';
import FriendIndexItem from '../FriendIndexItem';
import SideNavigation from '../Navigation/SideNavigation';
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
    <div className='friendIndex'>
      <SideNavigation/>
      <ul className='mainContent'>
      <OpenModalMenuItem itemText='Add' modalComponent={<CreateFriendModal/>}/>
        {friends.map((friend) => (
          <li>
            <FriendIndexItem friend={friend} key={friend.Id}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendIndex;
