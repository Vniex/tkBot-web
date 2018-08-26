<template>
  <div>
      <sticky scroll-box="vux_view_box_body" 
        ref="sticky"
              :offset="0">
        <tab>
          <tab-item @on-item-click="onItemClick"  v-for="(item,index) in robothubs" :key="index" :selected="index===0" >{{ item[1] }}</tab-item>
        </tab>
     
      </sticky>
    <div v-for="(item,index) in robotlist[hubindex]">
     <form-preview  header-label="机器人:" :header-value="item.name" :body-items="item.list" :footer-buttons="buttons" :robot_idx="index" :name="index"></form-preview>
    <br>
  
      </div>
    </div>
</template>

<script>
import { FormPreview,AlertModule,Tab, TabItem,Sticky,Group,Cell } from 'vux'
import axios from 'axios'

export default {
  components: {
    FormPreview,
    Tab, 
    TabItem,
    Sticky,
    Group,
    Cell
  },
  data () {
    return {
      // robothubs:[{"hub_name":"test1"},{"hub_name":"test2"}],
      robothubs:[],
      robotlist: [],
      hubindex:0,
      buttons: [ {
        style: 'primary',
        text: '删除机器人',
        onButtonClick: (index) => {
          var parafull={}
          parafull.para=this.robotlist[this.hubindex][index].para
          parafull.strategy_name=this.robothubs[this.hubindex][0]
          this.doRobot(parafull,"delete")
        }
      }, {
        style: 'primary',
        text: '关闭机器人',
        onButtonClick: (index) => {
          var parafull={}
          parafull.para=this.robotlist[this.hubindex][index].para
          parafull.strategy_name=this.robothubs[this.hubindex][0]
          this.doRobot(parafull,"stop")
        }
      },{
        style: 'primary',
        text: '开启机器人',
        onButtonClick: (index) => {
          // debugger
          // if (this.getStatus(this.robotlist[this.hubindex][index])=="在线中"){
          //   AlertModule.show({
          //       title: '机器人已在线',
          //       content: '',
          //     })    
          //     return  
          // }
          var parafull={}
          parafull.para=this.robotlist[this.hubindex][index].para
          parafull.strategy_name=this.robothubs[this.hubindex][0]
          this.doRobot(parafull,"start")
          // console.log(this.robotlist[this.hubindex][index].para)
        }
      },
      ],
     
    }
  },
  mounted: function(){
    this.robothubs=[]
    this.fetchData()
  },
   methods:{
    fetchData () {
    var url=this.apiPrefix+"/robot/"
        axios({
              url: url,
              method: 'GET',
              timeout:5000
          }).then( res => {
            
              if (res.data.success){
               res.data.data.forEach(element => {
                    if(this.getStatus(element.last_login)=="在线中"){
                      this.robothubs.push([element.hub_name,"✅"+element.hub_name])
                    }else{
                      this.robothubs.push([element.hub_name,"❓"+element.hub_name])
                    }
                    
                    var robot={}
                    var hubrobots=[]
                    for (var robot_name in element.robot){
                      robot.name=element.robot[robot_name].robot_name
                      robot.list=[{             
                        "label":"在线状态",
                        "value":this.getStatus(element.robot[robot_name].last_login)
                      },{
                        "label":"机器人描述",
                        "value":element.robot[robot_name].para.desp
                      }]
                      robot.para=element.robot[robot_name].para
                      hubrobots.push(robot)
                    }
                    
                    this.robotlist.push(hubrobots)
                });
               
              
              }else{//todo error
                console.log(res.data.message)
                
              }
          }).catch( e => {
              console.info(e)
              AlertModule.show({
                title: '网络错误',
                content: '',
              })
          })
   },
   doRobot(para,robot_method){
     var method="POST"
     switch (robot_method){
       case "start":
          method="POST"
          break;
       case "stop":
          method="PUT"
          break;
        case "delete":
          method="DELETE"
          break;

     }
      var url=this.apiPrefix+"/robot/"
     axios({
              url: url,
              method: method,
              timeout:5000,
              data:para,

          }).then( res => {
              if (res.data.success){
                AlertModule.show({
                  title: '成功',
                  content: '',
                })
              }else{//todo error
                console.log(res.data.message)
                
              }
          }).catch( e => {
              console.info(e)
              AlertModule.show({
                title: '网络错误',
                content: '',
              })
          })
   },
        getStatus(last_login){
        var now = Date.parse(new Date());
        var gap=(now/1000-last_login)
        if (gap<10){//在线
            return "在线中"
        }else{
            if (gap>=86400){
                return Math.floor(gap/86400)+"天前"
            }else if(gap>=3600){
                return Math.floor(gap/3600)+"小时前"
            }else if (gap>60){
                return Math.floor(gap/60)+"分钟前"
            }else{
              return Math.floor(gap)+"秒前"
            }
        }
    },
    onItemClick(index){
      // this.fetchData()
      this.hubindex=index
    }

   }
}
</script>



