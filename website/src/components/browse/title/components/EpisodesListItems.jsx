import React from 'react';
import PlaySvg from '../../../../svg/Play';
import classes from '../styles/titlebody.module.css';
export function EpisodesHader(data) {
  return (
    <div className={classes.episodes_header}>
      <div className={classes.episodes_header_title}>Episodes</div>
      <div className={classes.episodes_header_season}>Season {data.data}</div>
    </div>
  );
}

export const EpisodesContainer = (data) => {
  return (
    <div className={classes.episodes_container}>
      {data.data.map((ep, i) => (
        <Episode className={i === 0 ? classes.current : null} key={i} data={ep} />
      ))}
    </div>
  );
};

const Episode = ({ className, data }) => {
  // console.log(data);
  return (
    <div className={`${classes.episode_item} ${className ? className : ''}`}>
      <div className={classes.episode_number}>{data.episodeNumber}</div>
      <EpisodeImage src={data.episodeImage} alt={data.episodeTitle} />
      <EpisodeContent title={data.episodeTitle} description={data.episodeDescription} duration={data.episodeDuration} />
    </div>
  );
};

const EpisodeImage = ({ src, alt }) => {
  return (
    <div className={classes.episode_image}>
      <div className={classes.ep_img}>
        <img src={src} alt={alt} />
        <div className={classes.button_svg}>
          <PlaySvg />
        </div>
      </div>
    </div>
  );
};

const EpisodeContent = ({ title, description, duration }) => {
  return (
    <div className={classes.episode_content}>
      <div className={classes.episode_content_header}>
        <span>{title}</span>
        <span>{duration}</span>
      </div>
      <p>{description}</p>
    </div>
  );
};
