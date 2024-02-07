import './DeleteFriendModal.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkDeleteFriend } from '../../redux/friends';

function DeleteFriendModal({friend}) {
  const friendId = friend.id;
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteFriend(friendId))
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
      }
    });
  };

  return (
    <div>
      <p className='heading'>Delete this friend?</p>
      <button className='deleteFriendYes' onClick={handleDelete}>Yes please</button><br/>
      <button className='deleteFriendNo' onClick={closeModal}>Not yet</button>
    </div>
  );
}

export default DeleteFriendModal;
