import classes from '../styles/titlebody.module.css';
import { Link } from 'react-router-dom';
import timeConvert from '../../../../helper/timeConvert';
export const TagsLinks = ({ title, tags, maxTags }) => {
  let filterTags = tags;
  if (maxTags) {
    filterTags = tags.length <= maxTags ? tags : [...tags.slice(0, maxTags), 'more'];
  }
  return (
    <div className={classes.tags_links}>
      <span className={classes.tags_links_title}>{title + ':'}</span>
      {filterTags.map((tag, i) => {
        let text = tag;
        if (i > 0) {
          text = ', ' + tag;
        }
        return (
          <span key={i} className={classes.tag_item}>
            <Link to="#about">{text}</Link>
          </span>
        );
      })}
    </div>
  );
};

export const DetailsData = ({ data }) => {
  return (
    <div className={classes.ptitle}>
      <div className={classes.title_name}>{data.title}</div>
      <div className={classes.ptitle_info}>
        {data.match && (
          <div className={classes.line}>
            <span className={classes.match}>{data.match} Average Vote</span>
          </div>
        )}
        <div className={`${classes.line} ${classes.second_line}`}>
          {data.year && <span>{data.year}</span>}
          {data.maturity && <span className={classes.maturity_rating}>{data.maturity}</span>}
          {data.duration && <span>{timeConvert(data.duration)}</span>}
          {data.seasonsNumber && <span>{data.seasonsNumber} Season</span>}
          {data.feature && <span className={classes.feature}>{data.feature}</span>}
        </div>
      </div>
    </div>
  );
};
export const Message = ({ data }) => {
  return (
    <div className={classes.message}>
      <div className={classes.message_content}>{data}</div>
    </div>
  );
};
export const Description = ({ data }) => {
  return <p className={classes.description}>{data}</p>;
};
