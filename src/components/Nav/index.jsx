import React, { Component } from 'react'
import './index.less'
import {Menu} from 'antd'
import MenuConfig from './../../config/menuConfig'
const {SubMenu}=Menu
export default class Nav extends Component {
    state={
        MenuTree:""
    }
    componentDidMount(){
        this.setState({MenuTree:this.MenuItem(MenuConfig)})
    }
    MenuItem=(data)=>{
       return  data.map(item=>{
          if(item.children){
            return <SubMenu title={item.title} key={item.key}>{this.MenuItem(item.children)}</SubMenu>
            }
           return <Menu.Item key={item.key}>{item.title}</Menu.Item>
        })
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="./assets/logo-ant.svg" alt=""/>
                    <h2>Imooc MS</h2>
                </div>
                <Menu theme="dark">
                   {this.state.MenuTree}
                </Menu>
            </div>
        )
    }
}
