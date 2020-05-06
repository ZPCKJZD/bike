import React, { Component } from 'react'
import {Card,Form,Table,Select,Button,Modal,Radio, message,DatePicker} from 'antd'
import Axios from './../../axios/index'
import FilterForm from './../../components/baseForm/index'
import Utils from './../../utils/index'
import BaseTable from './../../components/baseTable/index'
const FormItem=Form.Item
export default class Order extends Component {
    state={
        dataSource:[],
        order_status:false,
        order_details:[]
    }
    componentDidMount(){
        Utils.getData(this,"/order","get")
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
    getTableData=(a,b)=>{
       this.setState({
           selectedRowKays:a,
           selectedRows:b
       })
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
        const lays={
            labelCol:{
                span:4
            },
            wrapperCol:{
                span:12
            }
        }
       const initialTable={
           columns,
           type:"radio",
           pagination:5,
           dataSource:this.state.dataSource 
       }
        return (
            <div>
                   <OrderForm/>
                   <Card>
                       <Button type="primary" style={{margin:"0 20px 10px 0"}} onClick={this.orderDetails}>订单详情</Button><Button type="primary" onClick={this.closeOrder}>结束订单</Button>
                       <BaseTable initialTable={initialTable} getTableData={this.getTableData}/>
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
    formList = [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
    ]
    filterSubmit=(data)=>{

    }
    render(){

        

        return(
            <div>
               <Card>
                    <FilterForm formList={this.formList} filterSubmit={this.filterSubmit}/>
               </Card>
            </div>
        )
    }
}
OrderForm=Form.create()(OrderForm)