import React from 'react';
import { useState } from 'react';
import CloseButton from '../components/UI/close/CloseButtom';
import Genre from '../components/browse/genre/Genre';
import Backdrop from '../components/UI/backdrop/Backdrop';
// import data from './../fixtures/slidshow.json';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setScroll } from '../store/features/pagesState/pagesStatesSlice';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/fetch';
import { useRef } from 'react';
import { useCallback } from 'react';
import Loading from '../components/UI/loading/loading';

function GenreContainer() {
  const ref = useRef();
  const [page, setPage] = useState('1');
  const id = useParams().id;
  const auth = useSelector((store) => store.auth);
  const [loadingInfinty, setLoadingInfinty] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState(false);
  const dispatch = useDispatch();

  const { data: gdata, loading: l } = useFetch(
    `http://localhost:8080/m/genre/lists?userid=${auth.userId}&token=${auth.token}`
  );
  let gen;
  if (!l) {
    gen = gdata.genres.find((g) => g.id === +id);
  }

  useEffect(() => {
    dispatch(setScroll(window.scrollY));
    window.scrollTo({ top: 0 });
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8080/m/genre/${id}?userid=${auth.userId}&token=${auth.token}&page=${page}`
        );
        const data = await res.json();
        if (data.code !== 202) {
          throw new Error('no data founded!');
        }
        setData(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const showAllDataHandler = () => {
    setAllData(true);
  };

  useEffect(() => {
    const scroll = async () => {
      if (loadingInfinty) {
        return;
      }
      if (
        document.documentElement.scrollTop + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 50
      ) {
        // console.log(allData);
        if (allData) {
          const pageFectch = +page + 1;
          setLoadingInfinty(true);
          const result = await fetch(
            `http://localhost:8080/m/genre/${id}?userid=${auth.userId}&token=${auth.token}&page=${pageFectch}`
          );
          const data = await result.json();
          setData((prev) => [...prev, ...data.results]);
          setLoadingInfinty(false);
          return setPage(`${pageFectch}`);
        }
      }
    };
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, [document.documentElement.scrollTop, allData, loadingInfinty, page]);

  if (loading || l) {
    return (
      <>
        <Loading />
        <Backdrop />
      </>
    );
  }
  return (
    <>
      <Genre>
        <Genre.Container>
          <Genre.Title>{gen.name}</Genre.Title>
          <Genre.BoxContainer>
            <Genre.Box>
              <Genre.BoxTitle>Populer in Netflix</Genre.BoxTitle>
              <div ref={ref}>
                <Genre.ItemContainer>
                  {!allData &&
                    data.slice(0, 8).map((d) => {
                      return <Genre.Item key={d.id} item={d} />;
                    })}
                  {allData &&
                    data.map((d) => {
                      return <Genre.Item key={d.id} item={d} />;
                    })}
                  {allData &&
                    data.map((d) => {
                      return <Genre.Item key={d.id} item={d} />;
                    })}
                </Genre.ItemContainer>
              </div>
              {!allData && <Genre.MoreContainerButton onClick={showAllDataHandler} />}
            </Genre.Box>
            <CloseButton />
          </Genre.BoxContainer>
        </Genre.Container>
      </Genre>

      <Backdrop />
    </>
  );
}

export default GenreContainer;
