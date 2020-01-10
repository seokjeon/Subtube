import React, { Component } from 'react'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({

})

class RawItem extends Component {
    
    state = {
        isActive : null
    }

    handleClick = (rowInfo)=>{
        if(rowInfo === this.state.isActive){
            this.setState({
                isActive : null
            })
            return
        }
        this.setState({
            isActive : rowInfo
        })

    }

    render() {
        const {classes} = this.props
        return (
            <div>
                <TableRow onClick={this.handleClick} bgColor = {this.state.isActive === null ? 'red' : 'green'}>
                    <TableCell>
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