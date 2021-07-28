<template>
  <chart title="设备统计">
    <div id="devInfoBox">
      <div>
        <img class="image" src="../../assets/images/1.png" />
        <div>
          <div class="label">设备总数</div>
          <span>{{deviceNum}}</span>&nbsp;个
        </div>
      </div>
      <div>
        <img class="image" src="../../assets/images/故障.png" />
        <div>
          <div class="label">设备故障率</div>
          <span>{{badDevRate}}</span>&nbsp;%
        </div>
      </div>
    </div>
    <pieChart chartId="devicePie" :datas="[2143,12,41]" :names="['在线设备','故障设备','离线设备']" :unit="Array(3).fill('个')">
      <div style="font-size:1.5vw;font-weight:700;">
        80%
      </div>
      <span>故障率</span>
    </pieChart>
  </chart>
</template>

<script>
import chart from '@/components/chart'
import pieChart from '@/components/pieChart'
export default {
  components: {
    chart,
    pieChart
  },
  props:{
    deviceNum:Number,
    badDevRate:Number
  }
}
</script>

<style scoped>
#devInfoBox {
  width: 100%;
  height: 30%;
  position: relative;
  text-align: center;
  color: aliceblue;
}
#devInfoBox > div {
  display: inline-block;
  /* background-color: aliceblue; */
  width: 45%;
  height: 100%;
  border-radius: 10px;
}
.image {
  width: 28%;
  /* height: 100%; */
  background: url('../../assets/images/1.png') no-repeat 0 0;
  background-size: contain;
  display: inline;
  float: left;
}
#devInfoBox > div>div{
  display: inline-block;
  position: relative;
  margin: 5px;
}
.label{
      /* background: #00d4f3; */
    font-size: 0.7vw;
    color: aqua;
    font-weight: 500;
}
</style>
