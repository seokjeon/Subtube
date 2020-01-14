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

    state = {
        data : new Array
    }

    updateVote = async (id, index)=>{

        let url = new URL('http://localhost:5000/vote')
        url.searchParams.append('objectID',id)
        const response = await fetch(url)
        const body = await response.json()
        
        const data = this.props.otherSub
        data[index].num_of_votes = body
        this.setState({data : data})
       
    }


    render() {
        
        let subData= this.props.otherSub
        if(!subData)
            return(<div></div>)
        const { classes } = this.props
        return subData.map((data, index) => {
            return (
                <div>
                    <TableRow>
                        <TableCell>
                            <div><Typography className={classes.votesText} variant='caption'>USERID</Typography></div>
                            <Typography className={classes.text} variant='h6'>{data.processed_eng}</Typography>
                            <Typography className={classes.text} variant='h6'>{data.translated_kor}</Typography>
                            <div className={classes.votesText}>
                                <div onClick ={()=>this.updateVote(data._id, index)}>
                                    <ThumbUpIcon color="primary"></ThumbUpIcon>
                                    <Typography variant='caption'>{data.num_of_votes}</Typography>
                                </div>
                            </div></TableCell>
                    </TableRow>
                </div>
            )
        })

    }
}

export default withStyles(styles)(OtherSubBlock)