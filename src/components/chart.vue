<template>
  <div class="chart">
    <i>{{title}}</i>
    <div class="title"></div>
    <div class="chartMain">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:String,
  }
}
</script>

<style scoped>
  .chart{
    margin-inline: 10px;
    height: 25%;
    position: relative;
  }
  .title{
    width: 100%;
    height: 1.2vw;
    background: url('../assets/images/标题线.png') no-repeat 0 0;
    color: aliceblue;
    top: -0.5vw;
    position: relative;
  }
  i{
    margin: 0 20px;
    position: relative;
    color: aliceblue;
    font-size: 1.2vw;
    font-weight: 500;
  }
  .chartMain{
    position: relative;
    top: -0.7vw;
    height: 78%;
    width: 100%;
  }

</style>
