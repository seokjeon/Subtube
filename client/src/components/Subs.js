import React, { Component } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Subs extends Component {
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.subs}</TableCell>
            </TableRow>
        )
    }
}

export default Subs