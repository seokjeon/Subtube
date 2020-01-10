import React, { Component } from 'react'
import RawBlock from '../components/RawBlock'
import TransBlock from '../components/TransBlock'
import OtherSubBlock from '../components/OtherSubBlock'
import NavBar from '../components/NavBar'
import { withStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableCell, TableBody } from '@material-ui/core'

const styles = theme => ({
    left: {
        width: '45%',
        marginTop: theme.spacing.unit * 3,
        marginLeft: '3.3%',
        overflowX: "auto",
        float: 'left',
    },
    right: {
        width: '45%',
        display: 'inline-block',
        marginTop: theme.spacing.unit * 3,
        overflow: 'auto',
        marginLeft: '3.3%',
        minHeight: 400,
    },
    video: {
        overflow: 'auto',
        minHeight: '35vh',
        marginTop: '20px',
    },
    
    TransBlock: {
        width: '100%',
        overflow: 'auto',
        minHeight: '30vh',
        marginTop: '20px',
    },
    OtherSub: {
        maxHeight: "50vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '30vh',
        marginTop: '20px',
        overflowY: 'scroll',
        
    }, root: {
        width: '100%',
        overflowX: "auto"
    },
    RawBlock : {
        maxHeight: "50vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '30vh',
        marginTop: '20px',
        overflowY: 'scroll',
    }

})

class Translate extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar></NavBar>
                <div>
                    <div className={classes.left}>
                        <div className={classes.TransBlock}>video</div>
                        <div className={classes.RawBlock}><RawBlock/></div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.TransBlock}><TransBlock/></div>
                        <div className={classes.OtherSub}>
                            <Table className={classes.root}><TableBody>
                            <OtherSubBlock/><OtherSubBlock/><OtherSubBlock/>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>

            </div>

        )
    }

}

export default withStyles(styles)(Translate);