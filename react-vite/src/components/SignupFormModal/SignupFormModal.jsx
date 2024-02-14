import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='signUpHeading'>Sign Up</p>
      {errors.server && <p className='errors'>{errors.server}</p>}<br/>
      {errors.email && <p className='errors'>{errors.email}</p>}<br/>
      {errors.username && <p className='errors'>{errors.username}</p>}<br/>
      {errors.password && <p className='errors'>{errors.password}</p>}<br/>
      {errors.confirmPassword && <p className='errors'>{errors.confirmPassword}</p>}<br/>
      <label className='signUpLabel'>
        Email<br/>
        <input
          className='signUpNormal'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
      </label><br/>
      <label className='signUpLabel'>
        Username<br/>
        <input
          className='signUpNormal'
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br/>
      </label>
      <label className='signUpLabel'>
        Password<br/>
        <input
          className='signUpNormal'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
      </label>
      <label className='signUpLabel'>
        Confirm Password<br/>
        <input
          className='signUpNormal'
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br/>
      </label>
      <button className='signUpButton' type="submit">Sign Up</button><br/>
      <button className='cancelButton' onClick={closeModal}>Cancel</button>
    </form>
  );
}

export default SignupFormModal;
