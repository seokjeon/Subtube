import React, { Component } from 'react'
import {Paper, Table, TableRow, TableHead, TableBody, TableCell} from '@material-ui/core'
import Subs from '../components/Subs'


class RawBlock extends Component{

    render(){
        return(
            <div>
                <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>자막</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      <Subs key={1} subs={1}/>
                      <Subs key={2} subs={2}/>

                      </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }

}

export default RawBlock