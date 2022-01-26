import axios from "axios";

export default class MovieDBService {

    #API_URL = 'https://api.themoviedb.org/3/search/';

    #API_Key = 'api_key=c44a17584532fd2e9358778c916fc8ce'


    getMovie = async (query, page = 1) => {
        const { data } = await axios.get(`${this.#API_URL}movie?${this.#API_Key}&query=${query}&page=${page}`)
        return data
    }

    getMovieFromLocalStorage = async () => {
        const data = JSON.parse(localStorage.getItem('MovieAPI_DB'));
        return data
    }

    getData = async (query) => {
        const data = await axios.get(`${this.#API_URL}movie?${this.#API_Key}&query=${query}`)
        return data
    }
}