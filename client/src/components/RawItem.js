import React, { Component } from 'react'
import { Typography, TableRow, TableCell } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
  cell: {
    width: "100%"
  }
})

class RawItem extends Component {


  state = {
    transNum : 0,
    maxRec : 0
  }


  sendSelectedRow = () => {
    this.props.parentCallback(this.props.row, this.props.data.start_time, this.props.data.duration)
  }

  getMaxRecommendandTrans = () => {
    // let url = new URL('http://localhost:5000/Trans/getmax/' + String(this.props.data._id))
    // fetch(url)
    // .then(
    //   response => {
    //     console.log(response)
    //     this.setState({transNum: !response.translationNum ? 0: !response.translationNum, maxRec: !response.maxVote ? 0 : !response.maxVote})
    //   })

    const datapair = new URLSearchParams();
    datapair.append("sentence_block_id", this.props.data._id)

    fetch("/getmax", {
      method: "POST",
      body: datapair
    })
    .then((response) => {
      console.log(response)
      this.setState({transNum: !response.translationNum ? 0: !response.translationNum, maxRec: !response.maxVote ? 0 : !response.maxVote})
    })
  }

  constructor(props){
    super(props)

    this.getMaxRecommendandTrans()

  }

  render() {
    const { classes } = this.props
    const sub = this.props.data

    var startHour = Math.floor(Number(sub.start_time) / 3600)
    var startMin = Math.floor(Number(sub.start_time) / 60) % 60
    var startSec = (Number(sub.start_time) - 60 * startMin - 3600 * startHour).toFixed(2)

    var endTime = (Number(sub.start_time) + Number(sub.duration)).toFixed(2)

    var endHour = Math.floor(Number(endTime) / 3600)
    var endMin = Math.floor(Number(endTime) / 60) % 60
    var endSec = (Number(endTime) - 60 * endMin - 3600 * endHour).toFixed(2)
    
    let empty = '      '

    return (
      <div>
        <TableCell className={classes.cell} onClick={this.sendSelectedRow}>
          <div><Typography variant='caption'>{startHour}:{startMin}:{startSec} - {endHour}:{endMin}:{endSec}</Typography></div>
          <Typography variant='h6'>{sub.raw_eng}</Typography>
          <div><div>
            <Typography variant='caption'>번역수: {this.state.transNum} {empty}</Typography>
            <Typography variant='caption'>추천수: {this.state.maxRec} {empty}</Typography></div>
          </div>
        </TableCell>

      </div>
    )


  }


}

export default withStyles(styles)(RawItem)