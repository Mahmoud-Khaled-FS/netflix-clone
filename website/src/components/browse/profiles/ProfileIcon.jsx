import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/features/auth/authenticationSlice';
import classes from './styles/profile.module.css';
const ProfileIcon = (props) => {
  const dispatch = useDispatch();
  const selectUserHandler = () => {
    window.sessionStorage.setItem('userId', JSON.stringify(props.id));
    dispatch(setUser(props.id));
  };
  return (
    <li onClick={selectUserHandler} className={classes.item} key={props.id}>
      <div className={classes.avatar} style={{ backgroundImage: `url("${props.imageUrl}")` }}></div>
      <span className={classes.profile_name}>{props.name}</span>
    </li>
  );
};

export default ProfileIcon;
