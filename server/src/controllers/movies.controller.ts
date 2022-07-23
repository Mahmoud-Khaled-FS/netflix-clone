import { RequestHandler } from 'express';
import { errorHandler, ErrorRequest } from '../helpers/error-handel';
import getAccountAndUser from '../helpers/get-accunt-user';
import axios from 'axios';
import MoviesDBApi from '../models/moviesdb-api';
import { Genere, Movie } from '../types/movie';

export const getGenereHandler: RequestHandler = async (req, res, next) => {
  try {
    await getAccountAndUser(req, next);

    const db = new MoviesDBApi(<string>process.env.MOVIES_DB_TOKEN);

    const data = await axios.get(db.generateUrl('/genre/movie/list'));

    const result = await data.data;

    res.status(202).json({ code: 202, status: 'sucess', ...result });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getMoviesWithGenere: RequestHandler = async (req, res, next) => {
  try {
    await getAccountAndUser(req, next);

    const db = new MoviesDBApi(<string>process.env.MOVIES_DB_TOKEN);

    // console.log(req.params.id);
    if (!req.params.id) throw new ErrorRequest('something wrong', 401, 'failed');
    let page = '1';
    if (req.query.page) {
      page = req.query.page as string;
    }
    // const data = await axios.get(db.generateUrl('/genre/movie/list'));
    const data = await axios.get(db.generateUrl('/discover/movie', `with_genres=${req.params.id}`, `page=${page}`));
    const result: any = await data.data;

    const sendData = result.results.map((r: any) => {
      return { title: r.title, imageUrl: db.generateImageUrl(r.backdrop_path), id: r.id };
    });
    res.status(202).json({ code: 202, status: 'sucess', results: [...sendData], page: page });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getMovieDetails: RequestHandler = async (req, res, next) => {
  try {
    await getAccountAndUser(req, next);

    const db = new MoviesDBApi(<string>process.env.MOVIES_DB_TOKEN);

    // console.log(req.params.id);
    if (!req.params.movie_id) throw new ErrorRequest('something wrong', 401, 'failed');
    // const data = await axios.get(db.generateUrl('/genre/movie/list'));
    const data = await axios.get(db.generateUrl(`/movie/${req.params.movie_id}`));

    if (!data) throw new ErrorRequest('something wrong', 403, 'failed');
    const result = await data.data;

    const movie: Movie = {
      id: result.id,
      adult: result.adult,
      backdrop_path: db.generateImageUrl(result.backdrop_path),
      collection: result.belongs_to_collection
        ? { id: result.belongs_to_collection.id, name: result.belongs_to_collection.name }
        : undefined,
      genres: result.genres,
      original_language: result.original_language,
      overview: result.overview,
      popularity: result.popularity,
      poster_path: result.poster_path,
      release_date: result.release_date,
      title: result.title,
      vote_average: result.vote_average,
      vote_count: result.vote_count,
      status: result.status,
      runtime: result.runtime,
    };

    res.status(202).json({ code: 202, status: 'sucess', data: movie });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getTopRated: RequestHandler = async (req, res, next) => {
  try {
    await getAccountAndUser(req, next);
    let page = Number(req.query.page);
    if (!page || typeof page !== 'number') {
      page = 1;
    }

    const dataMovies = await fetchMoviesPagesData('/movie/top_rated', page);

    res.status(202).json({ code: 202, status: 'sucess', data: dataMovies, page: page });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};
export const getPopular: RequestHandler = async (req, res, next) => {
  try {
    await getAccountAndUser(req, next);
    let page = Number(req.query.page);
    if (!page || typeof page !== 'number') {
      page = 1;
    }
    const dataMovies = await fetchMoviesPagesData('/movie/popular', page);

    res.status(202).json({ code: 202, status: 'sucess', data: dataMovies, page: page });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

async function fetchMoviesPagesData(path: string, page: number) {
  const db = new MoviesDBApi(<string>process.env.MOVIES_DB_TOKEN);

  const dataFirstPage = await axios.get(db.generateUrl(path, `page=${page * 2 - 1}`));
  const dataSecondPage = await axios.get(db.generateUrl(path, `page=${page * 2}`));

  if (!dataFirstPage) throw new ErrorRequest('something wrong', 401, 'failed');
  if (!dataSecondPage) throw new ErrorRequest('something wrong', 401, 'failed');

  const firstResult: [] = await dataFirstPage.data.results;
  const secondResult: [] = await dataSecondPage.data.results;
  const result = [...firstResult, ...secondResult];

  const dataMovies = result.map((movie: any) => {
    return {
      id: movie.id,
      imageUrl: db.generateImageUrl(movie.backdrop_path),
      title: movie.title,
    };
  });
  return dataMovies;
}
