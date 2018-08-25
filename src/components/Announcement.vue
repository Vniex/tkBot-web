<template>

  <div style="height:60px;">
  <sticky scroll-box="vux_view_box_body" 
  ref="sticky"
        :offset="46">
  <tab>
    <tab-item @on-item-click="onItemClick" v-for="(item,index) in exchanges" :key="index" :selected="index===tabIndex" >{{ item.exchange_name }}</tab-item>
   </tab>
  </sticky>
  <div class="scrollerWrap">
  <scroller  height="100%" :on-refresh="refresh" :on-infinite="loadMore" ref="scrollerBottom">
     <div >
    <group>
      <cell v-for="item in list" :title="'['+item.posted_at+'] '+item.title" :link="item.link" :is-link=true>
        
      </cell>
     
    </group>
        <!-- <div class="box1">
        <div class="box1-item" v-for="i in list"><span>{{' ' + i.title + ' '}}</span></div>
      </div> -->
      </div>
    </scroller>
  </div>
</div>
    <!-- <p v-for="n in 100"> {{n}}</p> -->
</template>

<script>

            
import { Tab, TabItem, Sticky, Divider, XButton,Group,Cell,AlertModule} from 'vux'
import axios from 'axios'

const exchanges = () => [{"exchange_name":'所有',"exchange_id":-1}, 
{"exchange_name":'Huobi',"exchange_id":108}, {"exchange_name":'AEX',"exchange_id":1351}, ]



export default {
  
  components: {
      Tab,
      TabItem,
      Sticky,
      Divider,
      XButton,
      Group,
      Cell,

    
    },
    mounted: function () {
    this.refresh()
   },

    data () {
      return {
        exchanges:exchanges(),
        tabIndex:0,
        list: [],
        limit:15,
        last_id:99999999,
        err_alert:false
       
      }
    },
    methods: {
      onItemClick(index){
        this.tabIndex=index
        this.last_id=999999999
        console.log('on item click:', index)
        console.log(this.exchanges[this.tabIndex])
        this.refresh()
      },

      fetchData(cb) {
        
        // var url='http://120.78.158.126:5001/api/v1/announcement/'
         var url='http://127.0.0.1:8888/api/v1/announcement/'
        // url='http://localhost:3000/'
        axios({
              url: url,
              method: 'GET',
              params: {
                  limit: this.limit,
                  last_id:this.last_id,
                  exchange_id:this.exchanges[this.tabIndex]["exchange_id"]
              },
              timeout:5000
          }).then( res => {
            // debugger
              if (res.data.success){
                var data = res.data.data.map((item) => {   //  有同事指出应该声明一个新变量来存储map的结果，这个建议我认为是对的。
                return {
                    ...item,
                    posted_at:this.dateFormat(item.posted_at)
                  }
                });
                cb(data)
              }else{
                console.log(res.data.message)
                this.$refs.scrollerBottom.finishPullToRefresh()
                this.$refs.scrollerBottom.finishInfinite(true)
              }
          }).catch( e => {
              console.info(e)
              AlertModule.show({
                title: '网络错误',
                content: '',
              })
              this.$refs.scrollerBottom.finishPullToRefresh()
              this.$refs.scrollerBottom.finishInfinite(true)
          })
      },
      refresh() {
        this.last_id=99999999
        this.fetchData(data => {
          
          this.last_id=Math.min.apply(Math, data.map(item=> item.id))
          this.list = data
          // this.$refs.scrollerBottom.resize()
          this.$refs.scrollerBottom.finishPullToRefresh()
          
        })
      },
      loadMore() {
        this.fetchData(data => {
          if (data.length == 0) {
            this.$refs.scrollerBottom.finishInfinite(true)
            
          }else{
            this.last_id=Math.min.apply(Math,data.map(item=> item.id))
            
            this.list = this.list.concat(data)
             //  this.$refs.scrollerBottom.resize()
             this.$refs.scrollerBottom.finishInfinite()
          }
         
          
        })
      },
    dateFormat(timestamp) {
      var date=new Date(timestamp*1000)
      var d = date.getDate();
      var m = date.getMonth() + 1; //Month from 0 to 11
      var h=date.getHours()
      var mm=date.getMinutes()
    
      return (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d)+' '+(h<=9?'0'+h:h)+':'+(mm<=9?'0'+mm:mm);
      }
    }
    
    
}
</script>

<style lang="less">

 .scrollerWrap{
    position:absolute;
    width:100%;
    height:90%;//有header的时候可能会出现滚动条，所以最好高度是除去header的高度
    top:44px;//一般页面有header的时候需要留出header的高度
    // bottom:20px;
    main{
      height:100%;
    }
}

</style>