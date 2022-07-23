import { UserLists } from '../types/userLists';
import { ErrorRequest } from './error-handel';

const getListType = (name: string): UserLists | void => {
  let listType: UserLists;
  if (name === 'like') {
    listType = 'likeList';
  } else if (name === 'love') {
    listType = 'loveList';
  } else if (name === 'dislike') {
    listType = 'dislikeList';
  } else {
    throw new ErrorRequest('something wrong', 500, 'failed');
  }
  return listType;
};
export default getListType;
