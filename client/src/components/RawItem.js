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
        this.props.parentCallback(this.props.row, this.props.data.start)
    }

    render() {
        const {classes} = this.props
        const sub = this.props.data

        return (
            <div>
                <TableCell className = {classes.cell} onClick={this.sendSelectedRow}>
                    <div><Typography variant='caption'>{sub.start} ~ {sub.start + sub.duration}</Typography></div>
                    <Typography variant='h6'>{sub.text}</Typography>
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