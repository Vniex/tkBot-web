<template>
  <div>
    <tabbar>
      <tabbar-item :link="{path:'/home'}"  selected>
        <img slot="icon" src="../assets/image/ic_nav_news_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_news_actived.png">
        <span slot="label">行情</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/announcement',replace:true}" >
        <img slot="icon" src="../assets/image/ic_nav_tweet_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_tweet_actived.png">
        <span slot="label">公告</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/'}" >
        <img style="height:40px;width:40px;" slot="icon" src="../assets/image/ic_nav_add_normal.png">
      </tabbar-item>
      <tabbar-item :link="{path:'/robot'}" >
        <img slot="icon" src="../assets/image/ic_nav_discover_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_discover_actived.png">
        <span slot="label">我的机器人</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/mysettings'}" @on-item-click="onclick1">
        <img slot="icon" src="../assets/image/ic_nav_my_normal.png">
        <img slot="icon-active" src="../assets/image/ic_nav_my_pressed.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>


<script>
  import { Tabbar,TabbarItem } from 'vux'
  export default{
    name: 'AppFooter',
    components: {
      Tabbar,
      TabbarItem,
    },
    data(){
      return{
        index:0
      }
    },
    methods:{
       onclick1(){
          console.log(1);
       }
    }

  }

</script>
