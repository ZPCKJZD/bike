import JsonP from 'jsonp'
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
}