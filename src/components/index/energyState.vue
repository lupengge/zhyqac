<template>
  <chart-2 style="height:18%" title="今日监测异常信息">
    <div style="position: relative; width: 0%; font-size: 0.8vw; display: inline-block">
      <div id="powerLoadliquidfill"></div>
<!--      <div style="margin: 0 auto; width: fit-content">-->
<!--        <img src="@/assets/images/电 .png" width="16px" height="22px" />-->
<!--        <span style="vertical-align: super">&#9;当前用电负荷</span>-->
<!--      </div>-->
    </div>
    <div style="width: 100%; display: inline-block; position: absolute">
      <div class="infoBox">
        <div class="info">
          <span>X值</span><br>
          <triangle dirTo="down" :side-len="8" color-fill="green">{{load.rate}}</triangle>
          <div class="number">{{load.num}}µm</div>
        </div>
        <div class="info">
          <span>Y值</span><br>
          <triangle dirTo="up" :side-len="8" color-fill="yellow">{{energyConsumption.rate}}</triangle>
          <div class="number">{{energyConsumption.num}}µm</div>
        </div>
        <div class="info">
          <span>Z值</span><br>
          <triangle dirTo="up" :side-len="8" color-fill="yellow">{{electricCharge.rate}}</triangle>
          <div class="number">{{electricCharge.num}}µm</div>
        </div>
      </div>
    </div>
  </chart-2>
</template>

<script>
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import chart2 from '../chart2.vue'
import Triangle from '../triangle.vue'

export default {
  components: { chart2, Triangle },
  data() {
    return {
      powerLoad: 0.36,                              //用电负荷
      load:{rate:'16%', num: Math.floor(Math.random() * 100)},              //实时负荷
      energyConsumption:{rate:'16%',num: Math.floor(Math.random() * 100)}, //今日能耗
      electricCharge:{rate:'16%',num: Math.floor(Math.random() * 100)},      //今日电费
    }
  },
  mounted() {
    // var chartDom = document.getElementById('powerLoadliquidfill')
    // var myChart = echarts.init(chartDom)
    // var option = {
    //   series: [
    //     {
    //       type: 'liquidFill',
    //       data: [this.powerLoad],
    //       color: ['#0F8BD8'],
    //       radius: '80%',
    //       outline: {
    //         show: false
    //       },
    //       label: {
    //         fontSize: 30,
    //         fontStyle: 'normal',
    //         color: '#fff',
    //         fontWeight: '550'
    //       },
    //       backgroundStyle: {
    //         color: '#104C787f'
    //       }
    //     }
    //   ]
    // }
    // option && myChart.setOption(option)
    // window.addEventListener('resize', () => {
    //   myChart.resize();
    // })
  }
}
</script>

<style scoped>
#powerLoadliquidfill {
  /* background: url('../../assets/images/旋转.png') no-repeat 0 0;
  background-position: center center;
  background-size: calc(60% + 10px); */
  width: 100%;
  height: 90%;
}
.infoBox {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: stretch;
  height: 90%;
  margin-left: 20px;
}
.info {
  height: 33%;
  position: relative;
  top: 10px;
}
.number {
  position: absolute;
  right: 10px;
  top: -0.8em;
  width: 60%;
  height: 1em;
  margin-top: calc(11.5% - 0.5em);
  font-size: 1.2vw;
  color: #00d4f3;
  text-align: center;
  font-family: Quartz-Bold;
}
</style>
