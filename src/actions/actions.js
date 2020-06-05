import {
  UPDATE_READY,
  UPDATE_PLAYERS_LIST,
  UPDATE_SEARCH,
  UPDATE_PLAYER_INFO
} from '../constants/constants';


export const updateReadyAction = (ready) => {
  return (dispatch) => {
      dispatch({type: UPDATE_READY, ready: ready});
  }
}

export const updatePlayersListAction = (playersList) => {
  return (dispatch) => {
      dispatch({type: UPDATE_PLAYERS_LIST, playersList: playersList});
  }
}

export const updateSearchAction = (search) => {
  return (dispatch) => {
      dispatch({type: UPDATE_SEARCH, search: search});
  }
}

export const updatePlayerInfoAction = (playerInfo) => {
  return (dispatch) => {
      dispatch({type: UPDATE_PLAYER_INFO, playerInfo: playerInfo});
  }
}
