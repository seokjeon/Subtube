import React, { Component } from 'react'
import { Paper, Table, TableRow, TableHead, TableBody, TableCell, withStyles } from '@material-ui/core'
import RawItem from '../components/RawItem'

const styles = theme => ({
    cell : {
        width : "100%"
    }
})

class   RawBlock extends Component {    
    state = {
        selected: null
    }
    
    callbackFunc = (childData, startTime, durationTime) => {
        this.setState({ 
            selected: childData,
        })
        
        this.props.transCallBack(startTime, durationTime)
    }

    render() {
        const {classes} = this.props
        const tableData = this.props.data
        return tableData.map((elem, index) => {
            return (
                <div>
                    <Paper>
                        <Table>
                            <TableBody>
                                <TableRow className={classes.cell} bgcolor={this.state.selected == index ? 'lavender' : null}>
                                <RawItem parentCallback={this.callbackFunc} row={index} data={elem}/>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            )
        })
    }

}

export default withStyles(styles)(RawBlock)