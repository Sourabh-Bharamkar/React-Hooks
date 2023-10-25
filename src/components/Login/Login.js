import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();

  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();

  const [enteredCollegeName, setEnteredCollegeName] = useState('');
  const [collegeNameIsValid, setCollegeNameIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(() => {

    const timerId = setTimeout(() => {
      console.log('checking form validity...')
      setFormIsValid(
        enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollegeName.trim().length>5
      );
    }, 500)

    //adding clean up function which will get stored into memory when component renders
    // for 1st time and will get executed before useEfect execution and after executing
    // again it will get stored into memory  

    return () => {
      console.log('cleanup function executed')
      clearInterval(timerId)
    }

  }, [enteredEmail, enteredPassword, enteredCollegeName])



  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };


  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const collegeNameChangeHandler=(event)=>{
    setEnteredCollegeName(event.target.value)
  }


  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeNameHandler=()=>{
    setCollegeNameIsValid(enteredCollegeName.trim().length>5)
  }


  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };


  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div
          className={`${classes.control} ${collegeNameIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="collegeName">collegeName</label>
          <input
            type="text"
            id="collegeName"
            value={enteredCollegeName}
            onChange={collegeNameChangeHandler}
            onBlur={validateCollegeNameHandler}
          />
        </div>


        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
