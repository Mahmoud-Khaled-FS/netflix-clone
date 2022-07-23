import React from 'react';
import FaqsContainer from './../containers/Faqs';
import FooterContainer from './../containers/Footer';
import JumbotronContainer from './../containers/Jumbotron';
import HeaderContainer from '../containers/Header';
import Feature from '../components/feature/Feature';
import GetStartedContainer from '../containers/GetStarted';
function Home() {
  document.body.className = '';
  return (
    <React.Fragment>
      <HeaderContainer
        login={true}
        background="./images/misc/EG-en-20220509-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      >
        <Feature>
          <Feature.Title>Unlimited movies, TV shows, and more.</Feature.Title>
          <Feature.SubTitle>Watch anywhere. Cancel anytime.</Feature.SubTitle>
          <GetStartedContainer />
        </Feature>
      </HeaderContainer>
      <JumbotronContainer />
      <FaqsContainer />
      <FooterContainer />
    </React.Fragment>
  );
}

export default Home;
