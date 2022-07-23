import React, { useRef } from 'react';
import classes from './styles/browseHeader.module.css';
import Header from '../../../components/header/Header';
import { SearchSvg, NotficationSvg } from '../../../svg/Header';
import logo from '../../../logo.svg';
import { NavLink } from 'react-router-dom';

import ProfileMenu from './ProfileMenu';

function BrowseHeader({ full = true }) {
  const headerRef = useRef();
  window.addEventListener('scroll', (e) => {
    const header = document.getElementById('main_header');
    if (document.getElementsByClassName('main_browse')[0].style.position === 'fixed') return;
    window.scrollY >= 1 ? header.classList.add(classes.background) : header.classList.remove(classes.background);
  });
  if (full) {
    return (
      <div ref={headerRef} id="main_header" className={classes.shadow}>
        <Header className={classes.header}>
          <Header.Frame className={classes.frame}>
            <div className={classes.nav}>
              <Header.Logo className={classes.logo} to="/browse" src={logo} alt="Netflix" />
              <NavBrowse />
            </div>
            <ProfilesNavSearch />
          </Header.Frame>
        </Header>
      </div>
    );
  }
  return (
    <Header className={classes.header}>
      <Header.Frame className={classes.frame}>
        <Header.Logo className={classes.logo} to="/browse" src={logo} alt="Netflix" />
      </Header.Frame>
    </Header>
  );
}
const NavBrowse = () => {
  return (
    <ul className={classes.links}>
      <li className={classes.active}>
        <NavLink className={(isActive) => (isActive.isActive ? classes.active : null)} to="/browse">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={(isActive) => (isActive.isActive ? classes.active : null)} to="/browse/tvshow">
          TV Show
        </NavLink>
      </li>
      <li>
        <NavLink className={(isActive) => (isActive.isActive ? classes.active : null)} to="/browse/movies">
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink className={(isActive) => (isActive.isActive ? classes.active : null)} to="/browse/newPopular">
          New &amp; Popular
        </NavLink>
      </li>
      <li>
        <NavLink className={(isActive) => (isActive.isActive ? classes.active : null)} to="/browse/myList">
          My List
        </NavLink>
      </li>
    </ul>
  );
};
const ProfilesNavSearch = () => {
  return (
    <div className={classes.profile_Nav}>
      <div className={classes.nav_element}>
        <button className={classes.search_button}>
          <SearchSvg />
        </button>
      </div>
      <div className={classes.nav_element}>
        <button className={classes.search_button}>
          <NotficationSvg />
        </button>
      </div>
      <ProfileMenu />
      <div className={classes.nav_element}></div>
    </div>
  );
};

// const ProfileMenu = () => {
//   const [showMenu, setshowMenu] = useState(false);
//   let timer;
//   const showMenuHandler = () => {
//     clearTimeout(timer);
//     setshowMenu(true);
//   };
//   const closeMenuHandler = () => {
//     timer = setTimeout(() => {
//       setshowMenu(false);
//     }, 350);
//   };
//   return (
//     <div onMouseEnter={showMenuHandler} onMouseLeave={closeMenuHandler} className={classes.my_profile}>
//       <button className={`${classes.search_button} ${classes.prfile_img}`}>
//         <img src={profiles[0].imageUrl} alt="profile" />
//         <span className={`${classes.tre} ${showMenu ? classes.active : ''}`}></span>
//       </button>
//       {showMenu && <ProfileMenuList />}
//     </div>
//   );
// };

// const ProfileMenuList = (props) => {
//   return (
//     <div className={classes.profile_menu}>
//       <span className={`${classes.tre} ${classes.top}`}></span>
//       <ProfileMenuItems child={profiles} />
//       <ul className={classes.profile_list}>
//         <li>
//           <Link to="/browse">
//             <button className={`${classes.search_button} ${classes.prfile_img}`}>
//               <AccountSvg />
//             </button>
//             <div>Account</div>
//           </Link>
//         </li>
//         <li>
//           <Link to="/browse">
//             <button className={`${classes.search_button} ${classes.prfile_img}`}>
//               <QuestionMarkSvg />
//             </button>
//             <div>Help Center</div>
//           </Link>
//         </li>
//       </ul>
//       <ul className={classes.profile_list}>
//         <li>
//           <Link to="/browse">
//             <div className={classes.signout}>Sign Out From Netflix</div>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// const ProfileMenuItems = (props) => {
//   return (
//     <ul className={classes.profile_list}>
//       {props.child.map((c) => (
//         <li key={c.id}>
//           <Link to="/browse">
//             {c.imageUrl && (
//               <button className={`${classes.search_button} ${classes.prfile_img}`}>
//                 <img src={c.imageUrl} alt={c.profileName} />
//               </button>
//             )}
//             <div>{c.profileName}</div>
//           </Link>
//         </li>
//       ))}
//       <li>
//         <Link to="/browse">
//           <button className={`${classes.search_button} ${classes.prfile_img}`}>
//             <EditPenSvg />
//           </button>
//           <div>Manage Profiles</div>
//         </Link>
//       </li>
//     </ul>
//   );
// };
export default BrowseHeader;
