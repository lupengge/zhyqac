<template>
  <div>
    <left-side>
      <chart-2 style="height:50%;width:100%" title="最大风速"><div id="SpeedLine"></div></chart-2>
      <chart-2 style="height:50%;width:100%" title="极大风向">
        <div style="height:50%;width:50%;display:inline-block;" id="windDir0"></div>
        <div style="height:50%;width:50%;display:inline-block;" id="windDir1"></div>
        <div style="height:50%;width:50%;display:inline-block;" id="windDir2"></div>
        <div style="height:50%;width:50%;display:inline-block;" id="windDir3"></div>
      </chart-2>
    </left-side>
    <right-side>
      <chart-2 style="height:50%;width:100%" title="湍流强度"><div id="windPower"></div></chart-2>
      <chart-2 style="height:50%;width:100%" title="平均风速"><div id="avgSpeed"></div></chart-2>
    </right-side>
  </div>
</template>

<script>
import Chart2 from '../components/chart2.vue'
import LeftSide from '../components/index/leftSide.vue'
import RightSide from '../components/index/rightSide.vue'
import * as echarts from 'echarts'

export default {
  components: {
    LeftSide,
    RightSide,
    Chart2
  },
  data() {
    return {
      //windSpeed: [Array.from(Array(45).reduce((pre,value,index)=>{pre[index]=Math.random() return pre},{}))]
    }
  },
  mounted() {
    //#region 调整样式
    document.querySelectorAll('.chartCard .title').forEach(ele => (ele.style.height = '7%'))
    document.querySelectorAll('.chartCard .chartMain').forEach(ele => (ele.style.height = '92%'))
    //#endregion

    //#region 极大风速
    let SpeedLineDom = document.getElementById('SpeedLine')
    let SpeedLineChart = echarts.init(SpeedLineDom)
    let option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['5月18日', '5月19日', '5月20日', '5月21日']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '5月18日',
          type: 'line',

          data: [120, 132, 101, 134, 90, 230, 210, 230, 210]
        },
        {
          name: '5月19日',
          type: 'line',

          data: [220, 182, 191, 234, 290, 330, 310, 330, 310]
        },
        {
          name: '5月20日',
          type: 'line',

          data: [150, 232, 201, 154, 190, 330, 410, 330, 410]
        },
        {
          name: '5月21日',
          type: 'line',

          data: [320, 332, 301, 334, 390, 330, 320, 330, 320]
        }
      ]
    }
    SpeedLineChart.setOption(option)
    window.addEventListener('resize', () => {
      SpeedLineChart.resize()
    })
    //#endregion
    //#region 极大风速
    function rendPolarEcharts(id) {
      let windDirDom = document.getElementById(id)
      let windDirChart = echarts.init(windDirDom)
      let windDirOption = {
        angleAxis: {
          zlevel: 2,
          type: 'category',
          data: [
            { value: '北' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '东北' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '东' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '东南' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '南' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '西南' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '西' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '西北' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' }
          ],

          boundaryGap: false, //标签和数据点都会在两个刻度之间的带(band)中间
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          show: true,
          splitLine: {
            show: true,
            lineStyle: {
              // color:"black"
            }
          },
          axisLabel: {
            show: true,
            interval: 5 //坐标轴刻度标签的显示间隔，在类目轴中有效
          }
        },
        radiusAxis: {
          min: 0,
          zlevel: 3,
          axisTick: {
            show: false //是否显示坐标轴刻度
          },
          axisLine: {
            show: false //是否显示坐标轴轴线
          }
        },
        polar: {},
        series: [
          {
            barCategoryGap: 0,
            type: 'bar',
            zlevel: 1,
            data: [17, 2, 18, 4, 2, 3, 4, 6, 1, 6, 3, 4, 2, 3, 4, 6, 1, 2, 3, 4, 2, 3, 4, 6, 1, 3, 3, 4, 2, 3, 4, 6, 2, 7, 4, 5, 1, 2, 3, 1, 2, 3, 2, 6, 1, 2, 3, 1],
            coordinateSystem: 'polar',
            stack: 'a',
            itemStyle: {
              borderColor: 'black',
              borderWidth: 1
            }
          }
        ]
      }
      windDirChart.setOption(windDirOption)
      window.addEventListener('resize', () => {
        windDirChart.resize()
      })
    }
    rendPolarEcharts('windDir0')
    rendPolarEcharts('windDir1')
    rendPolarEcharts('windDir2')
    rendPolarEcharts('windDir3')
    //#endregion

    this.renderLineChart('windPower', {
      赛格广场: { '5月18日': 0.36, '5月19日': 0.39, '5月20日': 0.54, '5月21日': 0.48 },
      华强北: { '5月18日': 0.452, '5月19日': 0.453, '5月20日': 0.477, '5月21日': 0.482 }
    })
    this.renderLineChart('avgSpeed', {
      赛格广场: { '5月18日': 2, '5月19日': 2.6, '5月20日': 2.3, '5月21日': 2.18 },
      华强北: { '5月18日': 2.45, '5月19日': 2.66, '5月20日': 2.48, '5月21日': 2.43 }
    })
  },
  methods: {
    renderLineChart(id, data) {
      let dom = document.getElementById(id)
      let chart = echarts.init(dom)
      let option = (option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: Object.keys(data)
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: Object.keys(Object.values(data)[0]),
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: Object.keys(data).map(name => {
          return {
            name: name,
            data: Object.values(data[name]),
            type: 'line'
          }
        })
      })
      chart.setOption(option)
      window.addEventListener('resize', () => {
        chart.resize()
      })
    }
  }
}
</script>


<style>
</style>
