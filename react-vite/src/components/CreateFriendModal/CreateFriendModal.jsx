import './CreateFriendModal.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateFriend, thunkGetAllFriends } from '../../redux/friends';

function CreateFriendModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [friendUsername, setFriendUsername] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    friend = {...friend, friendUsername};
    let newFriend;
    dispatch(thunkCreateFriend(friend))
    .then((newFriend) => history.push(`/friends/${newFriend.id}`))
    .then(() => dispatch(thunkGetAllFriends()))
    .then(closeModal)
    .catch(async (response) => {
      const data = await response.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };
  const friendUsernameError = errors.friendUsername ? `Username of your friend: ${errors.friendUsername}` : null;

  return (
    <form onSubmit={handleSubmit}>
      <p className='addFriendHeading'>New friend?</p>
      <div className='errors'>
        <ul>{friendUsernameError}</ul>
      </div>
      <label className='addFriendNormal'>
        <input className='addFriendNormal' type='text' value={friendUsername} placeholder='Username of your friend?' onChange={(e) => setFriendUsername(e.target.value)} required/>
      </label>
      <button className='submitFriendButton' type='submit'>Submit</button>
    </form>
  );
}

export default CreateFriendModal;
