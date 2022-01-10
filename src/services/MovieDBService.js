export default class MovieDBService {

    _apiURL = 'https://api.themoviedb.org/3/search/';

    _apiKey = 'api_key=c44a17584532fd2e9358778c916fc8ce'

    getMovie = async (query) => {
        const res = await fetch(`${this._apiURL}movie?${this._apiKey}&query=${query}`);
        const data = await res.json();
        return data
    }
}