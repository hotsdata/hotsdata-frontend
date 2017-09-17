import axios from 'axios';

export const FETCH_HEROES_IN_PROGRESS = 'FETCH_HEROES_IN_PROGRESS';
export const FETCH_HEROES_SUCCESS = 'FETCH_HEROES_SUCCESS';
export const FETCH_HEROES_FAILURE = 'FETCH_HEROES_FAILURE';

export function fetchHeroesInProgress(bool) {
  return {
    type: FETCH_HEROES_IN_PROGRESS,
    isLoading: bool
  }
}

export function fetchHerosSuccess(data) {
  return {
    type: FETCH_HEROES_SUCCESS,
    heroes: data
  }
}

export function fetchHeroesFailure(error) {
  return {
    type: FETCH_HEROES_FAILURE,
    error: error
  }
}

export function fetchHeroes() {
  return (dispatch) => {
    dispatch(fetchHeroesInProgress(true));

    axios.get(`${process.env.API_HOST}/hero_info`, { headers: { Authorization: "Bearer " + localStorage.getItem('token')}})
      .then(response => {
        let responseData = response.data;

        dispatch(fetchHeroesInProgress(false));
        dispatch(fetchHerosSuccess(responseData));

        return Promise.resolve();
      })
      .catch(err => {
        dispatch(fetchHeroesInProgress(false));
        dispatch(fetchHeroesFailure(err));
      });
  }
}
