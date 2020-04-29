import React, { Component } from 'react'
import {Row,Col} from 'antd'
import './index.less'
import showTime from './../../utils/index'
import Axios from './../../axios/index'
export default class Header extends Component {
    state={
        Time:"",
        weather:''
    }
    componentDidMount(){
        setInterval(() => {
            this.Time()
        }, 1000);  
        this.getWeather()  
    }
    Time=()=>{
        this.setState({Time:showTime()})
    }
    getWeather=()=>{
        let city="石家庄"
        Axios.jsonp({url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'})
        .then(res=>{
            console.log(res)
            this.setState({weather:res[0].weather_data[0]})

        }
         
            )
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，空间之巅</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="header-breadcrumb">
                    <Col span={3} className="name">
                       <span>首页</span>
                    </Col>
                    <Col span={20}>
                        <span className="time">
                             {this.state.Time}
                        </span>
                        <span className="weather">
                             <img src={this.state.weather.dayPictureUrl} alt=""/>
                             <span>{this.state.weather.weather}</span>
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
