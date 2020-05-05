import React, { Component } from 'react'
import {Card,Form,Table,Select,Button,Modal,Radio, message,DatePicker} from 'antd'
import Axios from './../../axios/index'
const Option=Select.Option
const FormItem=Form.Item
export default class Order extends Component {
    state={
        dataSource:[],
        order_status:false,
        order_details:[]
    }
    componentDidMount(){
        this.getData()
    }
    getData=()=>{
        Axios.axios({url:"/order",isLoad:true,method:"get"})
        .then(res=>{
            res.results.data.map(item=>item.key=item.order_sn)
            this.setState({
                dataSource:res.results.data
            })
        })
    }
    closeOrder=()=>{
   
      this.setState({order_status:true})
      Axios.axios({method:'get',url:"/order_details"}).then(res=>{
          this.setState({order_details:res.results.data[0]})
      })
    }
    orderDetails=()=>{
        let item=this.state.selectedRows
        if(!item){
            Modal.info({
                content:"请选择一条数据",
                onOk:()=>{

                }
            })
        }else{
            window.open("/#/common/order/details?id="+item[0].order_sn,"_blank")
        }
    }
    render() {
        const columns=[
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const selectedRowKeys=this.state.selectedRowKeys
        const rowSelection={
            type:'radio',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,
                    selectedRows
                })
            }
        }
        const lays={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:12
            }
        }
        return (
            <div>
                   <OrderForm/>
                   <Card>
                       <Button type="primary" style={{margin:"0 20px 10px 0"}} onClick={this.orderDetails}>订单详情</Button><Button type="primary" onClick={this.closeOrder}>结束订单</Button>
                       <Table columns={columns} bordered 
                       dataSource={this.state.dataSource}
                       pagination={{pageSize:5}}
                       rowSelection={rowSelection}
                       />
                       <Modal 
                       title="结束订单"
                       visible={this.state.order_status}
                       onCancel={()=>{this.setState({order_status:false})}}
                       okText="结束"
                       cancelText="取消"
                       onOk={()=>{
                           message.info('订单取消成功')
                           this.setState({order_status:false})
                           

                       }}
                       >
                         <Form layout="horizontal">
                             <FormItem label="订单id" {...lays}>
                                {this.state.order_details.order_id}
                             </FormItem>
                             <FormItem label="剩余电量" {...lays}>
                                {this.state.order_details.order_rest}
                             </FormItem>
                             <FormItem label="开始时间" {...lays}>
                                {this.state.order_details.begin_time}
                             </FormItem>
                             <FormItem label="现在地址" {...lays}>
                                {this.state.order_details.where}
                             </FormItem>
                         </Form>
                       </Modal>
                   </Card>
            </div>
        )
    }
}
class OrderForm extends Component{
    render(){
        const {getFieldDecorator}=this.props.form;
        return(
            <div>
               <Card>
                  <Form layout="inline">
                     <FormItem label="城市">
                         {
                             getFieldDecorator('order_city')(
                             <Select placeholder="请选择" style={{width:100}}>
                                <Option value="1">北京</Option>
                                <Option value="2">杭州</Option>
                            </Select>
                             )
                         }
                     </FormItem>
                     <FormItem  style={{marginLeft:5}}>
                         {
                             getFieldDecorator('open_time')(
                             <DatePicker  placeholder="开始时间"/>                   
                             )
                         }
                     </FormItem>
                    <span style={{marginRight:5}}>~ </span>
                     <FormItem  style={{marginLeft:5}} >
                         {
                             getFieldDecorator('close_time')(
                             <DatePicker placeholder="结束时间"/>                   
                             )
                         }
                     </FormItem>
                     <FormItem label="订单状态">
                         {
                             getFieldDecorator('user_status')(
                             <Select placeholder="请选择" style={{width:100}}>
                                <Option value="1">进行中</Option>
                                <Option value="2">已停止</Option>
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
OrderForm=Form.create()(OrderForm)