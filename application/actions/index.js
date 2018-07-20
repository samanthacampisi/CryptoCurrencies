import {
  FETCH_ALL_COINS,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_ALL_COINS_FAILURE,
} from '../constants/actionTypes';

export const fetchAllCoinsSuccess = (coins, page) => ({
  type: FETCH_ALL_COINS_SUCCESS,
  payload: { coins, page },
});

export const fetchAllCoinsFailure = err => ({
  type: FETCH_ALL_COINS_FAILURE,
  payload: err,
});

export const fetchAllCoins = page => (dispatch) => {
  dispatch({
    type: FETCH_ALL_COINS,
  });
  fetch(`https://test.cryptojet.io/coins?page=${page}`)
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(fetchAllCoinsSuccess(responseJson.coins.data, page));
    })
    .catch((error) => { console.log(error); });
};
