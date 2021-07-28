<template>
  <chart-2 title="震荡曲线图">
    <div id="energyCurve"></div>
  </chart-2>
</template>

<script>
import chart2 from '../chart2.vue'
import * as echarts from 'echarts'

export default {
  components: { chart2 },
  data(){
    return{
      energyConsumption: new Array(24).fill(0).map(() => Math.floor(Math.random() * 100)),
      load: new Array(24).fill(0).map(() => Math.floor(Math.random() * 100)),
      elecFee: new Array(24).fill(0).map(() => Math.floor(Math.random() * 100))
    }
  },
  mounted() {
    let chartDom = document.getElementById('energyCurve')
    let myChart = echarts.init(chartDom)
    let option = {
      title: {
        text: '堆叠区域图',
        show: false
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#ffffff'
        }
      },
      legend: {
        textStyle: {
          color: 'aliceblue'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: Array.from(Array(24)).map((a, b) => b)
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'X',
          type: 'line',
          areaStyle: {},
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.energyConsumption
        },
        {
          name: 'Y',
          type: 'line',
          smooth: true,
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.load
        },
        {
          name: 'Z',
          type: 'line',
          smooth: true,
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.elecFee
        }
      ]
    }
    myChart.setOption(option)

    window.addEventListener('resize', () => {
      myChart.resize();
    })
  }
}
</script>

<style>
</style>
