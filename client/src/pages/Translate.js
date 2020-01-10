import React, { Component } from 'react'
import RawBlock from '../components/RawBlock'
import TransBlock from '../components/TransBlock'
import OtherSubBlock from '../components/OtherSubBlock'
import NavBar from '../components/NavBar'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
        width : "50%",
      flexGrow: 1,
    },
    
}));

class Translate extends Component{

    render(){
        const classes = useStyles();
        return (
            <div>
                <NavBar></NavBar>
                <div className = {classes.root}>
                    <RawBlock ></RawBlock>
                    <RawBlock></RawBlock>
                </div>
                <div>
                    <RawBlock></RawBlock>
                    <RawBlock></RawBlock>
                </div>
                
            </div>
            
        )
    }

}

export default Translate