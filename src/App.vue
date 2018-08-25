<template>
    <div id ="app" style="height:100%;">
  <view-box ref="viewBox">
    <!-- <x-header slot="header" title="tkBot" :left-options="{showBack: false}" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header> -->
    <router-view></router-view>
    <app-footer></app-footer>
  </view-box>
</div>
</template>

<script>
import {ViewBox} from "vux"
import AppFooter from '@/components/Footer'

export default {
  name: 'app',
  components: {
    ViewBox,
    AppFooter
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

</style>
