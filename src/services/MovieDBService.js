import axios from "axios";

export default class MovieDBService {

    #API_URL = 'https://api.themoviedb.org/3/';

    #API_Key = 'api_key=c44a17584532fd2e9358778c916fc8ce'

    #localStorageDB = 'MovieAPI_DB'

    getMovie = async (query, page = 1) => {
        const { data } = await axios.get(`${this.#API_URL}search/movie?${this.#API_Key}&query=${query}&page=${page}`)
        return data
    }

    getLocalStorageMovies = async () => {
        const data = await JSON.parse(localStorage.getItem(this.#localStorageDB))
        return data
    }
    
    getMovieGenres = async () => {
        const {data} = await axios.get(`${this.#API_URL}genre/movie/list?${this.#API_Key}`);
        return data
    }
}