import React, { Component } from 'react'
import {Row} from 'antd'
import './admin.less'
import Header from './components/Header'
export default class Admin extends Component {
    render() {
        return (
            <div style={{backgroundColor:"#eee",}}>
                <div className="ajaxLoad">
                      isLoading....
                </div>
                <Row>
                        <Header headerClass="true"/> 
                </Row>
                {this.props.children}
            </div>
        )
    }
}
