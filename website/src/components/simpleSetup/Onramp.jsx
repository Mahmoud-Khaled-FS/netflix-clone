import React from 'react';
import SimpleContainer from './Main';
import classes from './styles/onramp.module.css';
import onramp from '../../fixtures/onramp.json';
import Like from '../../svg/Like';
function Onramp({ onSubmit, profileName }) {
  const selectedData = [];
  const getOnrampHandler = (e) => {
    e.preventDefault();
    onSubmit(selectedData);
  };
  const addLikeHandler = (e) => {
    const dataName = e.currentTarget.dataset.name;
    const dataNameIndex = selectedData.findIndex((name) => dataName === name);
    if (dataNameIndex === -1) {
      e.currentTarget.classList.add(classes.selected);
      return selectedData.push(dataName);
    }

    e.currentTarget.classList.remove(classes.selected);
    selectedData.splice(dataNameIndex, 1);
  };

  return (
    <SimpleContainer>
      <SimpleContainer.AsideContainer
        title={`${profileName}, choose 3 you like.`}
        subTitle="This helps us to find TV shows and movies you’ll love."
        boldSubTitle="Select the ones you like."
        currentStep="5"
        totalSteps="5"
      />
      <SimpleContainer.Content>
        <form onSubmit={getOnrampHandler} className={classes.form}>
          <ul className={classes.onramp}>
            {onramp.map((i, index) => {
              return (
                <li key={index} onClick={addLikeHandler} data-name={i.title}>
                  <div className={classes.box}>
                    <img src={i.src} alt={i.title} />
                  </div>
                  <div className={classes.overlay}>
                    <span>
                      <Like />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          <SimpleContainer.FixedButton>Finish</SimpleContainer.FixedButton>
        </form>
      </SimpleContainer.Content>
    </SimpleContainer>
  );
}

export default Onramp;
