import React, { Component } from 'react'
import {Card} from 'antd'
import echarts from 'echarts/lib/echarts'
import echartsTheme from './../../../config/echartsTheme'
import EchartsReact from 'echarts-for-react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
export default class Bar extends Component {
    componentWillMount(){
           echarts.registerTheme('myTheme',echartsTheme)
    }
    getOption=()=>{
        let option={
            title:{
                text:"共享单车使用情况"
            },
            tooltip:{
               trigger:"item"
            },
             xAxis:{
                 data:["周一","周二","周三","周四","周五","周六","周日"]
             },
             yAxis:{
                 type:'value'
             },
             series:{
                 name:"订单量",
                 type:'line',
                 data:[1000,2000,1232,2243,6665,2324,2222]
             }
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:"共享单车使用情况"
            },
            tooltip:{
               trigger:"item"
            },
            legend:{
                   data:["ofo","bbc","ac"]
            },
             xAxis:{
                 data:["周一","周二","周三","周四","周五","周六","周日"]
             },
             yAxis:{
                 type:'value'
             },
             series:[
                { 
                 name:"ofo",
                 type:'bar',
                 data:[1000,2000,1232,2243,6665,2324,2222]
                },
                { 
                    name:"bbc",
                    type:'bar',
                    data:[1000,2000,1232,2243,6665,2324,2222]
                   }
                   ,       { 
                    name:"ac",
                    type:'bar',
                    data:[1000,2000,1232,2243,6665,2324,2222]
                   }
            ]
        }
        return option
    }
    render() {
        return (
            <div>
                <Card title="柱状图">
                    <EchartsReact theme="myTheme" option={this.getOption()} style={{width:400}}/>
                </Card>
                <Card title="柱状图2">
                    <EchartsReact theme="myTheme" option={this.getOption2()} style={{width:600}}/>
                </Card>
            </div>
        )
    }
}
