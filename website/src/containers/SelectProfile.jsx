import React from 'react';
import BrowseHeader from '../components/browse/browseHeader/BrowseHeader';
import Profiles from '../components/browse/profiles/Profiles';

function SelectProfileContainer() {
  return (
    <React.Fragment>
      <BrowseHeader full={false} />
      <Profiles />
    </React.Fragment>
  );
}

export default SelectProfileContainer;
