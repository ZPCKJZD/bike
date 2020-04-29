import React, { Component } from 'react'
import {Row,Col} from 'antd'
import './admin.less'
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'
export default class Admin extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col className="nav" span={4}>
                        <Nav/>
                    </Col>
                    <Col className="main" span={20}>
                        <Header/>
                        <Row className="main-content">

                        </Row>
                        <Footer/>
                    </Col>
                </Row>
            </div>
        )
    }
}
