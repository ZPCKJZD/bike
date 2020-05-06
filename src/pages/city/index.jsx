import React, { Component } from 'react'
import {Card,Form,Table,Select,Button,Modal,Radio, message} from 'antd'
import Utils from './../../utils/index'
const Option=Select.Option
const FormItem=Form.Item
export default class City extends Component {
    state={
        dataSource:[],
        open:false
    }
    componentDidMount(){
        Utils.getData(this,"/city","get")
    }
    handleCity=()=>{
      this.setState({
          open:true
      }) 
    }
    handleOpenCity=()=>{
    this.setState({open:false})
     let userInfo=this.openCity.props.form.getFieldsValue()
     this.openCity.props.form.validateFields((err,value)=>{
         if(!err){
             message.info(`${userInfo.open_city}`)
         }
     })
    }
    render() {
        const columns=[
            {
                title:"城市ID",
                dataIndex:'city_id'
            },
            {
                title:"城市名称",
                dataIndex:'city_name'
            },
            {
                title:"用车模式",
                dataIndex:'bike_mode'
            },
            {
                title:"营运模式",
                dataIndex:'op_mode'
            },
            {
                title:"授权加盟商",
                dataIndex:'join_mode'
            },
            {
                title:"城市管理员",
                dataIndex:'city_watch'
            },
            {
                title:"城市开通时间",
                dataIndex:'open_time'
            },
            {
                title:"操作时间",
                dataIndex:'use_time'
            },
            {
                title:"操作人",
                dataIndex:'use_name'
            },
        ]
        return (
            <div>
               <FilterForm/>
               <Card>
                   <Button type="primary" onClick={this.handleCity}>开通城市</Button>
               </Card>
               <Card>
                   <Table columns={columns} bordered
                   dataSource={this.state.dataSource}
                   pagination={{pageSize:5}}
                   />
               </Card>
               <Modal
               title="开通城市"
               visible={this.state.open}
               okText="开通"
               cancelText="取消"
               onCancel={()=>this.setState({open:false})}
               onOk={this.handleOpenCity}
        
               >
                   <OpenCity wrappedComponentRef={(inst)=>this.openCity=inst}/>
               </Modal>
            </div>
        )
    }
}
class FilterForm extends Component{
    render(){
        const {getFieldDecorator}=this.props.form;
        return(
            <div>
               <Card>
                  <Form layout="inline">
                     <FormItem label="城市">
                         {
                             getFieldDecorator('city')(
                             <Select placeholder="请选择" style={{width:100}}>
                                <Option value="1">北京</Option>
                                <Option value="2">杭州</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <FormItem label="用车模式" style={{marginLeft:5}}>
                         {
                             getFieldDecorator('use_mode')(
                             <Select placeholder="请选择" style={{width:150}}>
                                <Option value="1">禁止停车</Option>
                                <Option value="2">停车点</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <FormItem label="营运模式" >
                         {
                             getFieldDecorator('op_mode')(
                             <Select placeholder="请选择" style={{width:100}}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <FormItem label="加盟商授权状态">
                         {
                             getFieldDecorator('user_status')(
                             <Select placeholder="请选择" style={{width:100}}>
                                <Option value="1">已加盟</Option>
                                <Option value="2">未加盟</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <Button  type="primary" style={{margin:"0 20px 0 20px"}}>查询</Button>
                     <Button>重置</Button>
                  </Form>
               </Card>
            </div>
        )
    }
}
FilterForm=Form.create()(FilterForm)
 
class OpenCity extends Component{
    render(){
        const {getFieldDecorator}=this.props.form;
        const lay={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:10
            }
        }
        return(
            <div>
                  <Form layout="horizontal">
                     <FormItem label="城市" {...lay}>
                         {
                             getFieldDecorator('open_city')(
                             <Select placeholder="请选择" >
                                <Option value="1">北京</Option>
                                <Option value="2">杭州</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <FormItem label="用车模式"  {...lay}>
                         {
                             getFieldDecorator('open_use_mode')(
                                  <Radio.Group>
                                      <Radio value="1">禁止停车</Radio>
                                      <Radio value="2">停车点</Radio>
                                  </Radio.Group>
                             )
                         }
                     </FormItem>
                     <FormItem label="营运模式"  {...lay}>
                         {
                             getFieldDecorator('open_op_mode')(
                                <Radio.Group>
                                <Radio value="1">加盟</Radio>
                                <Radio value="2">自营</Radio>
                            </Radio.Group>
                             )
                         }
                     </FormItem>        
                  </Form>
            </div>
        )
    }
}
OpenCity=Form.create()(OpenCity)