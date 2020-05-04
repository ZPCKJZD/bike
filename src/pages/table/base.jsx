import React, { Component } from 'react'
import {Table,Card, Modal,Button, message,Badge} from 'antd'
import Axios from './../../axios/index'
export default class Base extends Component {
    state={
        dataSource:[]
    }
    componentDidMount(){
        this.getData() 
    }
    getData=()=>{
        console.log("1")
        Axios.axios({method:"get",isLoad:true,url:"/table",data:{
            params:{
                name:"郑鹏程"
            }
        }}).then(res=>{
            res.results.map(item=>item.key=item.id)
            this.setState({
                dataSource:res.results,
                 selectedRows:[],
                 selectedRowKeys:[],  
            })
        })
    }
    deleteCheck=()=>{
        let ids=[]
        this.state.selectedRows.map(item=>{
            ids.push(item.id)
        })
        Modal.info({
            title:'删除数据',
            content:`确定要删除这些${ids.join(",")}数据吗？`  ,
            onOk:()=> {
                message.info('删除成功')
                this.getData()
            }
        })
    }
    handleDelete=(item)=>{
        Modal.info({
            title:"删除操作",
            content:`是否要删除${item.id}`,
            onOk:()=>{
              message.success('删除成功')
            }
        })
    }
    render() {
        const columns=[
            {
                title:"id",
                dataIndex:'id'
            },
            {
                title:"姓名",
                dataIndex:'name'
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex===1?"男":"女"
                }
            },
            {
                title:"年龄",
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                }
            },
            {
                title:"爱好",
                dataIndex:'interest',
                render(interest){
                    let config={
                        "1":'吃饭',
                        "2":"睡觉",
                        "3":"喝水",
                        "4":"玩"
                    }
                    return config[interest]
                }
            },
            {
                title:"电话",
                dataIndex:'phone'
            },
        ]
        const columns2=[
            {
                title:"id",
                dataIndex:'id'
            },
            {
                title:"姓名",
                dataIndex:'name'
            },
            {
                title:"性别",
                dataIndex:'sex',
                render(sex){
                    return sex===1?<Badge status="success" text="男"></Badge>:<Badge status="error" text="女"></Badge>
                }
            },
            {
                title:"年龄",
                dataIndex:'age',
                sorter:(a,b)=>{
                    return a.age-b.age
                }
            },
            {
                title:"爱好",
                dataIndex:'interest',
                render(interest){
                    let config={
                        "1":'吃饭',
                        "2":"睡觉",
                        "3":"喝水",
                        "4":"玩"
                    }
                    return config[interest]
                }
            },
            {
                title:"电话",
                dataIndex:'phone'
            },
            {
                title:"操作",
                render:(text,item)=>{
                    return <Button onClick={()=>this.handleDelete(item)}>删除</Button>
                }
            }
        ]
        const rowSelection={
             type:"radio",
             onChange:(selectedRowKeys,selectedRows)=>{
               this.setState({
                   selectedRowKeys,
                   radioItem:selectedRows
               })          
       }
        }
        const selectedRowKeys=this.state.selectedRowKeys
        const rowCheckSelect={
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{     
                this.setState({
                   selectedRowKeys,
                    selectedRows
                })    
            }
        }
        return (
            <div>
               <Card title="基础表格">
                   <Table columns={columns2}
                    bordered dataSource={this.state.dataSource} 
                    pagination={{pageSize:5}}
                    rowSelection={rowSelection}
                    >

                   </Table>
               </Card>
               <Card title="复选框表格">
                   <Button type="danger" onClick={this.deleteCheck}>删除数据</Button>
                   <Table columns={columns}
                    bordered dataSource={this.state.dataSource} 
                    pagination={{pageSize:5}}
                    rowSelection={rowCheckSelect}
                    >

                   </Table>
               </Card>
            </div>
        )
    }
}
