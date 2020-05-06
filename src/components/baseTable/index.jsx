import React from 'react'
import {Table} from 'antd'
class FilterTable extends React.Component{
    getTableData=()=>{
        let initialTable=this.props.initialTable
        let tableData={}
        let columns=initialTable.columns
        let pagination=initialTable.pagination
        let dataSource=initialTable.dataSource
        let rowSelection=""
        if(pagination){
            tableData.pagination={pageSize:pagination}
        }
        if(initialTable.type==="radio"){
          rowSelection={
                type:"radio",
                onChange:(selectedRowKeys,selectedRows)=>{
                 this.props.getTableData(selectedRowKeys,selectedRows) 
                 this.setState({
                     selectedRowKeys
                 })      
             }
           }
        }else if(initialTable.type==="check"){
            rowSelection={
                type:"check",
                onChange:(selectedRowKeys,selectedRows)=>{
             this.props.getTableData(selectedRowKeys,selectedRows) 
             this.setState({
                selectedRowKeys
            })        
          }
           }
        }
        tableData.rowSelection=rowSelection?rowSelection:""
        tableData.bordered=true
        tableData.columns=columns
        tableData.dataSource=dataSource
        return tableData
    }
  render(){
    return(
        <div>
            <Table {...this.getTableData()}/>
        </div>
    )
}
}
export default FilterTable