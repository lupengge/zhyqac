<template>
  <div>
    <div v-for="(value,index) in idleAssets" :key="index" class="container">
      <div class="dummy"><div class="chartContainer"></div></div>
      <div class="element">{{index}}</div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data(){
    return {
      idleAssets:{资产01:25.2,资产02:20.2,资产03:45.2,资产04:25.2,资产05:20.2,资产06:45.2,}
    }
  },
  mounted(){
    let color='#58D9F9'
    let progressOpt = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          min: 0,
          max: 100,
          radius: '60%',
          splitNumber: 100,

          progress: {
            show: true,
            width: -10,
            itemStyle: {
              color: color
            }
          },
          pointer: { show: false },
          axisLine: {
            lineStyle: {
              width: -2
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            formatter: '{value}%',
            color: color,
            offsetCenter: ['0', '0'],
            fontSize:16,
          },
          title: { show: false },
          data: [
            {
              value: 60,
              name: 'Percent'
            }
          ]
        }
      ]
    }
    document.getElementsByClassName('chartContainer').forEach((dom,index)=>{
      let currentChart=echarts.init(dom);
      let currentValue=Object.values(this.idleAssets)[index];
      progressOpt.series[0].data[0].value=currentValue;
      if(currentValue>30){
        progressOpt.series[0].detail.color='#FF9318';
        progressOpt.series[0].progress.itemStyle.color='#FF9318';
      }else{
        progressOpt.series[0].detail.color='#2B9CE7';
        progressOpt.series[0].progress.itemStyle.color='#2B9CE7';
      }
      currentChart.setOption(progressOpt);

      window.addEventListener('reset',()=>currentChart.resize());
    })
  }
}
</script>

<style scoped>
.container {
  display: inline-block;
  position: relative;
  width: 32%;
  text-align: center;
  margin: 0 0.5%;
  height: 50%;
}
.dummy {
  /* padding-top: 100%; 1:1 aspect ratio */
  width: 100%;
  height: calc( 100% - 20px);
  /* background: #333333; */
  position: relative;
}
.chartContainer {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
