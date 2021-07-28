import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentBIMAttr:Array.from(Array(10)).reduce((pre,value,index)=>{pre[`内容${index + 1}`] = `测试数据${index + 1}`;return pre},{}),
    currentDeviceAttr:{},
    bimAttrIsShow:false,
    deviceState:{},
    isRightSideShow:false,
  },
  mutations: {
    changeBIMAttr(state,attr){
      state.currentBIMAttr=attr;
      state.bimAttrIsShow=true;
    },
    changeDeviceAttr(state,attr){
      state.currentDeviceAttr=attr
    },
    showAttr(state){
      state.bimAttrIsShow=true
    },
    hideBimAttr(state){
      state.bimAttrIsShow=false
    },
    setDeviceInfo(state,info){
      state.deviceState=info
    }
  },
  actions: {
  },
  modules: {
  }
})
