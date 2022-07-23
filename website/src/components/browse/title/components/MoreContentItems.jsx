import classes from '../styles/titlebody.module.css';
import PlaySvg from '../../../../svg/Play';
import { MoreButton, MyListButton } from '../../../UI/controllersbottons/ControllersButtons';
export const MoreContentHeader = ({ text, strong }) => {
  return (
    <h3 className={classes.more_content_header}>
      {text}
      {strong ? <strong>{' ' + strong}</strong> : null}
    </h3>
  );
};

export const MoreContentContainer = ({ showAll, fullContent, cardData }) => {
  return (
    <div className={`${!showAll ? classes.more_content_container : ''}`}>
      <div className={classes.more_content_grid}>
        {cardData.map((data, i) => (
          <Card full={fullContent} key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ full = true, data }) => {
  return (
    <div className={`${classes.more_content_card} ${!full ? classes.small_card : ''}`}>
      <CardImage src={data.image} alt={data.title} duration={data.duration} />
      {full && (
        <CardFullContent year={data.year} maturity={data.maturity} match={data.match} description={data.description} />
      )}
      {!full && <CardSmallContent text={data.text} />}
    </div>
  );
};

export const MoreContentButton = ({ onClick, showAll }) => {
  return (
    <div className={`${classes.more_content_button} ${showAll ? classes.more_content_button_active : ''}`}>
      <MoreButton onClick={onClick} />
    </div>
  );
};
const CardImage = ({ src, alt, duration }) => {
  return (
    <div className={classes.card_image}>
      <div>
        <img src={src} alt={alt} />
      </div>
      <div className={classes.button_svg}>
        <PlaySvg />
      </div>
      {duration && <span>{duration}</span>}
    </div>
  );
};
const CardFullContent = ({ year, match, maturity, description }) => {
  return (
    <div className={classes.card_content}>
      <div className={classes.card_header}>
        <div className={classes.card_matced}>
          {match && (
            <div className={classes.card_first_line}>
              <span className={classes.match}>{match} Match</span>
            </div>
          )}
          <div className={classes.card_second_line}>
            <span className={classes.maturity_rating}>{maturity}</span>
            <span className={classes.card_year}>{year}</span>
          </div>
        </div>
        <MyListButton />
      </div>
      <p className={classes.card_description}>{description}</p>
    </div>
  );
};
const CardSmallContent = ({ text }) => {
  return (
    <div className={classes.card_content}>
      <div className={classes.small_card_contnet}>
        <span>{text}</span>
      </div>
    </div>
  );
};
