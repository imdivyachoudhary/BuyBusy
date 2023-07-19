import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./Auth.module.css";
import { useEffect, useRef } from "react";

function SignIn() {
  const { isLoggedIn,signInUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isLoggedIn){
      navigate("/");
    }
  },[]);

  useEffect(()=>{
    if(isLoggedIn){
      navigate("/");
    }
  },[isLoggedIn])

  const emailRef = useRef();
  const passwordRef = useRef();

  // function clearInput(){
  //   emailRef.current.value="";
  //   passwordRef.current.value="";
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(emailRef.current.value, passwordRef.current.value);
    signInUser(emailRef.current.value, passwordRef.current.value);
    // clearInput();
  }

  return (
    <form className={styles.AuthForm} onSubmit={(e) => submitHandler(e)}>
      <div className={styles.FormHeader}>
        <h1>SIGN IN</h1>
      </div>
      <div className={styles.FormItem}>
        <label>Email</label>
        <input type="email" ref={emailRef} required/>
      </div>
      <div className={styles.FormItem}>
        <label>Password</label>
        <input type="password" ref={passwordRef} required/>
      </div>
      <div className={styles.ButtonItem}>
        <button type="submit">Sign In</button>
        <Link to="/sign-up"><div>Sign Up?</div></Link>
      </div>
    </form>
  );
}

export default SignIn;
