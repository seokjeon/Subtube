import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow'
import CheckIcon from '@material-ui/icons/Check'
import ClearIcon from '@material-ui/icons/Clear'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'

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
        marginLeft: '5%'
    }
})
class TransBlock extends Component {
    handleSubmit = (e) => {
        const form = document.getElementById('frmtransblock')
        var cur_url = window.location.href
        cur_url = cur_url.slice(cur_url.lastIndexOf('/')+1)
        console.log(form.elements.video_url.value = cur_url)
        form.submit()
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <form method="POST" id="frmtransblock">
                    <div>
                        <ClearIcon className={classes.icon} style={{ color: `rgb(230, 0, 0)` }}></ClearIcon>
                        <CheckIcon onClick={this.handleSubmit} className={classes.icon} style={{ color: `rgb(16, 180, 80)` }}></CheckIcon>
                    </div>
                    <TextField name='RawEng' multiline variant="outlined" className={classes.text}></TextField>
                    <TextField name='TranslatedKor' multiline variant="outlined" className={classes.text}></TextField>
                    <div className={classes.votesText}><Typography variant='caption'>추천수</Typography></div>
                    <input type='hidden' name="video_url"></input>
                </form>
            </div>


        )
    }
}

export default withStyles(styles)(TransBlock)