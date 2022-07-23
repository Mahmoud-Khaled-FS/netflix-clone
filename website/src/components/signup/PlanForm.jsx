import React, { useState } from 'react';
import classes from './styles/steps.module.css';
import tableClasses from './styles/tableplan.module.css';
import Center from './Main';
import MarkSvg from '../../svg/Mark';
const PlanForm = ({ onSubmit, index }) => {
  let plan;
  const getSelectedPlanHandler = (selected) => {
    plan = selected;
  };
  return (
    <Center>
      <Center.Step>
        <Center.Header style={{ maxWidth: 1024, paddingTop: 10 }}>
          <Center.Continer>
            <Center.StepsNumber stepTotal="3" stepNumber={index} />
            <Center.Title>Choose the plan that’s right for you</Center.Title>
          </Center.Continer>
          <div>
            <ul className={classes.listPlan}>
              <li>
                <MarkSvg color="#e50914" />
                <span>No commitments, cancel anytime.</span>
              </li>
              <li className={classes.listSmallMargin}>
                <MarkSvg color="#e50914" />
                <span>Everything on Netflix for one low price.</span>
              </li>
              <li className={classes.listSmallMargin}>
                <MarkSvg color="#e50914" />
                <span>Unlimited viewing on all your devices.</span>
              </li>
            </ul>
          </div>
        </Center.Header>
        <TabelPlan onSelect={getSelectedPlanHandler} />
        <Center.Button onClick={() => onSubmit(plan)} style={{ maxWidth: 440 }}>
          Next
        </Center.Button>
      </Center.Step>
    </Center>
  );
};

const TabelPlan = ({ onSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState('pl-1');
  onSelect(selectedPlan);
  const choosePlanHandler = (e) => {
    const planTarget = e.currentTarget.ariaLabel;
    if (selectedPlan === planTarget) return;
    document.getElementById(planTarget).checked = true;
    setSelectedPlan(planTarget);
  };
  // console.log(`${tableClasses.cells} ${selectedPlan === 'basic' && tableClasses.selectedCell}`);
  return (
    <div>
      <div className={tableClasses.planeHeader}>
        <div className={tableClasses.planeHeaderContainer}>
          <label
            htmlFor="pl-1"
            onClick={choosePlanHandler}
            aria-label="pl-1"
            className={selectedPlan === 'pl-1' ? tableClasses.selectedLabel : null}
          >
            <input value="pl-1" onChange={() => {}} checked={true} type="radio" name="plan" id="pl-1" />
            <span>Basic</span>
          </label>
          <label
            htmlFor="pl-2"
            onClick={choosePlanHandler}
            aria-label="pl-2"
            className={selectedPlan === 'pl-2' ? tableClasses.selectedLabel : null}
          >
            <input value="pl-2" onChange={() => {}} type="radio" name="plan" id="pl-2" />
            <span>Standard</span>
          </label>
          <label
            htmlFor="pl-3"
            onClick={choosePlanHandler}
            aria-label="pl-3"
            className={selectedPlan === 'pl-3' ? tableClasses.selectedLabel : null}
          >
            <input value="pl-3" onChange={() => {}} type="radio" name="plan" id="pl-3" />
            <span>Premium</span>
          </label>
        </div>
      </div>
      <table className={tableClasses.table}>
        <tbody>
          <tr>
            <td onClick={choosePlanHandler} className={tableClasses.tableTitle}>
              Monthly price
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-1"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-1' ? tableClasses.selectedCell : null}`}
            >
              EGP120
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-2"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-2' ? tableClasses.selectedCell : null}`}
            >
              EGP165
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-3"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-3' ? tableClasses.selectedCell : null}`}
            >
              EGP200
            </td>
          </tr>
          <tr>
            <td onClick={choosePlanHandler} className={tableClasses.tableTitle}>
              Video quality
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-1"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-1' ? tableClasses.selectedCell : null}`}
            >
              Good
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-2"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-2' ? tableClasses.selectedCell : null}`}
            >
              Better
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-3"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-3' ? tableClasses.selectedCell : null}`}
            >
              Best
            </td>
          </tr>
          <tr>
            <td onClick={choosePlanHandler} className={tableClasses.tableTitle}>
              Resolution
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-1"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-1' ? tableClasses.selectedCell : null}`}
            >
              480
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-2"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-2' ? tableClasses.selectedCell : null}`}
            >
              1080p
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-3"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-3' ? tableClasses.selectedCell : null}`}
            >
              4K+HDR
            </td>
          </tr>
          <tr>
            <td onClick={choosePlanHandler} className={tableClasses.tableTitle}>
              Watch on your TV, computer, mobile phone and tablet
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-1"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-1' ? tableClasses.selectedCell : null}`}
            >
              <MarkSvg />
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-2"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-2' ? tableClasses.selectedCell : null}`}
            >
              <MarkSvg />
            </td>
            <td
              onClick={choosePlanHandler}
              aria-label="pl-3"
              className={`${tableClasses.cells} ${selectedPlan === 'pl-3' ? tableClasses.selectedCell : null}`}
            >
              <MarkSvg />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={tableClasses.small}>
        <small>
          HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device
          capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.
        </small>
        <small>
          Only people who live with you may use your account. Watch on 4 different devices at the same time with
          Premium, 2 with Standard and 1 with Basic.
        </small>
      </div>
    </div>
  );
};
export default PlanForm;
