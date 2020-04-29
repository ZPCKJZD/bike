const showTime=()=>{
     let myDate=new Date()
     var year=myDate.getFullYear()
     var month=myDate.getMonth()+1>9?myDate.getMonth()+1:"0"+(myDate.getMonth()+1)
     var day=myDate.getDay()>9?myDate.getDay():"0"+myDate.getDay()
     var hour=myDate.getHours()>9?myDate.getHours():"0"+myDate.getHours()
     var minute=myDate.getMinutes()>9?myDate.getMinutes():"0"+myDate.getMinutes()
     var second=myDate.getSeconds()>9?myDate.getSeconds():"0"+myDate.getSeconds()
     return year+"-"+month+"-"+day+' '+hour+":"+minute+":"+second
}
export default showTime