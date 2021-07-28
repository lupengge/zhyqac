<template>
  <div class="chartCard">
    <div class="title">
      <i><img style="vertical-align: middle;" v-if="image" :src="image" />{{title}}</i>
      <div class="titleBg"></div>
    </div>
    <div class="chartMain">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    image:String
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  color: aliceblue;
}
.chartCard {
  position: relative;
  /* height: calc(25% - 10px); */
  /* padding: 10px 10px 0 10px; */
  /* width: calc(100% - 20px); */
  width: 100%;
  height: 25%;
}
.title {
  height: 13%;
  font-size: 1.2vw;
  position: relative;
}
.title>i{
  position: absolute;
  bottom: 0;
  left: 20px;
  height: 100%;
}
.chartMain {
  height: 87%;
  bottom: 0;
  position: absolute;
  width: calc(100% - 20px);
  margin: 0 10px;
  background: url('../assets/images/层级.png') no-repeat bottom center;
  background-size: contain;

}
.titleBg {
  position: absolute;
  width: 100%;
  bottom: 0;
  background: url('../assets/images/标题线.png') no-repeat bottom left;
}
</style>

