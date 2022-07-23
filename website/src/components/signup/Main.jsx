import React from 'react';
import classes from './styles/main.module.css';
import Form from '../form/Form';

function Center({ children, style }) {
  return (
    <div style={style} className={classes.center}>
      {children}
    </div>
  );
}
Center.Step = ({ children, style }) => {
  return (
    <div style={style} className={classes.step}>
      {children}
    </div>
  );
};
Center.Form = ({ children, style, ...props }) => {
  return (
    <form style={style} {...props} className={classes.form}>
      {children}
    </form>
  );
};
Center.Header = ({ children, align, style }) => {
  return (
    <div style={style} className={`${classes.header} ${align === 'center' && classes.textCenter}`}>
      {children}
    </div>
  );
};
Center.Body = ({ children, style }) => {
  return (
    <div style={style} className={classes.body}>
      {children}
    </div>
  );
};
Center.Image = ({ className }) => {
  return (
    <div className={className}>
      <span></span>
    </div>
  );
};
Center.Title = ({ children, style }) => {
  return (
    <h1 style={style} className={classes.title}>
      {children}
    </h1>
  );
};
Center.Continer = ({ children }) => {
  return <div className="inline">{children}</div>;
};

Center.StepsNumber = ({ stepNumber, stepTotal }) => {
  return (
    <span className={classes.stepNumber}>
      STEP <b>{stepNumber}</b> OF <b>{stepTotal}</b>
    </span>
  );
};

Center.Input = ({ label, type, id, error, value, isValid, ...props }) => {
  return (
    <Form.Input
      {...props}
      error={error}
      label={label}
      type={type}
      id={id}
      value={value}
      className={`${classes.input} ${error ? classes.errorInput : null} ${isValid ? classes.valid : null}`}
    />
  );
};

Center.Button = ({ children, style, ...props }) => {
  return (
    <div style={style} className={classes.button}>
      <button {...props}>{children}</button>
    </div>
  );
};

Center.PaymentButton = ({ children, images }) => {
  return (
    <div className={classes.paymentButton}>
      <button>
        <div className={classes.content}>
          {children}
          {images.map((img, index) => {
            return <img key={index} src={img.src} alt={img.alt} />;
          })}
        </div>
        <span>
          <img src={process.env.PUBLIC_URL + '/images/signup/chevron_060915_2.svg'} alt="chevron" />
        </span>
      </button>
    </div>
  );
};
export default Center;
