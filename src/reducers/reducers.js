import {
  UPDATE_READY,
  UPDATE_PLAYERS_LIST,
  UPDATE_SEARCH,
  UPDATE_PLAYER_INFO
} from '../constants/constants';

const initialState = {
  ready: false,
  playersList: {
    data: null,
    meta: null
  },
  search: '',
  playerInfo: {
    averages: null,
    data: null
  }
};

function rootReducer(state = initialState, action) {

  switch (action.type) {
    case UPDATE_READY:
      return Object.assign({}, state, {ready: action.ready});
    case UPDATE_PLAYERS_LIST:
      return Object.assign({}, state, {playersList: action.playersList});
    case UPDATE_SEARCH:
      return Object.assign({}, state, {search: action.search});
    case UPDATE_PLAYER_INFO:
      return Object.assign({}, state, {playerInfo: action.playerInfo});
    default:
      return state;
  }

}


export default rootReducer;
