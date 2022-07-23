import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { EpisodesContainer, EpisodesHader } from './components/EpisodesListItems';
import { MoreContentButton, MoreContentContainer, MoreContentHeader } from './components/MoreContentItems';
import { TagsLinks } from './components/PreviewModalData';
import classes from './styles/titlebody.module.css';
const TitleBody = (props) => {
  return (
    <div className={classes.title_body}>
      <div className={classes.title_body_container}>{props.children}</div>
    </div>
  );
};
export const PreviewModal = ({ children }) => {
  return (
    <div className="ptrack-container">
      <div className={classes.preview_model}>{children}</div>
    </div>
  );
};

PreviewModal.LeftContnet = ({ children }) => {
  return <div className={classes.preview_details_left}>{children}</div>;
};
PreviewModal.RightContnet = ({ children }) => {
  return <div className={classes.preview_details_right}>{children}</div>;
};

export const EpisodesList = ({ data }) => {
  return (
    <div className="ptrack-container">
      <div className={classes.episodes_list}>
        <EpisodesHader data={data['seasons-number']} />
        <EpisodesContainer data={data[`season-${data['seasons-number']}`]} />
      </div>
    </div>
  );
};

export const MoreContent = ({ data }) => {
  const eRef = useRef();
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    if (eRef.current.clientHeight > 750) {
      setShowButton(true);
    }
  }, []);
  const [showAll, setShowAll] = useState(false);
  const showMoreHandler = () => {
    setShowAll((prev) => !prev);
  };
  return (
    <div ref={eRef} className="ptrack-container">
      <div className={classes.more_content}>
        <MoreContentHeader text={data.title} />
        <MoreContentContainer fullContent={data['full-content']} cardData={data.content} showAll={showAll} />
        {showButton && <MoreContentButton onClick={showMoreHandler} showAll={showAll} />}
      </div>
    </div>
  );
};

export const AboutTitle = ({ dataTags, title }) => {
  return (
    <div className="ptrack-container">
      <div className={classes.about_container}>
        <MoreContentHeader text="About" strong={title} />
        {dataTags.map((tag, i) => (
          <TagsLinks key={tag.title} title={tag.title} tags={tag.tags} />
        ))}
      </div>
    </div>
  );
};

export default TitleBody;
