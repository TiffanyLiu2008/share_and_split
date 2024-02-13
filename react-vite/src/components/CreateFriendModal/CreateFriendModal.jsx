import './CreateFriendModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkCreateFriend, thunkGetAllFriends } from '../../redux/friends';

function CreateFriendModal() {
  const dispatch = useDispatch();
  const [friend_username, setFriendUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {closeModal} = useModal();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('friend_username', friend_username);
    setIsLoading(true);
    try {
      await dispatch(thunkCreateFriend(formData));
      await dispatch(thunkGetAllFriends());
      closeModal();
    } catch (error) {
      setErrors({backendError:'Username is invalid'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='addFriendHeading'>New friend</p>
      <div className='errors'>
        <ul>{errors.backendError}</ul>
      </div>
      <label className='addFriendNormal'>
        <input className='addFriendNormal' type='text' value={friend_username} placeholder='Username of your friend' onChange={(e) => setFriendUsername(e.target.value)} required/>
      </label>
      <button className='submitFriendButton' type='submit'>Submit</button>
    </form>
  );
}

export default CreateFriendModal;
