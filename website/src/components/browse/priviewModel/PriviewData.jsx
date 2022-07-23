import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addMovie } from '../../../store/features/movie/movieDataSlice';
import { MoreButton, MyListButton, PlayButton, ReactButton } from '../../UI/controllersbottons/ControllersButtons';
import { DetailsData } from '../title/components/PreviewModalData';
import classes from './styles/PriviewMode.module.css';
// const link = '/browse/title/i12';

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

const PriviewData = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const movies = useSelector((store) => store.movies.movies);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const movieIndex = movies.findIndex((m) => m.id === props.id);
  useEffect(() => {
    let movie;
    if (movieIndex !== -1) {
      movie = movies[movieIndex];
      setData(movie);
      setLoading(false);
    } else {
      setLoading(true);
      fetchData(props.id, auth.token, auth.userId).then((data) => {
        movie = data;
        dispatch(addMovie(movie));
        // console.log(movie);
        setData(movie);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div className={classes.container}>
      {!loading && (
        <div>
          <div className={classes.content}>
            <div className={classes.info}>
              <div>
                <ControllersButtons id={data.id} />
                <div className={classes.details_data}>
                  <DetailsData
                    title={data.title}
                    data={{
                      match: data.vote_average,
                      maturity: data.abult ? '+18' : '+12',
                      // seasonsNumber: 1,
                      duration: data.runtime,
                      status: data.status,
                      feature: 'HD',
                    }}
                  />
                </div>
                <Tags tags={data.genres} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
const ControllersButtons = (props) => {
  return (
    <div className={classes.buttons_control}>
      <PlayButton className={classes.control_button} />
      <MyListButton className={classes.control_button} />
      <ReactButton className={classes.control_button} />
      <Link to={'/browse/title/' + props.id} className={classes.link_more}>
        <MoreButton className={classes.control_button} />
      </Link>
    </div>
  );
};

const Tags = ({ tags }) => {
  // console.log(tags);

  return (
    <div className={classes.tags}>
      <div className={classes.tag}>
        {tags.map((t, i) => (
          <div key={t.id} className={classes.tag_item}>
            {i !== 0 && <span className={classes.tag_dot}></span>}
            <span className={classes.tag_text}>{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PriviewData;
