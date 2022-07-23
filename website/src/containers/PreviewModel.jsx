import React from 'react';
import { PreviewModal } from '../components/browse/title/TitleBody';
import { Description, DetailsData, Message, TagsLinks } from '../components/browse/title/components/PreviewModalData';
function PreviewModelContainer({ data }) {
  return (
    <PreviewModal>
      <PreviewModal.LeftContnet>
        <DetailsData data={{ ...data.about, seasonsNumber: data.seasonsNumber }} />
        {data.description.message && <Message data={data.description.message} />}
        <Description data={data.description.text} />
      </PreviewModal.LeftContnet>
      <PreviewModal.RightContnet>
        {data.tags.map((tag) => (
          <TagsLinks maxTags={3} key={tag.title} title={tag.title} tags={tag.tags} />
        ))}
      </PreviewModal.RightContnet>
    </PreviewModal>
  );
}

export default PreviewModelContainer;
