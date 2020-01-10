import React, { Component } from 'react'
import RawBlock from '../components/RawBlock'
import TransBlock from '../components/TransBlock'
import OtherSubBlock from '../components/OtherSubBlock'
import NavBar from '../components/NavBar'
import {withStyles} from '@material-ui/core/styles'
import {Box} from '@material-ui/core'
import { sizing } from '@material-ui/system'
import TableCell from '@material-ui/core/TableCell'


const styles = theme =>({
  left : {
    width : '45%',
    marginTop : theme.spacing.unit * 3,
    marginLeft: '3.3%',
    overflowX : "auto",
    float: 'left'
  },
  right:{

    width : '45%',
    display:'inline-block',
    marginTop : theme.spacing.unit * 3,
    overflow: 'auto',
    marginLeft: '3.3%',
    minHeight: 400,
  },
  video:{
    overflow: 'auto',
    minHeight: '35vh',
    marginTop: '20px',
  },
  subBlock:{

  },
  TransBlock:{
    width: '100%',
    overflow: 'auto',
    minHeight: '30vh',
    marginTop: '20px',
  },
  OtherSub:{
  }
})

class Translate extends Component{

    render(){
        const {classes} = this.props;

        return (
            <div>
                <NavBar></NavBar>
                <div>
                    <div className = {classes.left}>
                        <div className = {classes.video}><RawBlock/></div>
                        <div className = {classes.RawBlock}><RawBlock/></div>
                    </div>
                    <div className = {classes.right}>
                        <TableCell><div className = {classes.TransBlock}><TransBlock/></div></TableCell>
                        <div className = {classes.OtherSub}><RawBlock/></div>
                   </div>
                </div>
                
                
            </div>
            
        )
    }

}

export default withStyles(styles)(Translate);