import {
  FETCH_ALL_COINS,
  FETCH_ALL_COINS_SUCCESS,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  coins: [],
  isFetchingAllCoins: false,
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

    default:
      return state;
  }
};
