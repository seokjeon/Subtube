import NavBar from '../components/NavBar'
import MyTranslate from '../components/MyTranslate'
import React, { Component } from 'react'
import { Table, TableBody, Avatar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    left: {
        width: '45%',
        height: '88vh',
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
    }, table: {
        width: '100%',
        overflowX: "auto",
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }, myTransBlock: {
        maxHeight: "88vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '50vh',
        marginTop: '20px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    }, large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    center: {
        verticalAlign: "middle",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        marginTop : "20vh"
    },
    circleImageLayout: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2
    },

})
class MyPage extends Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                <div><NavBar /></div>
                <div className={classes.left} style={{ backgroundColor: 'lavender' }}>

                    <div className={classes.center}>
                        <img className={classes.circleImageLayout} src="https://source.unsplash.com/random" />
                        <Typography variant="h6">Subtube Administrator</Typography>
                        <Typography variant="subtitle1">3m</Typography>
                    </div>

                </div>
                <div className={classes.right}>
                    <div className={classes.myTransBlock}>
                        <Table><TableBody><MyTranslate /></TableBody></Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(MyPage)