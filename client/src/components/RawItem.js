import React, { Component } from 'react'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  cell: {
    width: "100%"
  }
})

class RawItem extends Component {

  sendSelectedRow = () => {
    this.props.parentCallback(this.props.row, this.props.data.start_time, this.props.data.duration)
  }

  render() {
    const { classes } = this.props
    const sub = this.props.data

    var startHour = Math.floor(Number(sub.start_time) / 3600)
    var startMin = Math.floor(Number(sub.start_time) / 60) % 60
    var startSec = Number(sub.start_time).toFixed(2) - 60 * startMin - 3600 * startHour

    var endTime = (Number(sub.start_time) + Number(sub.duration)).toFixed(2)

    var endHour = Math.floor(Number(endTime) / 3600)
    var endMin = Math.floor(Number(endTime) / 60) % 60
    var endSec = Number(endTime).toFixed(2) - 60 * endMin - 3600 * endHour


    return (
      <div>
        <TableCell className={classes.cell} onClick={this.sendSelectedRow}>
          <div><Typography variant='caption'>{startHour}:{startMin}:{startSec} - {endHour}:{endMin}:{endSec}</Typography></div>
          <Typography variant='h6'>{sub.raw_eng}</Typography>
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