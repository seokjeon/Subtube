import React, { Component } from 'react'
import { TableRow, TableCell, Typography, Table } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
const styles = theme => ({
   
    tableRow: {
        height: "10vt"
    },
    tableCell: {
        width: "100%"
    }
})
class MyTranslate extends Component {

    state = {
        videoArr: new Array,
    }

    componentWillMount() {
        this.getVideos()
    }

    getVideos = async () => {
        let url = new URL('http://localhost:5000/api/video')

        const response = await fetch(url)
        const body = await response.json()
        let arr = new Array
        await body.forEach(v => {
            console.log(v)
            arr.push(v)
        })
        await this.setState({ videoArr: arr })
    }

    render() {
        const { classes } = this.props
        const videoArr = this.state.videoArr
        return videoArr.map((data, index) => {
            return (
                <div>
                    <TableRow className={classes.tableRow}>
                        <img src={"https://img.youtube.com/vi/"+videoArr[index].url+"/0.jpg"} style={{ width: 100 }} />
                        <TableCell className={classes.tableCell}>
                            <Typography variant = "body1">{videoArr[index].processed_eng}</Typography>
                            <Typography variant = "subtitle2">{videoArr[index].translated_kor}</Typography>
                            <Typography variant = "subtitle2" color="primary">{videoArr[index].num_of_votes}</Typography>

                        </TableCell>
                    </TableRow>
                </div>
            )
        })

    }

}

export default withStyles(styles)(MyTranslate)