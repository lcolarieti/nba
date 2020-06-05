import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {utils} from '../utils/utils';
import {
  updateReadyAction,
  updatePlayerInfoAction
} from '../actions/actions';

const mapStateToProps = state => {
  return {
    ready: state.ready
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateReady: ready => dispatch(updateReadyAction(ready)),
    updatePlayerInfo: playerInfo => dispatch(updatePlayerInfoAction(playerInfo))
  };
}

class PlayerCard extends React.Component {

  constructor(props) {
    super(props);

    this.props.updateReady(false);
    this.state = {
      playerData: null
    };
  }

  componentDidMount() {
    const playerId = this.props.match.params.id;
    utils.getPlayerInfo(playerId).then(data => {
      data.data && this.setState({playerData: data});
      this.props.updateReady(true);
    });
  }

  createCard(player) {
    let playerData = [];
    for (let [key, value] of Object.entries(player)) {
      let label = key.split('_');
      if (value && key !== 'id' && key !== 'team') {
        playerData.push(<p key={label + player.id}><strong>{label.join(' ')}:</strong> {value}</p>);
      } else if (value && key === 'team') {
        playerData.push(<p key={label + player.id}><strong>Team:</strong> {value.full_name}</p>);
      }
    }

    return (<div className="content">{playerData}</div>);
  }

  render() {
    const playerInfo = this.state.playerData ? this.state.playerData.data : null;
    const playerAverages = this.state.playerData ? this.state.playerData.averages : null;

    return (
      <div className="card-container">
        <Grid container>
          <Grid item xs={12} sm={3}>
            {
              playerInfo &&
                <div className="image-container">
                  <img
                  alt={`${playerInfo.first_name} ${playerInfo.last_name}`}
                  src={process.env.REACT_APP_PLAYER_PIC.replace('{last_name}', playerInfo.last_name).replace('{first_name}', playerInfo.first_name)}
                  onError={(e)=>{e.target.onerror = null; e.target.src= 'https://image.flaticon.com/icons/svg/166/166355.svg'}}
                  />
                </div>
            }
          </Grid>
          <Grid item xs={12} sm={1}></Grid>
          <Grid item xs={12} sm={8}>{playerInfo && this.createCard(playerInfo)}</Grid>
          <Grid item xs={12} sm={12}>
            {playerAverages && <h3>Season Averages</h3>}
            {playerAverages && this.createCard(playerAverages)}
          </Grid>
        </Grid>
      </div>
    );
  }


  componentWillUnmount() {
    this.props.updatePlayerInfo({
      averages: null,
      data: null
    });
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCard);
