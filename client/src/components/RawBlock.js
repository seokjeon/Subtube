import React, { Component } from 'react'
import {Paper, Table, TableRow, TableHead, TableBody, TableCell} from '@material-ui/core'
import RawItem from '../components/RawItem'

class RawBlock extends Component{
    render(){
        const tableData = [1, 2, 3]
        return tableData.map((data, index)=>{
            return (
                <div>
                <Paper>
                    <Table>
                      <TableBody>
                      <RawItem row={index}  bgColor = {this.state.isActive === null ? 'red' : 'green'}/>
                      </TableBody>
                    </Table>
                </Paper>
            </div>
            )
        })
    }

}

export default RawBlock