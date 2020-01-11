import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles'
import {Home, MyPage, Translate} from './pages'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

const styles = theme =>({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table:{
    minWidth : 1080
  }
})

class App extends Component {
  state = {
      subs : ""
  }
  componentDidMount(){
    this.callApi().then(res => this.setState({subs : res}))
  }

  callApi = async ()=>{
    const response = await fetch('/')
    const body = await response.json()
    return body
  }

  render(){
    return(
      <Router>
        <Route exact path ="/subtube" component = {Home}/>
        <Route path ="/mypage" component = {MyPage}/>
        <Route path ="/translate" component = {Translate}/>
      </Router>
    )
    
  }

 
 
}

 export default withStyles(styles)(App);
