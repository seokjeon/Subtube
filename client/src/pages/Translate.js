import React, { Component } from 'react'
import RawBlock from '../components/RawBlock'
import TransBlock from '../components/TransBlock'
import OtherSubBlock from '../components/OtherSubBlock'
import NavBar from '../components/NavBar'
import { withStyles } from '@material-ui/core/styles'
import { Table, TableBody } from '@material-ui/core'
import YouTube from 'react-youtube'
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
    RawBlock: {
        maxHeight: "50vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '30vh',
        marginTop: '20px',
        overflowY: 'scroll',
    },
    

})


class Translate extends Component {    
    state = {
        data: new Array,
        yt : null
    }


    constructor(props){
        super(props)

        
        let subtitles = new Array
        this.fetchVideoURL(this.props.match.params.url)
            .then(res => res.json())
            .then(
                data => {
                    if (data) {
                        data.forEach(sub => {
                            subtitles.push(sub)
                        })
                    }
                }
            )
            .then(() => (this.setState({ data: subtitles })))
            .catch(err => console.error(err))
    }

    fetchVideoURL = (url) => {
        return fetch('http://5373bf32.ngrok.io/Trans/' + url)
    }

    
    onPlayerReady = (player) =>{
        player.target.playVideo()
        
        this.setState({
            yt : player.target
        })
        
    }

    callBackFunction = (getStartTime)=>{

        this.state.yt.seekTo(getStartTime, true)
        this.state.yt.pauseVideo()
        this.state.yt.playVideo()

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <NavBar></NavBar>
                <div>
                    <div className={classes.left}>
                        <div><YouTube videoId={this.props.match.params.url} onReady ={this.onPlayerReady}/></div>
                        <div className={classes.RawBlock}><RawBlock data={this.state.data} transCallBack={this.callBackFunction}/>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.TransBlock}><TransBlock /></div>
                        <div className={classes.OtherSub}>
                            <Table className={classes.root}><TableBody>
                                <OtherSubBlock />
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
