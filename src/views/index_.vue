<template>
  <div>
    <leftSide>
      <persion :owner="48" :visitor="5" :other="3" />
      <!--      <carport :putIn="196" :putOut="28" :internalCar="100" :externalCar="50" :surplusPorts="50" />-->
      <!--      <dervice :deviceNum="2160" :badDevRate="11.6" />-->
      <floor-list @choseDevice="showBillbildProp" />
    </leftSide>

    <right-side v-show="isRightSideShow">
      <bim @goBack="hideRightSide"  ref="bimRef"></bim>
      <device @goBack="hideRightSide" ref="deviceRef"></device>
      <!--      <garden-env />-->
      <!--      <energy-state />-->
      <!--      <energy-curve />-->
      <!--      <floor-list />-->
    </right-side>
  </div>
</template>

<script>
import leftSide from '@/components/index/leftSide'
import RightSide from '@/components/index/rightSide.vue'

import persion from '@/components/index/persionCount'
import carport from '@/components/index/carport'
import dervice from '@/components/index/deviceStatistics'
import WarningInfo from '@/components/index/warningInfo.vue'

import floorList from '@/components/index/floorList.vue'
import EnergyCurve from '@/components/index/energyCurve.vue'
import EnergyState from '@/components/index/energyState.vue'
import GardenEnv from '@/components/index/gardenEnv.vue'
import bim from '@/components/index/bim.vue'
import device from '@/components/index/device.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    leftSide,
    RightSide,

    persion,
    carport,
    dervice,
    WarningInfo,

    floorList,
    GardenEnv,
    EnergyState,
    EnergyCurve,
    device,
    bim
  },
  data() {
    return {
      isRightSideShow: false,
      videos: [
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (1).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (2).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (3).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (4).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (5).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (6).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (7).png' },
        { name: '小区东南角', src: 'http://192.168.188.21/static/1 (8).png' }
      ]
    }
  },
  computed:{
    ...mapState(['bimAttrIsShow','currentDeviceAttr'])
  },
  watch:{
    bimAttrIsShow (show,old){
      if(show){
        this.showRightSide()
      }
    },
    currentDeviceAttr(attr){
      this.$refs.deviceRef.show(attr)
      this.hideBimAttr();
      this.showRightSide();
    }
  },
  mounted() {
    // const obj = {}
    // for (let i = 0; i < 10; i++) {
    //   obj[`内容${i + 1}`] = `测试数据${i + 1}`
    // }
    // this.$refs.bimRef.show(obj)
    this.$refs.deviceRef.show({
      deviceName: 'XXX',
      deviceStatus: '正常'
    })
    this.hideRightSide();
  },
  methods: {
    ...mapMutations(['changeBIMAttr','hideBimAttr']),
    showBillbildProp(billboard) {
      // const obj = {}
      // let currentBIMAttr={
      //   设备编号:billboard.id,
      //   状态:billboard.状态
      // };
      // this.changeBIMAttr(currentBIMAttr)
      // this.showAttr();
      let randomDisTance=()=>{return Math.floor(Math.random()/6*10000)/1000}
      this.$refs.deviceRef.show({
        deviceName: billboard.id,
        deviceStatus: billboard.状态,
        distanceFromWall:`东:${randomDisTance()}米,西:${randomDisTance()}米,南:${randomDisTance()}米,北:${randomDisTance()}米`
      })
      this.hideBimAttr();
      this.showRightSide();
    },
    hideRightSide(){
      this.isRightSideShow=false;
      document.querySelector('#navigationDiv').style.right = '1vw'
      document.querySelector('#navigationDiv').style.top = '-30px'
      document.querySelector('#layerManager').style.right = 'calc(1vw + 19px)'
      document.querySelector('#layerManager').style.top = '150px'
      this.hideBimAttr();
    },
    showRightSide(){
      this.isRightSideShow=true;
      document.querySelector('#navigationDiv').style.right = '21vw'
      document.querySelector('#navigationDiv').style.top = '-60px'
      document.querySelector('#layerManager').style.right = 'calc(21vw + 19px)'
      document.querySelector('#layerManager').style.top = '120px'
    }
  }
}
</script>
<style>
.viderMonitor {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.viderMonitor::-webkit-scrollbar {
  width: 2px;
}
.viderMonitor img:hover {
  background: url('../assets/images/选中.png');
  box-shadow: 0 0 20px 0 #00d4f3;
}
</style>
