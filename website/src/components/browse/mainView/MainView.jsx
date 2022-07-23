import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FooterContainer from '../../../containers/Footer';
import { setGenresData } from '../../../store/features/pagesState/pagesStatesSlice';
import Error from '../../UI/error/Error';
import Loading from '../../UI/loading/loading';
import Billboard from '../billboard/Billboard';
import BrowseHeader from '../browseHeader/BrowseHeader';
import Slideshow from '../slideshow/Slideshow';
import classes from './styles/mainView.module.css';

function MainView() {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInfinty, setLoadingInfinty] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const result = await fetch(`http://localhost:8080/m/genre/lists?userid=${auth.userId}&token=${auth.token}`);
        const data = await result.json();

        let renderData = [];
        for (let i = 0; i < 3; i++) {
          const result = await fetch(
            `http://localhost:8080/m/genre/${data.genres[i].id}?userid=${auth.userId}&token=${auth.token}`
          );
          const dataGenere = await result.json();
          const resultPage2 = await fetch(
            `http://localhost:8080/m/genre/${data.genres[i].id}?userid=${auth.userId}&token=${auth.token}&`
          );
          const dataGenerePage2 = await resultPage2.json();
          // console.log(dataGenere.results);
          data.genres[i].genereData = [...dataGenere.results, ...dataGenerePage2.results];
          renderData.push(data.genres[i]);
        }
        if (data.code !== 202) {
          throw new Error();
        }
        // console.log(renderData);
        setDataRender(renderData);
        setData(data.genres);
        // dispatch(setGenresData(data.genres));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const scroll = async () => {
      if (loadingInfinty) {
        return;
      }
      if (
        document.documentElement.scrollTop + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 700
      ) {
        setLoadingInfinty(true);
        let unFetcedGeneres = data;
        for (const gen of dataRender) {
          // console.log(gen);
          unFetcedGeneres = unFetcedGeneres.filter((i) => i.id !== gen.id);
        }
        if (unFetcedGeneres.length === 0) {
          return;
        }
        const id = unFetcedGeneres[0].id;
        const idIndex = data.findIndex((gen) => gen.id === id);
        // console.log(idIndex);
        const result = await fetch(`http://localhost:8080/m/genre/${id}?userid=${auth.userId}&token=${auth.token}`);
        const dataGenere = await result.json();
        const resultPage2 = await fetch(
          `http://localhost:8080/m/genre/${id}?userid=${auth.userId}&token=${auth.token}&`
        );
        const dataGenerePage2 = await resultPage2.json();
        // console.log(dataGenere.results);
        let d = data.slice();
        let dr = dataRender.slice();
        d[idIndex].genereData = [...dataGenere.results, ...dataGenerePage2.results];
        dr.push(d[idIndex]);
        setData(d);
        setDataRender(dr);
        setLoadingInfinty(false);
      }
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, [document.documentElement.scrollTop, loadingInfinty, data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={classes.mainView}>
        <BrowseHeader />
        <div className={`${classes.container} on_open_browse`}>
          <Billboard />
          {dataRender.map((g) => (
            <Slideshow key={g.id} name={g.name} id={g.id} data={g.genereData} />
          ))}
        </div>
      </div>
      <FooterContainer />
      {error && <Error code={1544} message="something happend when fetching movies" />}
      {loading && <Loading />}
    </>
  );
}

export default MainView;
