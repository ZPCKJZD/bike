import React from 'react';
import { Select } from 'antd'
import Axios from './../axios/index'
const Option = Select.Option;
export default {
     showTime(){
          let myDate=new Date()
          var year=myDate.getFullYear()
          var month=myDate.getMonth()+1>9?myDate.getMonth()+1:"0"+(myDate.getMonth()+1)
          var day=myDate.getDay()>9?myDate.getDay():"0"+myDate.getDay()
          var hour=myDate.getHours()>9?myDate.getHours():"0"+myDate.getHours()
          var minute=myDate.getMinutes()>9?myDate.getMinutes():"0"+myDate.getMinutes()
          var second=myDate.getSeconds()>9?myDate.getSeconds():"0"+myDate.getSeconds()
          return year+"-"+month+"-"+day+' '+hour+":"+minute+":"+second
     },
     getOptionList(data){
          if(!data){
              return [];
          }
          let options = [] //[<Option value="0" key="all_key">全部</Option>];
          data.map((item)=>{
              options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
          })
          return options;
      },
      getData(_this,url,get){
        Axios.axios({url:url,isLoad:true,method:get})
        .then(res=>{
            res.results.data.map((item,index)=>item.key=item.index)
            _this.setState({
                dataSource:res.results.data
            })
        })
    }
}
