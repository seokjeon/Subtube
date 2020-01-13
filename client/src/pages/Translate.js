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
        display : 'inline-block'
    },

    TransBlock: {
        width: '100%',
        overflow: 'auto',
        minHeight: '30vh',
        marginTop: '20px'
    },
    OtherSub: {
        maxHeight: "50vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '30vh',
        marginTop: '20px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar' : {
            display : 'none'
        }

    }, root: {
        width: '100%',
        overflowX: "auto",
        '&::-webkit-scrollbar' : {
            display : 'none'
        }
    },
    RawBlock: {
        maxHeight: "50vh",
        width: '100%',
        overflow: 'hidden',
        minHeight: '30vh',
        marginTop: '20px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar' : {
            display : 'none'
        }
    },
    

})

class Translate extends Component {    
    
      callApi = async ()=>{
          console.log("in")
        const response = await fetch('http://localhost:5000/api')
        const body = await response.json()
        return body
     }
    
    state = {
        data: new Array,
        yt : null,
        startTime : 0,
        duration : null,
        otherSub : new Array
    }

    constructor(props){
        super(props)

        let otherSubs = new Array
        this.callApi().then(res => res.forEach(sub =>{
            otherSubs.push(sub)
        }))
        .then(() =>{
            console.log(otherSubs)
            this.setState({otherSub : otherSubs})
        })
        .catch(err=>console.err(err))

        console.log(otherSubs)

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
        console.log(url)
        return fetch('/trans/' + url)
    }

    onPlayerReady = (player) =>{
        player.target.playVideo()
        
        this.setState({
            yt : player.target
        })
        
    }

    seekClickedBlock = (getStartTime, durationTime)=>{
        this.setState({
            startTime : getStartTime,
            duration : durationTime
        }, ()=>this.clicked())
    } 

    clicked = ()=>{
        this.state.yt.seekTo(this.state.startTime, true)
        this.state.yt.playVideo()
        //TODO : change timeout 2000 to duration
        setTimeout(()=>this.state.yt.pauseVideo(), Number(this.state.duration)*1000 + 350)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <NavBar></NavBar>
                <div>
                    <div className={classes.left}>
                        <div className ={classes.video}><YouTube onStateChange={this.loopVideo} videoId={this.props.match.params.url} onReady ={this.onPlayerReady}/></div>
                        <p>{Number(this.state.duration).toFixed(2)}</p>
                        <div className={classes.RawBlock}><RawBlock data={this.state.data} transCallBack={this.seekClickedBlock}/>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.TransBlock}><TransBlock /></div>
                        <div className={classes.OtherSub}>
                            <Table className={classes.root}><TableBody>
                                <OtherSubBlock otherSub = {this.state.otherSub}/>
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
