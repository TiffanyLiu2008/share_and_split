import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleDemo = async (e) => {
    setEmail('olivia@aa.io');
    setPassword('password');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
      <p className='logInHeading'>Log In</p>
      {errors.email && <p className='errors'>{errors.email}</p>}<br/>
      {errors.password && <p className='errors'>{errors.password}</p>}<br/>
      <label className='logInLabel'>
        Email<br/>
        <input
          className='logInNormal'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
      </label>
      <label className='logInLabel'>
        Password<br/>
        <input
          className='logInNormal'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/>
      </label>
      <button className='logInButton' type="submit">Log In</button><br/>
      <button className='demoButton' type='submit' onClick={handleDemo}>Log In as Demo User</button><br/>
      <button className='cancelButton' onClick={closeModal}>Cancel</button>
    </form>
  );
}

export default LoginFormModal;
