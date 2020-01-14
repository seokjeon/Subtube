import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ClearIcon from '@material-ui/icons/Clear'
import { TableRow, TableCell, Typography } from '@material-ui/core'

const faker = require('faker')
faker.locale = "ko"

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
    },tableCell: {
        width: "100vh"
    },tableRow: {
        height: "10vt"
    }
})

class OtherSubBlock extends Component {
    state = {
        data : new Array
    }
    delete_translation = async(index)=>{
        
        fetch("/trans/delete/"+this.props.otherSub[index]._id,{
            method:"GET", 
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(()=>{
            this.props.refresh_trans_list()
        })
        .catch(err=>console.log('delete err: ', err))
    }
    


    updateVote = async (id, index)=>{

        const response = await fetch('/vote/'+id)
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
                <div >
                    <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell}>
                            <div>
                                <Typography className={classes.votesText} variant='caption'>Subtube 관리자</Typography>
                                <ClearIcon className={classes.icon} onClick={()=>this.delete_translation(index)} style={{ color: `rgb(230, 0, 0)` }}></ClearIcon>
                            </div>
                            <Typography className={classes.text} variant='h6'>{data.processed_eng}</Typography>
                            <Typography className={classes.text} variant='h6'>{data.translated_kor}</Typography>
                            <div className={classes.votesText}>
                                <div onClick ={()=>this.updateVote(data._id, index)}>
                                    <ThumbUpIcon color="primary"></ThumbUpIcon>
                                    <Typography variant='caption'>{data.num_of_votes}</Typography>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </div>
            )
        })

    }
}

export default withStyles(styles)(OtherSubBlock)