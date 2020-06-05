import React from 'react';
import Loading from './Loading';
import Header from './Header';
import PlayerCard from './PlayerCard';
import { Pagination } from '@material-ui/lab';
import PlayersList from './PlayersList';
import {connect} from 'react-redux';
import {utils} from '../utils/utils';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './../app.scss';
import {
  updateReadyAction,
  updatePlayersListAction
} from '../actions/actions';

const mapStateToProps = state => {
  return {
    ready: state.ready,
    playersList: state.playersList,
    playerInfo: state.playerInfo,
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateReady: ready => dispatch(updateReadyAction(ready)),
    updatePlayersList: data => dispatch(updatePlayersListAction(data))
  };
}

class App extends React.Component {

  componentDidMount() {
    window.location.pathname.length <= 1 && this.getPlayersList();
  }

  getPlayersList(page, search) {
    this.props.ready && this.props.updateReady(false);
    utils.getPlayersList(page, search).then(data => {
      if (!data) return;
      this.props.updatePlayersList(data);
      this.props.updateReady(true);
    });
  }

  componentDidUpdate(prevProps) {
    (prevProps.search !== this.props.search && !this.props.playerInfo.averages) && this.getPlayersList(null, this.props.search);
  }

  render() {
    const meta = this.props.playersList.meta;
    return (
      <Router>
        <Header />
        <div className="container">
          {!this.props.ready && <Loading />}
            <Route exact path="/" component={PlayersList} />
          {meta &&
            <Route exact path="/">
              <div className="pagination-container">
                <Pagination count={meta.total_pages} onChange={(object, page) => this.getPlayersList(page)} />
              </div>
            </Route>
          }
          <Switch>
            <Route path="/:id" component={PlayerCard} />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
