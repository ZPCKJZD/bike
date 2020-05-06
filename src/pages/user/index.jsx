import React, { Component } from 'react'
import {Form,Card, Input,Icon, Button, message, Table,Badge} from 'antd'
import Axios from 'axios'
const FormItem=Form.Item
export default class User extends Component {
   state={
       dataSource:[]
   }
   componentWillMount(){
       this.getData()
   }
   getData=()=>{
       Axios.get("http://mock.studyinghome.com/mock/5eb207174006b044ae24619f/zpc/user").then(res=>{
        res.data.results.data.map(item=>item.key=item.id)
           this.setState({dataSource:res.data.results.data})
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
                title:"生日",
                dataIndex:"birthday"
            },
            {
                title:'联系地址',
                dataIndex:"address"
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

        return (
            <div>
                <Card>
                    <FormLogin/>
                </Card>
                <Card>
                    <Button type="primary">创建员工</Button>
                    <Button type="primary" style={{margin:"0 20px"}}>编辑员工</Button>
                    <Button type="primary" style={{marginRight:20,marginBottom:20}}>员工详情</Button>
                    <Button type="danger">删除员工</Button>
                    <Table columns={columns} bordered pagination={{pageSize:5}} dataSource={this.state.dataSource}/>
                </Card>
            </div>
        )
    }
}
class FormLogin extends Component{
    
handleLogin=()=>{
    let userInfo=this.props.form.getFieldsValue()
    this.props.form.validateFields((err,value)=>{
        if(!err){
            message.info(`${userInfo.userName}登录成功`)
        }else{
            message.error(Object.values(err)[0].errors[0].message)
        }
    })
}
    render(){
        const {getFieldDecorator}=this.props.form
        return(
            <div>
                <Form layout="inline">
                    <FormItem label="姓名">
                        {
                            getFieldDecorator('userName',{
                        
                            })(
                               <Input prefix={<Icon type="user"/>}/>
                            )
                        }
                    </FormItem>
                    <FormItem label="手机号">
                        {
                            getFieldDecorator('phone',{
                            })(
                               <Input  prefix={<Icon type="phone"/>}/>
                            )
                        }
                    </FormItem>
                    <Button type="primary" onClick={this.handleLogin} >查询</Button>
                </Form>
            </div>
        )
    }
}
FormLogin=Form.create()(FormLogin)
