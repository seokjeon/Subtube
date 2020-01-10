import React, { Component } from 'react'
import { Typography, Table, TableRow, TableHead, TableBody, TableCell, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
    
})

class RawItem extends Component {
    
    constructor(){
        super()
        this.state = {
            color : '',
            clicked : 0
        }
    }
    handleClick = ()=>{
        this.setState({
            color : 'green',
            clicked : 1
        })
        console.log(this.state.color)
    }
    render() {
        const {classes} = this.props
        return (
            <div>
                <TableRow>
                    <TableCell bgColor ={this.state.color} onClick={this.handleClick}>
                    <div><Typography variant='caption'>00:03:00~00:03:05</Typography></div>
                            <Typography variant='h6'>Hello</Typography>
                             <div><div>
                                <Typography variant='caption'>번역수 </Typography>
                                <Typography variant='caption'>추천수</Typography></div>
                            </div>
                   </TableCell>
                </TableRow>
            </div>
        )
    }

}

export default withStyles(styles)(RawItem)