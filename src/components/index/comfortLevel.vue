<template>
  <chart-2 style="height:20%" title="舒适度指示">
    <div id="comfortLevel"></div>
  </chart-2>
</template>

<script>
import chart2 from '../chart2.vue'
import * as echarts from 'echarts'

export default {
  name: 'comfortLevel',
  components: { chart2 },
  data() {
    return {
      energyConsumption: new Array(24).fill(0).map(() => Math.floor(Math.random() * 100))
    }
  },
  mounted() {
    const chartDom = document.getElementById('comfortLevel')
    const myChart = echarts.init(chartDom)
    const option = {
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
          name: '舒适度',
          type: 'line',
          areaStyle: {},
          smooth: true,
          emphasis: {
            focus: 'series'
          },
          data: this.energyConsumption
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
