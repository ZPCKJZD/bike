import React, { Component } from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import EchartsReact from 'echarts-for-react'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/pie'
import echartsTheme from './../../../config/echartsTheme'
export default class Pie extends Component {
    componentWillMount(){
        echarts.registerTheme('myTheme',echartsTheme)
    }
    getOption=()=>{
        let option={
            title:{
                text:'家庭开销占比',
                x:'center',
                y:'-1'
            },
            tooltip:{
              trigger:"item",
              formatter:"{a}<br>{b}:{c}({d}%)"
            },
           legend:{
               data:["吃饭","旅游","出行"],
               orient:'vertical',
               top:20,
               right:100 
            },
           series:{
               name:'开销',
               type:'pie',
               radius:["60%","80%"],
               data:[
                   {
                       name:"吃饭",
                       value:"3000"
                   },
                   {
                    name:"旅游",
                    value:"3000"
                },
                {
                    name:"出行",
                    value:"1000"
                },
               ]
           }
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="饼图">
                    <EchartsReact theme="myTheme" option={this.getOption()}/>
                </Card>
            </div>
        )
    }
}
