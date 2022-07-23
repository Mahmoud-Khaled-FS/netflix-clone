import { Router } from 'express';
import * as moviesController from '../controllers/movies.controller';

const router = Router();

router.get('/genre/lists', moviesController.getGenereHandler);

router.get('/genre/:id', moviesController.getMoviesWithGenere);

router.get('/movie/:movie_id', moviesController.getMovieDetails);

router.get('/movies/top_rated', moviesController.getTopRated);

router.get('/movies/popular', moviesController.getPopular);

export default router;
