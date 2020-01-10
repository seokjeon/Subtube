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
    const response = await fetch('/api/subs')
    const body = await response.json()
    return body
  }

  render(){
    return(
      <Router>
        <Route exact path ="/" component = {Home}/>
        <Route path ="/MyPage" component = {MyPage}/>
        <Route path ="/Translate" component = {Translate}/>
      </Router>
    )
    
  }
  /*
  render(){
    const {classes} = this.props;
    
    return (
      <div>
        {
          <Paper className = {classes.root}>
          <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>자막</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.subs ? this.state.subs.map(c => {return (            
                  <Subs key={c.id} subs={c.subs}/>
              )}) : ""}
            </TableBody>
          </Table>
          </Paper>
          
        }
      </div>
  
    );

  }
   */
 
}

export default withStyles(styles)(App);
