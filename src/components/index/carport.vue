<template>
  <chart title="车位统计">
    <div class="putInOut">
      <div class="inStorage">
        <img src="../../assets/images/车辆进入.png">
        <div>车辆进入<span>{{putIn}}辆</span></div>
      </div>
      <div class="outStorage">
        <img src="../../assets/images/车辆外出.png">
        <div>车辆外出<span>{{putOut}}辆</span></div>
      </div>
    </div>
    <pieChart
      chartId="cartPie"
      :datas="[internalCar,externalCar,surplusPorts]"
      :names="['内部车辆','外部车辆','剩余车位']"
      :unit="Array(3).fill('个')">
      <div style="font-size:1.5vw;font-weight:700;">
        155
      </div>
      <span>车位总数</span>
    </pieChart>
  </chart>
</template>

<script>
import chart from "@/components/chart2";
import pieChart from "@/components/pieChart"
export default {
  components:{
    chart,
    pieChart
  },
  props:{
    putIn:Number,
    putOut:Number,
    internalCar:Number,
    externalCar:Number,
    surplusPorts:Number,
  },

}

</script>

<style scoped>
  .putInOut{
    color: aliceblue;
    font-weight: 400;
    height: 2.8vw;
  }
  .putInOut>div{
    padding: 10px;
    background: #88888844;
    border-radius: 5px;
    width: calc(50% - 25px);
    font-size: 1vw;
    position: relative;
    height: 1.5vw;
  }
  .putInOut div img{
    position: absolute;
    margin: 0.3vw;
  }
  .putInOut>div>div{
    left: 35px;
    position: absolute;
  }
  .inStorage{
    float: left;
  }
  .inStorage span{
      color: #00d4f3;
    }
  .outStorage{
    float: right;
  }
  .outStorage span{
      color:#0bdf8e;
  }

</style>
