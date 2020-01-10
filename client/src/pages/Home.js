import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import './Home.css'

class Home extends Component {

    render() {

        return (            
            <div>
                <NavBar></NavBar>
                <div className = 'horizontal'>
                    <input type="text" className='input' placeholder ="URL을 입력 해 주세요"></input>
                    <Link to="/Translate">
                        <Button className = 'btn' variant="contained" color="primary">
                        TRANSLATE
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Home