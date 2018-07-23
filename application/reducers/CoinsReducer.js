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

const INITIAL_STATE = {
  coins: [],
  coinMap: new Map(),
  portfolio: [],
  isFetchingAllCoins: false,
  isFetchingCoinDetails: false,
  isFetchingHistorical: false,
  isFetchingPortfolio: false,
  isSavingToPortfolio: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ALL_COINS:
      return {
        ...state,
        isFetchingAllCoins: true,
      };

    case FETCH_ALL_COINS_SUCCESS: {
      const prevCoins = action.payload.page === 1 ? [] : state.coins.slice();
      const newCoins = action.payload.coins;
      const coins =
        newCoins && newCoins.length > 0
          ? prevCoins.concat(newCoins)
          : prevCoins;

      return {
        ...state,
        coins,
        isFetchingAllCoins: false,
      };
    }

    case FETCH_COIN_DETAILS:
      return {
        ...state,
        isFetchingCoinDetails: true,
      };

    case FETCH_COIN_DETAILS_SUCCESS: {
      const coinMap = new Map(state.coinMap);
      const { coinId, coin } = action.payload;
      const coinInMap = coinMap.get(coinId) || {};
      coinMap.set(coinId, { ...coinInMap, data: coin });

      return {
        ...state,
        coinMap,
        isFetchingCoinDetails: false,
      };
    }

    case FETCH_COIN_HISTORICAL:
      return {
        ...state,
        isFetchingHistorical: true,
      };

    case FETCH_COIN_HISTORICAL_SUCCESS: {
      const coinMap = new Map(state.coinMap);
      const { coinId, historical } = action.payload;
      const formattedHistorical = historical.map((e) => { return { x: e.snapshot_at, y: parseFloat(e.price_usd) }; });
      const coinInMap = coinMap.get(coinId) || {};
      coinMap.set(coinId, { ...coinInMap, historical: formattedHistorical });

      return {
        ...state,
        coinMap,
        isFetchingHistorical: false,
      };
    }

    case FETCH_USER_PORTFOLIO:
      return {
        ...state,
        isFetchingPortfolio: true,
      };

    case FETCH_USER_PORTFOLIO_SUCCESS: {
      const portfolio = action.payload;

      return {
        ...state,
        portfolio,
        isFetchingPortfolio: false,
      };
    }

    case SAVE_TO_USER_PORTFOLIO:
      return {
        ...state,
        isSavingToPortfolio: true,
      };

    case SAVE_TO_USER_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        isSavingToPortfolio: false,
      };
    }

    default:
      return state;
  }
};
