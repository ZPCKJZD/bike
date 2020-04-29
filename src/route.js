import React from 'react';
import {HashRouter as Router,Route,Switch} from 'react-router-dom'
import Admin from './admin'
import App from './App'
const Routes = () => {
    return ( 
       <Router>
           <App>
               <Route path='/admin' component={Admin}/>    
           </App>
       </Router>
    );
}
 
export default Routes;