<template>
  <chart-2 title="园区环境">
    <div>
      <div class="dashboard">
        <div id="temperature"></div>
      </div>
      <div class="dashboard">
        <div id="humidity"></div>
      </div>
      <div class="envCard">
        <img src="@/assets/images/P2.5.png"/>
        <div class="detailInfo">
          <div>pm2.5</div>
          {{pm25}}
        </div>
      </div>
      <div class="envCard">
        <img :style="'background: url('+require('@/assets/images/03(1).png')+');'" src="@/assets/images/风.png"/>
        <div class="detailInfo">
          <div>风力</div>{{wind}}
        </div>
      </div>
    </div>
  </chart-2>
</template>

<script>
import chart2 from '../chart2.vue'
import * as echarts from 'echarts'
export default {
  components: { chart2 },
  mounted() {
    var temperatureDom = document.getElementById('temperature')
    var humidityDom = document.getElementById('humidity')
    var temperatureChart = echarts.init(temperatureDom)
    var humidityChart = echarts.init(humidityDom)

    let option = {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 100,
          splitNumber: 5,
          axisLine: {
            lineStyle: {
              width: 8,
              color: [
                [0.25, '#58D9F9'],
                [0.75, '#7CFFB2'],
                [1, '#FF6E76']
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 6,
            lineStyle: {
              color: 'auto',
              width: 1
            }
          },
          splitLine: {
            length: 10,
            lineStyle: {
              color: 'auto',
              width: 3
            }
          },
          axisLabel: {
            show: false
          },
          radius:'120%',
          center:['50%','90%'],
          title: {
            offsetCenter: [0, '-20%'],
            fontSize: '1.2vw',
            color:'aliceblue',
          },
          detail: {
            fontSize: '1.5vw',
            offsetCenter: [0, '0%'],
            valueAnimation: true,
            formatter: function (value) {
              return Math.round(value * 100) + '分'
            },
            color: 'auto'
          },
          data: [
            {
              value: 0.7,
              name: '成绩评定'
            }
          ]
        }
      ]
    }
    let temperatureOption=option;
    temperatureOption.series[0].detail.formatter=(value)=>{return value +'℃'};
    temperatureOption.series[0].data[0]={value:this.temperature,name:'园区温度'}
    temperatureChart.setOption(temperatureOption);

    let humidityOption=option;
    humidityOption.series[0].detail.formatter=(value)=>{return value+"%"};
    humidityOption.series[0].data[0]={value:this.humidity*100,name:"园区湿度"};
    humidityChart.setOption(humidityOption);

    window.addEventListener('resize',()=>{
      temperatureChart.resize();
      humidityChart.resize();
    })
  },
  data() {
    return {
      temperature: 25.5,
      humidity: 0.6,
      pm25: 22,
      wind: '3-4级'
    }
  }
}
</script>

<style scoped>
.dashboard {
  height: 55%;
  width: calc(50% - 10px);
  margin-inline: 5px;
  display: inline-block;
}
.envCard{
  width: calc(50% - 10px);
  height: 45%;
  margin-inline: 5px;
  display: inline-block;
  background: url('../../assets/images/1s.png') no-repeat right top;
  background-size: 100% 100%;
  position: relative;
}
.envCard > img{
  position: absolute;
  display: inline-block;
  background: url('../../assets/images/P2.5背景转圈.png');
  top: calc(50% - 25px);
  margin-left: 10px;
}
.detailInfo{
  position: absolute;
  left: 70px;
  height: 100%;
  /* background-color: aliceblue; */
  display: inline-block;
  width: calc(100% - 70px);
  font-size: 1.3vw;
  font-weight: 600;
  color: #00d4f3;
  margin-top: 10px;
}
.detailInfo > div{
  height: 1.2vw;
  font-size: 1vw;
  font-weight: 400;
}
</style>
