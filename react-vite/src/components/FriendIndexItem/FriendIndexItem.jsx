import './FriendIndexItem.css';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteFriendModal from '../DeleteFriendModal';

function FriendIndexItem({friend}) {
  const {username} = friend;

  return (
    <div>
      <p className='friendUsername'>{username}</p>
      <OpenModalMenuItem itemText='Delete' modalComponent={<DeleteFriendModal friend={friend}/>}/>
    </div>
  );
}

export default FriendIndexItem;
