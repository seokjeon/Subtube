import React, { Component } from 'react'
import {Paper, Table, TableRow, TableHead, TableBody, TableCell} from '@material-ui/core'
import RawItem from '../components/RawItem'

class RawBlock extends Component{
    render(){
        return(
            <div>
                <Paper>
                    <Table>
                      <TableBody>
                      <RawItem/><RawItem/>
                      <RawItem/>
                      <RawItem/>
                      </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

}

export default RawBlock