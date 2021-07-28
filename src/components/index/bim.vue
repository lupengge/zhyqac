<template>
  <section class="bim-section" v-show="bimAttrIsShow">
    <header class="header ant-modal-body"><span @click="$emit('goBack')" style="color:#00deff">返回</span> | 属性</header>
    <a-divider></a-divider>
    <ul>
      <li v-for="(vue,key, index) in CurrentShowAttr" :key="index">
        <section>{{ key }}:</section>
        <section>{{ vue }}</section>
      </li>
      <a-button @click="toggleHideAttr" type="primary" size="small" block>
      展 开
      </a-button>
    </ul>

  </section>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'bim.vue',
  data(){
    return{
      showHideAttr:false,
    }
  },
  computed:{
    ...mapState(['currentBIMAttr','bimAttrIsShow']),
    CurrentShowAttr(){
      if(!this.showHideAttr){
        return this.currentBIMAttr;
      }else{
        return {
          ...this.currentBIMAttr,
          ...this.currentBIMAttr.hidePro
        }
      }
    }
  },
  methods: {
    ...mapMutations(['hideBimAttr']),
    toggleHideAttr(e){
      this.showHideAttr=!this.showHideAttr;
      if(this.showHideAttr){
        e.target.querySelector('span').textContent='收 起'
      }else{
        e.target.querySelector('span').textContent='展 开'
      }

    }
  },
}
</script>

<style scoped>

</style>
