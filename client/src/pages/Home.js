import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { Button } from '@material-ui/core'
import './Home.css'

class Home extends Component {

    redirectPage = ()=>{
        let url = document.getElementById("url").value
        if(url) return this.props.history.push(`/Trans/` + document.getElementById("url").value)
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