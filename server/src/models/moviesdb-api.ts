export default class MoviesDBApi {
  private api_key: string;
  private static apiUrl = 'https://api.themoviedb.org/3';

  constructor(apiKey: string) {
    this.api_key = apiKey;
  }
  generateUrl(path: string, ...q: string[]) {
    return MoviesDBApi.apiUrl + path + '?api_key=' + this.api_key + (q.length > 0 ? '&' : '') + q.join('&');
  }
  generateImageUrl(path: string) {
    return 'https://image.tmdb.org/t/p/w500' + path;
  }
}
