import React, { Component } from 'react'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
    cell : {
        width : "100%"
    }
})

class RawItem extends Component {
    
    sendSelectedRow = () => {
        this.props.parentCallback(this.props.row)
    }

    render() {
        const {classes} = this.props
        console.log(this.props.data)

        return (
            <div>

                <TableCell className = {classes.cell} onClick={this.sendSelectedRow}>
                    <div><Typography variant='caption'>00:03:00~00:03:05</Typography></div>
                    <Typography variant='h6'>{this.props.data.text}</Typography>
                    <div><div>
                        <Typography variant='caption'>번역수 </Typography>
                        <Typography variant='caption'>추천수</Typography></div>
                    </div>
                </TableCell>


            </div>
        )


    }


}

export default withStyles(styles)(RawItem)