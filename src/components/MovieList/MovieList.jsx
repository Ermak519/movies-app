import React, { Component } from 'react';
import { List, message } from 'antd';
import PropTypes from 'prop-types';

import MovieDBService from '../../services/MovieDBService';
import { MovieItem } from '../MovieItem';
import { PaginationList } from '../PaginationList';
import { LoadingStatus } from '../LoadingStatus';

import './MovieList.scss';

export default class MovieList extends Component {
  #localStore = 'MovieAPI_DB';

  constructor(props) {
    super(props);
    this.movieDBService = new MovieDBService();

    this.state = {
      status: '', // empty, error, loading, loading-cards, loaded
      totalPages: null,
      data: [],
    };
  }

  componentDidMount() {
    const { request } = this.props;
    if (!request) {
      this.setState({ status: 'empty' });
    } else {
      this.getData(request);
    }
  }

  componentDidUpdate(prevProps) {
    const { request, currentPage, onChangeCurrentPage, search, changeSearchStatus } = this.props;
    if (request !== prevProps.request && !request) this.getData('the way back', 'loading');
    if (request !== prevProps.request) {
      this.getData(request, 'loading');
      onChangeCurrentPage();
    }
    if (currentPage !== prevProps.currentPage && request === prevProps.request) {
      window.scrollTo(0, 0);
      this.getData(request, 'loading-cards', currentPage);
    }
    if (search === 'edit') {
      this.getData(request, 'loading-cards', currentPage);
      changeSearchStatus('ready');
    }
  }

  takeMovieRating = (arr, id) => {
    try {
      const idx = arr.findIndex((elem) => elem.id === id);
      const item = arr[idx];
      return item.clientRating;
    } catch {
      return null;
    }
  };

  getData = (query, initSate, page) => {
    if (!query) return;
    this.setState({ status: initSate });
    this.movieDBService
      .getMovie(query, page)
      .then((res) => {
        const { results, total_pages: totalPages } = res;
        this.setState({ totalPages });
        return results.map((obj, i) => {
          const elem = {
            id: results[i].id,
            title: results[i].title,
            descr: results[i].overview,
            img: results[i].poster_path,
            date: results[i].release_date || undefined,
            genres: results[i].genre_ids,
            rating: results[i].vote_average,
            clientRating: this.takeMovieRating(JSON.parse(localStorage.getItem('MovieAPI_DB')), results[i].id) || 0,
          };
          return elem;
        });
      })
      .then((list) => {
        this.setState({ data: list });
      })
      .then(() => {
        this.setState({ status: 'loaded' });
      })
      .catch(() => {
        message.error('404. ????, ??????-???? ???? ??????.');
        this.setState({ status: 'error' });
      });
  };

  addMovieToLocalStorage = (item) => {
    const movieLSItems = JSON.parse(localStorage.getItem(this.#localStore));
    localStorage.setItem(this.#localStore, JSON.stringify([...movieLSItems, item]));
  };

  updateMovieFromLocalStorage = (arr, value, id) => {
    const idx = arr.findIndex((elem) => elem.id === id);
    const newItem = arr[idx];
    newItem.clientRating = value;
    localStorage.setItem(this.#localStore, JSON.stringify([...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]));
  };

  onChangeRating = (id, value) => {
    const { data: arr } = this.state;
    const { changeStorageStatus, changeRatedStatus } = this.props;
    const idx = arr.findIndex((elem) => elem.id === id);
    const item = arr[idx];
    const movieLSItems = JSON.parse(localStorage.getItem(this.#localStore));
    item.clientRating = value;
    if (value) {
      if (movieLSItems === null) {
        localStorage.setItem(this.#localStore, JSON.stringify([item]));
        changeStorageStatus('data');
      } else {
        const checkMovie = movieLSItems.find((obj) => obj.id === id) || false;
        if (!checkMovie) {
          this.addMovieToLocalStorage(item);
        } else {
          this.updateMovieFromLocalStorage(movieLSItems, value, id);
        }
      }
      this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] });
    } else {
      if (movieLSItems.length === 1) {
        localStorage.setItem(this.#localStore, JSON.stringify([]));
      } else {
        localStorage.setItem(
          this.#localStore,
          JSON.stringify([...movieLSItems.slice(0, idx), ...movieLSItems.slice(idx + 1)])
        );
      }
      this.setState({ data: [...arr.slice(0, idx), item, ...arr.slice(idx + 1)] });
    }
    changeRatedStatus('edit');
  };

  render() {
    const { status, data, totalPages } = this.state;
    const { currentPage, onChangeCurrentPage } = this.props;

    return (
      <div className="movie-list">
        {status === 'loaded' || status === 'loading-cards' ? (
          <List
            grid={{
              gutter: 6,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <MovieItem item={item} status={status} onChangeRating={this.onChangeRating} />
              </List.Item>
            )}
          />
        ) : (
          <LoadingStatus status={status} />
        )}
        <PaginationList
          totalPages={totalPages}
          currentPage={currentPage}
          status={status}
          onChangeCurrentPage={onChangeCurrentPage}
        />
      </div>
    );
  }
}

MovieList.defaultProps = {
  request: '',
  currentPage: 1,
  onChangeCurrentPage: () => {},
  changeRatedStatus: () => {},
  changeSearchStatus: () => {},
  changeStorageStatus: () => {},
  search: '',
};

MovieList.propTypes = {
  request: PropTypes.string,
  currentPage: PropTypes.number,
  onChangeCurrentPage: PropTypes.func,
  changeRatedStatus: PropTypes.func,
  changeSearchStatus: PropTypes.func,
  changeStorageStatus: PropTypes.func,
  search: PropTypes.string,
};
