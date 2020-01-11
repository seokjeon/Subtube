import React, { Component } from 'react'
import { Paper, Table, TableRow, TableHead, TableBody, TableCell } from '@material-ui/core'
import RawItem from '../components/RawItem'

class RawBlock extends Component {

    state = { selected: null }

    callbackFunc = (childData) => {
        this.setState({ selected: childData })
    }


    render() {
        const tableData = [1, 2, 3]
        return tableData.map((data, index) => {
            return (
                <div>
                    <Paper>
                        <Table>
                            <TableBody>
                                <TableRow bgcolor={this.state.selected == index ? 'red' : null}>
                                    <RawItem parentCallback={this.callbackFunc} row={index}/>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        })
    }

}

export default RawBlock