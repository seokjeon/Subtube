import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { Button } from '@material-ui/core'
import './Home.css'

class Home extends Component {

    redirectPage = ()=>{
        let url = document.getElementById("url").value
        if(url){ 
          //Get videoId from full video url
          var indexOfId = url.indexOf("v=")
          if (indexOfId == -1){
            var videoId = url
          }else{
            var videoId = url.slice(indexOfId+2, indexOfId+13)
          }
            return this.props.history.push(`/Trans/` + videoId)
        }
    }
    handleKeyPress = (e)=>{
        if(e.charCode ===13){
            this.redirectPage()
        }
    }
    
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <div className='horizontal'>
                    <input id="url" type="text" className='input' placeholder="URL을 입력 해 주세요" onKeyPress={this.handleKeyPress}></input>
                    
                    <Button className='btn' variant="contained" color="primary" onClick={this.redirectPage}>
                        TRANSLATE
                    </Button>

                </div>
            </div>
        )
    }
}

export default Home