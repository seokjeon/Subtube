import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'

const styles = theme => ({
    parent :{
        width: '100%',
        backgroundColor: 'red',
    },
    icon :{
        alignSelf: "end",
        float:'right',
    },
    text : {
        minHeight : '4vh',
        width : '90%',
        float : 'left',
        marginLeft: '5%',
        marginBottom : '1vh'
    },
    votesText :{
        alignSelf: "start",
        float:'left',
        marginLeft : '5%'
    }
})
class TransBlock extends Component {
    render(){
        const {classes} = this.props
        return (
            <div>
                <div>
                    <ClearIcon className={classes.icon} style ={{color : `rgb(230, 0, 0)`}}></ClearIcon> 
                    <CheckIcon className={classes.icon} style ={{color : `rgb(16, 180, 80)`}}></CheckIcon>                  
                </div>
                <TextField multiline variant = "outlined" className = {classes.text}></TextField>
                <TextField multiline variant = "outlined" className = {classes.text}></TextField>
                <div className={classes.votesText}><Typography variant= 'caption'>추천수</Typography></div>
            </div>
        )
    }
}

export default withStyles(styles)(TransBlock)