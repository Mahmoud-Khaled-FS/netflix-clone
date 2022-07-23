import React from 'react';
import * as DevicesSvg from '../../svg/Devices';
import classes from './styles/simple-setup.module.css';
import SimpleContainer from './Main';

const devices = [
  { title: 'TV', subTitle: 'Smart or internet connected TVs', svgElemnt: DevicesSvg.Smarttv },
  { title: 'Phone or Tablet', subTitle: 'Download the Netflix app to enjoy', svgElemnt: DevicesSvg.PhoneorTablet },
  { title: 'Computer', subTitle: 'Desktop or laptop', svgElemnt: DevicesSvg.Computer },
  { title: 'Game Console', subTitle: 'Connected to the internet', svgElemnt: DevicesSvg.GameConsole },
  { title: 'Streaming Device', subTitle: 'Connects your TV to the internet', svgElemnt: DevicesSvg.StreamingDevice },
  { title: 'Cable Set Top Box', subTitle: 'From your cable provider', svgElemnt: DevicesSvg.CableSetTopBox },
  { title: 'Something Else', subTitle: 'Enjoy Netflix with other internet-connected devices.', full: true },
];
function Devicesurvey({ onSubmit }) {
  const devicedCheaked = [];
  const submitHandler = (e) => {
    e.preventDefault();
    onSubmit(devicedCheaked);
  };
  return (
    <SimpleContainer>
      <SimpleContainer.AsideContainer
        title="What devices will you be watching on?"
        subTitle="You can watch Netflix on any of these devices. "
        boldSubTitle="Select all that apply."
        currentStep="1"
        totalSteps="5"
      />
      <SimpleContainer.Content>
        <form onSubmit={submitHandler}>
          <Devicesurvey.DeviceList dataDevice={devicedCheaked} devices={devices} />
          <SimpleContainer.Button>Next</SimpleContainer.Button>
        </form>
      </SimpleContainer.Content>
    </SimpleContainer>
  );
}

Devicesurvey.DeviceList = function DeviceList({ devices, dataDevice }) {
  const getDevicedCheaked = (e) => {
    const dataName = e.currentTarget.value;
    const dataNameIndex = dataDevice.findIndex((name) => dataName === name);
    if (dataNameIndex === -1) {
      e.target.parentNode.classList.add(classes.cheaked);
      return dataDevice.push(dataName);
    }

    e.target.parentNode.classList.remove(classes.cheaked);
    dataDevice.splice(dataNameIndex, 1);
  };
  return (
    <ul className={classes.simpleForm}>
      {devices.map((device, index) => {
        return (
          <li key={index} className={device.full && classes.fullItem}>
            <div className={classes.deviceItem}>
              <input
                onChange={getDevicedCheaked}
                id={device.title}
                name={device.title}
                type="checkbox"
                value={device.title}
              />
              <label htmlFor={device.title}>
                {device.svgElemnt && <div className={classes.image}>{device.svgElemnt()}</div>}
                <span className={classes.deviceTitle}>{device.title}</span>
                <span className={classes.deviceSubTitle}>{device.subTitle}</span>
              </label>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default Devicesurvey;
