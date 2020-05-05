import React, { Component } from 'react'
import './index.less'
import axios from 'axios'
export default class Details extends Component {
    componentDidMount(){
            this.getData()
    }
    getData=()=>{
    axios({url:"./json/data.json"}).then(res=>{
           let data=res.data.result.position_list   
           this.getMap(data)
       })
    }
getMap=(data)=>{
    // 百度地图API功能
    if(data.length>0){
        this.map = new window.BMapGL.Map("mapContainer");
        var point = new window.BMapGL.Point(data[0].lon, data[0].lat);
        this.map.centerAndZoom(point, 15);

       //添加控件
        this.mapControl()

        //添加起始坐标
       this.dpPoint(data)

       //链接地图 
        this.drwMap(data)
       //设置服务区
       this.drwMapArea(data)
    }
}
    //添加控制插件
mapControl=()=>{
    this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var scaleCtrl = new window.BMapGL.ScaleControl();  // 添加比例尺控件
    this.map.addControl(scaleCtrl);
    var zoomCtrl = new window.BMapGL.ZoomControl();  // 添加比例尺控件
   this.map.addControl(zoomCtrl);
}
    //添加起始坐标
dpPoint=(data)=>{
    var pt = new window.BMapGL.Point(data[0].lon, data[0].lat);
    var myIcon = new window.BMapGL.Icon("./assets/start_point.png", new window.BMapGL.Size(36, 42),
    {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42)
    }
    );
    var marker = new window.BMapGL.Marker(pt, {
        icon: myIcon
    });  // 创建标注
    this.map.addOverlay(marker);              // 将标注添加到地图中
   //末位置坐标
   var pts = new window.BMapGL.Point(data[data.length-1].lon, data[data.length-1].lat);
   var myIcons = new window.BMapGL.Icon("./assets/end_point.png", new window.BMapGL.Size(36, 42),
   {
       imageSize: new window.BMapGL.Size(36, 42),
       anchor: new window.BMapGL.Size(18, 42)
   }
   );
   var markers = new window.BMapGL.Marker(pts, {
       icon: myIcons
   });  // 创建标注
   this.map.addOverlay(markers); 

}
     //链接地图
  drwMap =(data)=>{
    let trackPoint = [];
    for(let i=0;i<data.length;i++){
        let point = data[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }

    let polyline = new window.BMapGL.Polyline(trackPoint,{
        strokeColor:'#09F',
        strokeWeight:3,
        strokeOpacity:1
    })
    this.map.addOverlay(polyline);
 this.map.centerAndZoom(new window.BMapGL.Point(data[data.length-1].lon, data[data.length-1].lat), 13);
  }
 drwMapArea=(data)=>{
       // 连接路线图
       let trackPoint = [];
       for (let i = 0; i < data.length; i++) {
           let point = data[i];
           trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
       }
       // 绘制服务区
       let polygon = new window.BMapGL.Polygon(trackPoint, {
           strokeColor: '#CE0000',
           strokeWeight: 4,
           strokeOpacity: 1,
           fillColor: '#ff8605',
           fillOpacity:0.4
       })
       this.map.addOverlay(polygon);
 }

    render() {
        return (
            <div className="details-container" style={{paddingTop:50}}>
                <div id="mapContainer" style={{height:500,width:800,margin:"0px auto"}}></div>
                <div className='baseSource'>
                     <h2>基础信息</h2>
                     <ul>
                     <li>用车模式<span>1234</span></li>
                     <li>停单编号<span>1234</span></li>
                     <li>车辆编号<span>1234</span></li>
                     <li>用户姓名<span>1234</span></li>
                     <li>手机号码<span>1234</span></li>
                     </ul>
                     <hr/>
                </div>
                <div className="back_where">

                </div>
            </div>
        )
    }
}
