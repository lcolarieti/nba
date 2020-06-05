import React from 'react';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {
  updateReadyAction,
  updatePlayersListAction
} from '../actions/actions';


const mapStateToProps = state => {
  return {
    playersList: state.playersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateReady: ready => dispatch(updateReadyAction(ready)),
    updatePlayersList: data => dispatch(updatePlayersListAction(data))
  };
}


class PlayersList extends React.Component {

  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick(playerId) {
    window.location = `/${playerId}`;
  }

  createList() {
    let data = this.props.playersList.data;
    let list = [];
    data.map(player => {
      let playerData = [];
      for (let [key, value] of Object.entries(player)) {
        let label = key.split('_');
        if (value && key !== 'id' && key !== 'team') {
          playerData.push(<p key={label + player.id}><strong>{label.join(' ')}:</strong> {value}</p>);
        } else if (value && key === 'team') {
          playerData.push(<p key={label + player.id}><strong>Team:</strong> {value.full_name}</p>);
        }
      }
      list.push(
        <Grid key={'item' + player.id} item xs={12} sm={4} lg={3} onClick={() => this.handleCardClick(player.id)}>
          <div className="content">{playerData}</div>
        </Grid>)
    });

    list.length === 0 && list.push(<h3 key="no-results">No results found</h3>);

    return (
      <Grid container>
        {list}
      </Grid>
    );
  }

  render() {
    return (
      <div className="players-list-container">
        {this.props.playersList.data && this.createList()}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);
