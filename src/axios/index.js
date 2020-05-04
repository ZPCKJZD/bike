import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
export default class Axios{
   static jsonp(options){
     return  new Promise((res,req)=>{
           JsonP(options.url,{param:'callback'},function(err,response){
               if(response.status==="success"){
                   res(response.results)
               }else{
                   req(err)
               }
           })
       })
   }
   static axios(options){
       if(options.isLoad){
           let load=document.getElementsByClassName('ajaxLoad')[0]
           load.style.display="block"
       }
       let baseUrl="http://mock.studyinghome.com/mock/5e9ee1ef301a4f07a0c8aa87/zpc"
       return new Promise((response,rej)=>{
           axios({
               method:options.method,
               url:baseUrl+options.url,
               timeout:5000,
               params:(options.data&&options.data.params) ||"" 
           }).then(res=>{
            if(options.isLoad){
                let load=document.getElementsByClassName('ajaxLoad')[0]
                load.style.display="none"
            }
               if(res.status===200){
                   if(res.data.code===0){
                    response(res.data)
                   }else{
                       message.info(res.data.msg)
                   }
               }else{
                   rej(res.data)
               }
           })
       })
   }
}