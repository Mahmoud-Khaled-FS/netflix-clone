import React, { useEffect } from 'react';
import Title, { TitleHeader } from '../components/browse/title/Title';
import CloseButton from '../components/UI/close/CloseButtom';
import Backdrop from '../components/UI/backdrop/Backdrop';
import TitleBody, { AboutTitle, EpisodesList, MoreContent } from '../components/browse/title/TitleBody';
import PreviewModelContainer from './PreviewModel';
import episodes from '../fixtures/episodes.json';
import { useDispatch, useSelector } from 'react-redux';
import { setScroll } from '../store/features/pagesState/pagesStatesSlice';
import { useState } from 'react';
import { addMovie } from '../store/features/movie/movieDataSlice';
import { useParams } from 'react-router-dom';
import Loading from '../components/UI/loading/loading';

const fetchData = async (id, token, userId) => {
  try {
    const result = await fetch(`http://localhost:8080/m/movie/${id}?userid=${userId}&token=${token}`);
    const data = await result.json();
    if (data.code === 202) {
      return data.data;
    }
  } catch (err) {
    console.log(err);
  }
};

function TitleContainer() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const movies = useSelector((store) => store.movies.movies);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const id = useParams().id;
  useEffect(() => {
    dispatch(setScroll(window.scrollY));
    window.scrollTo({ top: 0 });
  }, []);
  const movieIndex = movies.findIndex((m) => m.id === +id);
  useEffect(() => {
    let movie;
    if (movieIndex !== -1) {
      movie = movies[movieIndex];
      setData(movie);
      setLoading(false);
    } else {
      setLoading(true);
      fetchData(id, auth.token, auth.userId).then((data) => {
        movie = data;
        dispatch(addMovie(movie));
        console.log(movie);
        setData(movie);
        setLoading(false);
      });
    }
  }, []);
  const headerData = {
    imageCoverUrl: episodes['image-cover'],
    imageTitleUrl: episodes['image-title'],
    title: episodes.title,
  };
  const previewData = {
    title: episodes.title,
    description: episodes.description,
    tags: episodes.info.filter((t) => t.title === 'Cast' || t.title === 'Genres' || t.title === 'This Show Is'),
    about: episodes.about,
    seasonsNumber: episodes.episodes['seasons-number'].toString(),
  };
  return (
    <>
      {loading && (
        <>
          <Loading />
        </>
      )}
      {!loading && (
        <Title>
          <TitleHeader data={{ imageCoverUrl: data.backdrop_path, title: data.title }} />
          <CloseButton />
          <TitleBody>
            <PreviewModelContainer
              data={{
                title: data.title,
                description: { text: data.overview },
                tags: episodes.info.filter(
                  (t) => t.title === 'Cast' || t.title === 'Genres' || t.title === 'This Show Is'
                ),
                about: {
                  match: data.vote_average,
                  maturity: data.abult ? '+18' : '+12',
                  // seasonsNumber: 1,
                  duration: data.runtime,
                  status: data.status,
                  feature: 'HD',
                },
              }}
            />
            {episodes.type === 'TV Show' && <EpisodesList data={episodes.episodes} />}
            {episodes['more-content'] && episodes['more-content'].map((more, i) => <MoreContent key={i} data={more} />)}
            <AboutTitle dataTags={episodes.info} title={episodes.title} />
          </TitleBody>
        </Title>
      )}
      <Backdrop />
    </>
  );
}

export default TitleContainer;
