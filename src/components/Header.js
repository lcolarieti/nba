import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { updateSearchAction } from '../actions/actions';
import {BrowserRouter as Router, Route} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    paddingLeft: '15px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      }
    }
  }
}));

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: search => dispatch(updateSearchAction(search))
  };
}

export const Header = ({search, updateSearch}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    let searchText = e.target.value.trim();
    searchText.length > 1 && updateSearch(searchText);
    (searchText.length === 0 && searchText !== search) && updateSearch(searchText);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap onClick={() => window.location = '/'}>            
            NBA
          </Typography>
          <Route exact path="/">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}/>
            </div>
          </Route>
        </Toolbar>
      </AppBar>
    </Router>
  );

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
