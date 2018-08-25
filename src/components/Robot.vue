<template>
  <div>
      <sticky scroll-box="vux_view_box_body" 
        ref="sticky"
              :offset="0">
        <tab>
          <tab-item @on-item-click="onItemClick"  v-for="(item,index) in robothubs" :key="index" :selected="index===0" >{{ item }}</tab-item>
        </tab>
     
      </sticky>
    <div v-for="item in robotlist[hubindex]">
     <form-preview  header-label="机器人:" :header-value="item.name" :body-items="item.list" :footer-buttons="buttons1" :name="item.name"></form-preview>
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
      buttons1: [{
        style: 'primary',
        text: '删除机器人',
        onButtonClick: (name) => {
          alert(`clicking ${name}`)
        }
      }, {
        style: 'primary',
        text: '关闭机器人',
        
      },{
        style: 'primary',
        text: '开启机器人',
        
      },
      ],
     
    }
  },
  mounted: function(){
    this.fetchData()
  },
   methods:{
    fetchData () {
    var url='http://127.0.0.1:8888/api/v1/robot/'
        axios({
              url: url,
              method: 'GET',
              timeout:5000
          }).then( res => {
            
              if (res.data.success){
               res.data.data.forEach(element => {
                    if(this.getStatus(element.last_login)=="在线中"){
                      this.robothubs.push("✅"+element.hub_name)
                    }else{
                      this.robothubs.push("❓"+element.hub_name)
                    }
                    
                    var robot={}
                    var hubrobots=[]
                    for (var robot_name in element.robot){
                      robot.name=element.robot[robot_name].robot_name
                      robot.list=[{             
                        "label":"在线状态",
                        "value":this.getStatus(element.robot[robot_name].last_login)
                      }]
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



