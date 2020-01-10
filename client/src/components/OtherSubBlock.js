import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { TableRow, TableCell, Typography } from '@material-ui/core'

const styles = theme => ({

    icon: {
        alignSelf: "end",
        float: 'right',
    },
    text: {
        minHeight: '4vh',
        width: '90%',
        float: 'left',
        marginLeft: '5%',
        marginBottom: '1vh'
    },
    votesText: {
        alignSelf: "start",
        float: 'left',
        marginLeft: '5%',
        marginBottom: '0.3vh',
    },
})
class OtherSubBlock extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <TableRow>
                    <TableCell>
                <div><Typography className={classes.votesText} variant='caption'>USERID</Typography></div>
                <Typography className={classes.text} variant='h6'>Hello</Typography>
                <Typography className={classes.text} variant='h6'>안녕하세요</Typography>
                <div className={classes.votesText}>
                    <div>
                    <ThumbUpIcon color="primary"></ThumbUpIcon>
                    <Typography variant='caption'>추천수</Typography>
                    </div>
                </div></TableCell>
                </TableRow>
            </div>
        )
    }
}

export default withStyles(styles)(OtherSubBlock)