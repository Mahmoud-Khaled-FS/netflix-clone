import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PriviewMode from '../components/browse/priviewModel/PriviewMode';
import BrowseContainer from '../containers/Browse';
import GenreContainer from '../containers/Genre';
import TitleContainer from '../containers/Title';
import { useDispatch, useSelector } from 'react-redux';
import SelectProfileContainer from '../containers/SelectProfile';
import { setAllUsers } from '../store/features/auth/authenticationSlice';
import Loading from '../components/UI/loading/loading';
import useFetch from '../hooks/fetch';

// return <SelectProfileContainer />;
function Browse() {
  document.body.className = 'lightDark';
  const location = useLocation();
  const genreLocation = /browse\/\w*\/(\w*)?/.test(location.pathname);
  const showPriviewModel = useSelector((state) => state.priviewModel.hasContent);
  const auth = useSelector((store) => store.auth);
  const token = useSelector((store) => store.auth.token);

  const { data, loading, error } = useFetch(`http://localhost:8080/user/users?token=${token}`);

  const dispatch = useDispatch();
  useEffect(() => {
    if (loading === false) {
      dispatch(setAllUsers(data.data));
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      {auth.userId && <BrowseContainer scroll={genreLocation ? false : true} />}
      {!auth.userId && <SelectProfileContainer />}
      <Routes>
        <Route path="m/genre/:id" element={<GenreContainer />} />
        <Route path="/title/:id" element={<TitleContainer />} />
      </Routes>
      {showPriviewModel && <PriviewMode />}
    </div>
  );
}

export default Browse;
