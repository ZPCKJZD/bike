import React, { Component } from 'react'
import {Card,Form,Input,Icon,Checkbox, Button, message} from 'antd'
 class Login extends Component {
    handleSubmit=()=>{
        let userInfo=this.props.form.getFieldsValue()
        this.props.form.validateFields((err,value)=>{
            if(!err){
                message.info(`${userInfo.userName}`)
            }
        })
    }
    render() {
        const {getFieldDecorator}=this.props.form
        const lays={
            labelCol:{
                span:1
            },
            wrapperCol:{
                span:4
            }
        }
        return (
            <div>
                <Card title="表单">
                     <Form layout="horizontal">
                         <Form.Item label="姓名" {...lays}>
                             {
                                 getFieldDecorator('userName',{
                                     initialValue:"郑鹏程",
                                     rules:[
                                         {
                                             min:3,
                                             message:"不符合规则"
                                         },
                                     ]
                                 })(
                                     <Input prefix={<Icon type="user"/>}/>
                                 )
                             }
                         </Form.Item>
                         <Form.Item label="密码" {...lays}>
                             {
                                 getFieldDecorator('pwd',{
                                     initialValue:"123",
                                     rules:[
                                         {
                                             min:3,
                                             message:"不符合规则"
                                         },
                                     ]
                                 })(
                                     <Input prefix={<Icon type="lock"/>} type="password"/>
                                 )
                             }
                         </Form.Item>
                         <Form.Item  {...lays}>
                             {
                                 getFieldDecorator('remember',{
                                     initialValue:true,
                                     valuePropName:'checked'
                                 })(
                                     <Checkbox>记住密码？</Checkbox>
                                 )
                             }
                         </Form.Item>
                         <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                     </Form>
                </Card>
            </div>
        )
    }
}
export default Login=Form.create({})(Login)
