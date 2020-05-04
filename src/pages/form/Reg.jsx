import React, { Component } from 'react'
import {Card,Input,Button,Form,Icon,Radio, InputNumber,Switch,DatePicker,TimePicker, message} from 'antd'
import moment from 'moment'
const InputTextArea=Input.TextArea
const RadioGroup=Radio.Group
class Reg extends Component {
    handleReg=()=>{
        let userInfo=this.props.form.getFieldsValue()
        this.props.form.validateFields((err,value)=>{
            if(!err){
                message.info(`${userInfo.address}`)
            }
        })
    }
    render() {
        const {getFieldDecorator}=this.props.form
        const lay={
            labelCol:{
                span:2
            },
            wrapperCol:{
                span:5n
            }
        }
        return (
            <div>
                <Card title="注册">
                    <Form layout="horizontal">
                        <Form.Item label="姓名" {...lay}>
                            {
                                getFieldDecorator('userName',{

                                })(
                                   <Input prefix={<Icon type="user"/>}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="密码" {...lay}>
                            {
                                getFieldDecorator('pwd',{

                                })(
                                   <Input prefix={<Icon type="lock"/>} type="password"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="性别" {...lay}>
                            {
                                getFieldDecorator('sex',{
                                       initialValue:'1'
                                })(
                                  <RadioGroup>
                                      <Radio value="1">男</Radio>
                                      <Radio value="2">女</Radio>
                                  </RadioGroup>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="年龄" {...lay}>
                            {
                                getFieldDecorator('age',{
                                       initialValue:'18'
                                })(
                                 <InputNumber/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="是否已婚" {...lay}>
                            {
                                getFieldDecorator('marry',{
                                       initialValue:true,
                                       getPropName:"checked"
                                })(
                                 <Switch/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="生日" {...lay}>
                            {
                                getFieldDecorator('birthday',{
                                       initialValue:moment("1998-03-04"),
                                })(
                                 <DatePicker/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="时间" {...lay}>
                            {
                                getFieldDecorator('time',{
                                       initialValue:moment("12:34:22")
                                })(
                                 <TimePicker/>
                                )
                            }
                        </Form.Item>
                        <Form.Item label="地址" {...lay}>
                            {
                                getFieldDecorator('address',{
                                       
                                })(
                                 <InputTextArea autoSize={{minRows:4}}/>
                                )
                            }
                        </Form.Item>
                        <Button onClick={this.handleReg}>注册</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Reg=Form.create()(Reg)
