import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Admin from './admin'
import App from './App'
import Login from './pages/form/Login'
import Reg from './pages/form/Reg'
import Bar from './pages/echarts/Bar'
import Pie from './pages/echarts/Bie'
import Base from './pages/table/base'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import Details from './pages/details'
import User from './pages/user'
const Routes = () => {
    return ( 
       <Router>
           <App>
               <Route path='/admin' render={()=>{
                 return <Admin>
                       <Route path='/admin/form/login' component={Login}/>
                       <Route path='/admin/form/reg' component={Reg}/>  
                       <Route path='/admin/charts/bar' component={Bar}/>
                       <Route path='/admin/charts/pie' component={Pie}/>
                       <Route path='/admin/table/basic' component={Base}/>  
                       <Route path='/admin/city' component={City}/>      
                       <Route path='/admin/order' component={Order}/>
                       <Route path='/admin/user' component={User}/>                                                             
                   </Admin>
               }}/> 
               <Route path='/common' render={()=>{
                   return <Common>
                           <Route path='/common/order/details' component={Details}/>
                           
                         </Common>
               }}/>
                  
           </App>
       </Router>
    );
}
 
export default Routes;