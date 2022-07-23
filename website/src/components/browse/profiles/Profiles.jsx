import React from 'react';
import classes from './styles/profile.module.css';
import { Link } from 'react-router-dom';
import useFetch from '../../../hooks/fetch';
import { useSelector } from 'react-redux';
import ProfileIcon from './ProfileIcon';
function Profiles() {
  const users = useSelector((store) => store.auth.users);

  return (
    <div className={classes.profiles_container}>
      <div className={`${classes.profiles} on_open_animation`}>
        <div className={classes.profiles_list}>
          <h1 className={classes.title}>Who's watching?</h1>
          <ul className={classes.list}>
            {users.map((profile) => {
              return (
                <ProfileIcon id={profile.userId} key={profile.userId} imageUrl={profile.imageUrl} name={profile.name} />
              );
            })}
          </ul>
        </div>
        <div className={classes.button}>
          <Link to="/ManageProfiles">Manage Profiles</Link>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
