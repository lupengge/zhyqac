<template>
  <div class="contactCard">
    <img :src="require('@/assets/images/'+picture+'.png')"/>
    <div>
      <div>{{name}}</div>
      <div>{{phone}}</div>
    </div>
    <img src="@/assets/images/呼叫2.png" style="cursor: pointer;"/>
  </div>
</template>

<script>
export default {
  props:{
    name:String,
    phone:String,
    picture:String,
  }
}
</script>

<style>
.contactCard{
  position: relative;
  width: 100%;
  height: fit-content;

  border: 2px solid #adf1ff10;
  border-radius: 5px;
  margin: 2px 0;
}
.contactCard:hover{
  box-shadow: inset 0 0 15px 0 #00d4f3;
  transform: scale(1.05);
}
.contactCard>img:nth-child(1){
  width: 12%;
  padding: 5px;
  display: inline-block;
}
.contactCard>div{
  display: inline-block;
  vertical-align: super;
}
.contactCard>img:nth-child(3){
  position: absolute;
  width: 17%;
  right: 0;
}
</style>
