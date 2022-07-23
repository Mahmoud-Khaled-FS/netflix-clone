import React from 'react';
import { useState } from 'react';
import classes from './styles/browseHeader.module.css';
import { Link } from 'react-router-dom';
import { EditPenSvg, AccountSvg, QuestionMarkSvg } from '../../../svg/Header';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../../../store/features/auth/authenticationSlice';

const ProfileMenu = () => {
  const authStore = useSelector((store) => store.auth);
  const users = authStore.users;
  const activeUserData = users.find((user) => user.userId === authStore.userId);
  const [showMenu, setshowMenu] = useState(false);

  let timer;
  const showMenuHandler = () => {
    clearTimeout(timer);
    setshowMenu(true);
  };
  const closeMenuHandler = () => {
    timer = setTimeout(() => {
      setshowMenu(false);
    }, 350);
  };
  return (
    <div onMouseEnter={showMenuHandler} onMouseLeave={closeMenuHandler} className={classes.my_profile}>
      <button className={`${classes.search_button} ${classes.prfile_img}`}>
        <img src={activeUserData.imageUrl} alt={activeUserData.name} />
        <span className={`${classes.tre} ${showMenu ? classes.active : ''}`}></span>
      </button>
      {showMenu && <ProfileMenuList users={users.filter((user) => user.userId !== authStore.userId)} />}
    </div>
  );
};

const ProfileMenuList = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    window.localStorage.removeItem('auth');
    window.sessionStorage.removeItem('userId');
    dispatch(logout());
  };
  return (
    <div className={classes.profile_menu}>
      <span className={`${classes.tre} ${classes.top}`}></span>
      <ProfileMenuItems users={props.users} />
      <ul className={classes.profile_list}>
        <li>
          <Link to="/browse">
            <button className={`${classes.search_button} ${classes.prfile_img}`}>
              <AccountSvg />
            </button>
            <div>Account</div>
          </Link>
        </li>
        <li>
          <Link to="/browse">
            <button className={`${classes.search_button} ${classes.prfile_img}`}>
              <QuestionMarkSvg />
            </button>
            <div>Help Center</div>
          </Link>
        </li>
      </ul>
      <ul className={classes.profile_list}>
        <li onClick={logoutHandler}>
          <Link to="/">
            <div className={classes.signout}>Sign Out From Netflix</div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const ProfileMenuItems = (props) => {
  const dispatch = useDispatch();

  return (
    <ul className={classes.profile_list}>
      {props.users.map((user) => (
        <li key={user.userId}>
          <div
            onClick={() => {
              dispatch(setUser(user.userId));
            }}
            className={classes.menu_user_item}
          >
            {user.imageUrl && (
              <button className={`${classes.search_button} ${classes.prfile_img}`}>
                <img src={user.imageUrl} alt={user.name} />
              </button>
            )}
            <div>{user.name}</div>
          </div>
        </li>
      ))}
      <li>
        <Link to="/browse">
          <button className={`${classes.search_button} ${classes.prfile_img}`}>
            <EditPenSvg />
          </button>
          <div>Manage Profiles</div>
        </Link>
      </li>
    </ul>
  );
};
export default ProfileMenu;
