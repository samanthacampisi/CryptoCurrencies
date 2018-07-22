import {
  FETCH_ALL_COINS,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_COIN_DETAILS,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_HISTORICAL,
  FETCH_COIN_HISTORICAL_SUCCESS,
  FETCH_USER_PORTFOLIO,
  FETCH_USER_PORTFOLIO_SUCCESS,
  SAVE_TO_USER_PORTFOLIO,
  SAVE_TO_USER_PORTFOLIO_SUCCESS,
} from '../constants/actionTypes';

const base64 = require('base-64');

export const fetchAllCoinsSuccess = (coins, page) => ({
  type: FETCH_ALL_COINS_SUCCESS,
  payload: { coins, page },
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

export const fetchCoinDetailsSuccess = (coinId, coin) => ({
  type: FETCH_COIN_DETAILS_SUCCESS,
  payload: { coinId, coin },
});

export const fetchCoinDetails = coinId => (dispatch) => {
  dispatch({
    type: FETCH_COIN_DETAILS,
  });
  fetch(`https://test.cryptojet.io/coins/${coinId}`)
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(fetchCoinDetailsSuccess(coinId, responseJson.coin));
    })
    .catch((error) => { console.warn(error); });
};

export const fetchCoinHistoricalSuccess = (coinId, historical) => ({
  type: FETCH_COIN_HISTORICAL_SUCCESS,
  payload: { coinId, historical },
});

export const fetchCoinHistorical = coinId => (dispatch) => {
  dispatch({
    type: FETCH_COIN_HISTORICAL,
  });
  fetch(`https://test.cryptojet.io/coins/${coinId}/historical`)
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(fetchCoinHistoricalSuccess(coinId, responseJson.historical));
    })
    .catch((error) => { console.warn(error); });
};

export const fetchUserPortfolioSuccess = portfolio => ({
  type: FETCH_USER_PORTFOLIO_SUCCESS,
  payload: portfolio,
});

export const fetchUserPortfolio = () => (dispatch) => {
  dispatch({
    type: FETCH_USER_PORTFOLIO,
  });
  fetch('https://test.cryptojet.io/portfolio', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${base64.encode('richard@rich.com:secret')}`,
    },
  })
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(fetchUserPortfolioSuccess(responseJson.coins));
    })
    .catch((error) => { console.log(error); });
};

export const saveToUserPortfolioSuccess = trade => ({
  type: SAVE_TO_USER_PORTFOLIO_SUCCESS,
  payload: trade,
});

export const saveToUserPortfolio = (coin_id, amount, price_usd, traded_at, notes) => (dispatch) => {
  dispatch({
    type: SAVE_TO_USER_PORTFOLIO,
  });
  fetch('https://test.cryptojet.io/portfolio', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${base64.encode('richard@rich.com:secret')}`,
    },
    body: JSON.stringify({
      coin_id,
      amount,
      price_usd,
      traded_at,
      notes,
    }),
  })
    .then(response => response.json())
    .then((responseJson) => {
      dispatch(saveToUserPortfolioSuccess(responseJson.trade));
    })
    .catch((error) => { console.log(error); });
};
