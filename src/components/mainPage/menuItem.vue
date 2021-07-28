<template>
    <router-link class="menuItem" :to="toLink">
        <div>
          <img :src="require('@/assets/images/'+imgSrc)"/>
        </div>
        <a>{{title}}</a>
    </router-link>
</template>

<script>
export default {
  props:{
    toLink:String,
    title:String,
    imgSrc:String,
  }
}
</script>

<style scoped>
  a{
    position: relative;
    top: -0.2vw;
    font-weight: bold;
    color: #90adc9;
    font-size: 1vw;
  }


  .menuItem{
  text-align: center;
  margin: 0 2vw;
  width: 3vw;
  }
  .menuItem div img{
    width: 100%;
    background: url("../../assets/images/默认.png") no-repeat 0 0;
    background-size:cover;
  }
  a.router-link-exact-active div img{
    background: url("../../assets/images/触发.png") no-repeat 0 0;
    background-size:cover;
  }
</style>
