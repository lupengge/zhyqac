<template>
  <chart title="设备统计">
      <div class="people">
        <img src="../../assets/images/device.png" />
        <span>当前设备数</span>
        <span class="data" >{{PersionCount}}</span>
      </div>
      <div class="peopleinfo">
        <div>
          {{owner}}
          <div class="dataName" >在线</div>
          <img src="../../assets/images/数据1.png">
        </div>
        <div>
          {{visitor}}
          <div class="dataName" >离线</div>
          <img src="../../assets/images/数据2.png">
        </div>
        <div>
          {{other}}
          <div class="dataName" >异常</div>
          <img src="../../assets/images/数据3.png">
        </div>
      </div>
    </chart>
</template>

<script>
import chart from "@/components/chart"
export default {
  components:{
    chart,
  },
  props:{
    owner:Number,
    visitor:Number,
    other:Number,

  },
  computed:{
    PersionCount(){
      return this.owner+this.visitor+this.other;
    }
  }
}
</script>

<style>
  .people{
    width: 100%;
    position: relative;
    box-shadow: inset -1px -10px 15px 0px rgba(70, 221, 226, 0.3);
    border-radius: 5px;
  }
  .people img{
    background: url('../../assets/images/图标业务办理.png') no-repeat 0 0;
    background-size: cover;
    margin: 5px 20px;
    width: 18%;
  }
  .people span{
    color: aliceblue;
    font-size: 1vw;
    font-weight: 400;
    position: absolute;
    top: 1vw;
  }
  .data{
    margin-left: 8vw;
    color: rgb(0, 222, 255) !important;
    font-weight: 600 !important;
    font-size: 1.2vw !important;
  }
  .peopleinfo{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
    justify-content:center;
    color: aliceblue;
    margin-top: 10px;

    text-align: center;
  }
  .peopleinfo div{
    width: 28%;
    position: relative;
    margin: 0 10px;
  }
  .peopleinfo div img{
    width: 100%;
    top: 1vw;
    left: 0;
    position: absolute;
  }
  .peopleinfo div .dataName{
    color: #00d4f3;
    font-size: 0.8vw;
    position: absolute;
    width: 100%;
    top: 1.3vw;
    left: -11px;
  }
</style>
