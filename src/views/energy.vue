<template>
  <div>
    <left-side>
      <chart-2 title="能耗统计" :image="require('@/assets/images/能源1.png')">
        <div id="energyConsumption"></div>
      </chart-2>
      <chart-2 title="实时用电监控'" :image="require('@/assets/images/电 .png')">
        <div id="electricityMonitor"></div>
      </chart-2>
      <chart-2 title="实时用水监控" :image="require('@/assets/images/水 .png')">
        <div id="waterMonitor"></div>
      </chart-2>
      <chart-2 title="实时用热监控" :image="require('@/assets/images/燃气 .png')">
        <div id="heatMonitor"></div>
      </chart-2>
    </left-side>

    <right-side>
      <chart-2 title="子系统能耗对比">
        <div id="subsEnergyCompare"></div>
      </chart-2>
      <chart-2 title="年度能耗对比">
        <div id="yearEnergyCompare"></div>
      </chart-2>
      <chart-2 title="月度能耗对比">
        <div id="monthEnergyCompare"></div>
      </chart-2>
    </right-side>
  </div>
</template>

<script>
import Chart2 from '../components/chart2.vue'
import LeftSide from '../components/index/leftSide.vue'
import RightSide from '../components/index/rightSide.vue'
import * as echarts from 'echarts'

export default {
  components: { LeftSide, RightSide, Chart2 },
  data() {
    return {
      /**能耗统计数据 */
      energyConsumption: { 2: 100, 4: 80, 6: 710, 8: 400, 10: 600, 12: 500, 14: 400, 16: 500, 18: 550, 20: 350, 22: 420, 24: 430 },
      /**实时用电监控数据 */
      electricityMonitor: [
        { 2: 100, 4: 80, 6: 710, 8: 400, 10: 600, 12: 500, 14: 400, 16: 500, 18: 550, 20: 350, 22: 420, 24: 430 },
        { 2: 200, 4: 180, 6: 810, 8: 500, 10: 700, 12: 600, 14: 500, 16: 600, 18: 650, 20: 450, 22: 520, 24: 530 }
      ],
      /** 实时用水监控数据 */
      waterMonitor: [
        { 2: 600, 4: 80, 6: 710, 8: 400, 10: 600, 12: 500, 14: 400, 16: 500, 18: 550, 20: 350, 22: 420, 24: 430 },
        { 2: 800, 4: 180, 6: 810, 8: 500, 10: 700, 12: 600, 14: 500, 16: 600, 18: 650, 20: 450, 22: 520, 24: 530 }
      ],
      /**子系统能耗对比数据 */
      subsEnergyCompare: { 多能源管理: 20, 楼宇自控: 30, 机房环控: 40, 能耗管理: 30, 能源及环境: 20, 信息发布: 20, 空调: 50, 给排水: 20, 消防: 30, 安防: 10, 一卡通: 10, 停车场: 20 },
      /**年度能耗对比 */
      yearEnergyCompare: {
        2018: { 冷水量: 0.6, 热水量: 0.45, 中水量: 0.9, 冷量: 0.78, 热量: 0.58, 燃气量: 0.49, 燃油量: 0.75 },
        2019: { 冷水量: 0.5, 热水量: 0.54, 中水量: 0.79, 冷量: 0.8, 热量: 0.8, 燃气量: 0.6, 燃油量: 0.5 },
        2020: { 冷水量: 0.7, 热水量: 0.64, 中水量: 0.89, 冷量: 0.7, 热量: 0.7, 燃气量: 0.7, 燃油量: 0.7 },
        2021: { 冷水量: 0.48, 热水量: 0.24, 中水量: 0.95, 冷量: 0.78, 热量: 0.58, 燃气量: 0.75, 燃油量: 0.6 },
        2022: { 冷水量: 0.65, 热水量: 0.74, 中水量: 0.89, 冷量: 0.8, 热量: 0.5, 燃气量: 0.65, 燃油量: 0.8 }
      },
      /**月度能耗对比 */
      monthEnergyCompare:{
        冷水量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        热水量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        中水量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        冷量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        热量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        燃气量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
        燃油量:Array.from(Array(12)).reduce((pre,value,index)=>{pre[index+1+"月"]=Math.floor(Math.random()*10)/10;return pre;},{}),
      }
    }
  },
  mounted() {
    document.querySelectorAll('.rightSide>.chartCard').forEach(ele => {
      ele.firstChild.style.height = '10%'
      ele.lastChild.style.height = '90%'
    })

    let barOption = {
      color: ['#00d4f3', 'red'],
      legend:{
        show:true,
        textStyle:{
          color:"#ffffff"
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '20%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#ffffff'
        }
      },
      xAxis: {
        type: 'category',
        data: Object.keys(this.energyConsumption),
        axisLabel: {
          color: '#ffffff'
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          //决定是否显示坐标中网格
          show: false
        },
        axisLabel: {
          color: '#ffffff'
        },
        nameTextStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          data: Object.values(this.energyConsumption),
          type: 'bar'
        }
      ]
    }
    // 渲染能耗统计
    let dom = document.getElementById('energyConsumption')
    let chart = echarts.init(dom)
    chart.setOption(barOption)
    window.addEventListener('resize', () => {
      chart.resize()
    });

    //渲染实时用电监控
    let electricityMonitorDom = document.getElementById('electricityMonitor');
    let electricityMonitorChart = echarts.init(electricityMonitorDom);
    //插入数据
    barOption.series = this.electricityMonitor.reduce((pre, value, index) => {
      pre.push({
        data: Object.values(value),
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.3 }
      });
      return pre
    }, []);
    //修改坐标轴显示效果
    barOption.xAxis.data = Object.keys(this.electricityMonitor[0]);
    barOption.xAxis.boundaryGap = false;
    barOption.yAxis.name = '(单位:kw)';
    barOption.yAxis.splitLine = { show: true, lineStyle: { type: 'dashed' } };

    electricityMonitorChart.setOption(barOption);
    window.addEventListener('resize', () => {
      electricityMonitorChart.resize()
    })

    //渲染实时用水监控
    let waterMonitorDom = document.getElementById('waterMonitor')
    let waterMonitorChart = echarts.init(waterMonitorDom)
    barOption.color = ['#00d4f3', 'green'];
    barOption.yAxis.name = '(单位:吨)';
    barOption.xAxis.data=Object.keys(Object.values(this.monthEnergyCompare)[0]);
    //插入数据
    barOption.series =this.waterMonitor.reduce((pre, value, index) => {
      pre.push({
        data: Object.values(value),
        type: 'line',
        smooth: true,
        areaStyle:{opacity: 0.3},
      })
      return pre
    }, [])


    waterMonitorChart.setOption(barOption)
    window.addEventListener('resize', () => {
      waterMonitorChart.resize()
    })



    //渲染实时用热监控heatMonitor
    let heatMonitorDom = document.getElementById('heatMonitor')
    let heatMonitorChart = echarts.init(heatMonitorDom)
    barOption.color = ['#00d4f3', 'yellow']
    barOption.yAxis.name = '(单位:吨)'
    //插入数据
    barOption.series = this.waterMonitor.reduce((pre, value, index) => {
      pre.push({
        data: Object.values(value),
        type: 'line',
        smooth: true,
        areaStyle: { opacity: 0.3 }
      })
      return pre
    }, [])

    heatMonitorChart.setOption(barOption)
    window.addEventListener('resize', () => {
      heatMonitorChart.resize()
    })


    //渲染月度能耗对比
    let monthEnergyCompareDom = document.getElementById('monthEnergyCompare')
    let monthEnergyCompareChart = echarts.init(monthEnergyCompareDom)
    barOption.color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];

    barOption.yAxis.name = ''
    //插入数据
    barOption.series =Object.entries(this.monthEnergyCompare).reduce((pre,value,index)=>{
      pre.push({
        name:value[0],
        type:'line',
        data:Object.values(value[1]),
        smooth:true,
      })
      return pre;
    },[]);

    monthEnergyCompareChart.setOption(barOption)
    window.addEventListener('resize', () => {
      monthEnergyCompareChart.resize()
    })


    let pieOption = {
      legend: {
        top: 'center',
        left: 'auto',
        orient: 'vertical',
        textStyle: {
          color: '#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.7)',
        textStyle: {
          color: '#ffffff'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['20%', '90%'],
          center: ['60%', '50%'],
          label: {
            show: false,
            position: 'center'
          },
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          emphasis: {
            label: {
              show: true,
              color: '#ffffff',
              fontWeight: 'bold'
            }
          },
          data: Object.entries(this.subsEnergyCompare).map(a => {
            return { name: a[0], value: a[1] }
          })
        }
      ]
    }

    let subsEnergyComparedom = document.getElementById('subsEnergyCompare')
    let subsEnergyComparechart = echarts.init(subsEnergyComparedom)
    subsEnergyComparechart.setOption(pieOption)
    window.addEventListener('resize', () => {
      subsEnergyComparechart.resize()
    })

    //渲染年度能耗对比
    let yearEnergyComparedom = document.getElementById('yearEnergyCompare')
    let yearEnergyComparechart = echarts.init(yearEnergyComparedom)
    barOption.series=[{
      type:'bar',
      data:Object.values(Object.entries(this.yearEnergyCompare)[0][1])
    }];
    barOption.xAxis.data = Object.keys(Object.entries(this.yearEnergyCompare)[0][1])
    barOption.yAxis.name = '(单位:kw)'
    barOption.xAxis.boundaryGap = true
    barOption.grid.top = '30%'
    barOption.grid.left = '5%'
    let multiOption = {
      timeline: {
        top: 'top',
        width: '100%',
        left: 0,
        autoPlay: false,
        playInterval: 1500,
        symbol: 'none',
        orient: 'horizontal',
        axisType: 'category',
        label: {
          formatter: '{value}',
          position: 10,
          color: '#ffffff'
        },
        progress: {
          label: {
            formatter: '{value}',
            position: 10,
            color: '#fff'
          }
        },
        checkpointStyle: {
          animationDuration: 1500
        },
        data: Object.keys(this.yearEnergyCompare)
      },
      baseOption:barOption,
      options:[]
    }
    Object.keys(this.yearEnergyCompare).forEach(year=>{
      multiOption.options.push({series:{type:'bar',data:Object.values(this.yearEnergyCompare[year])}})
    });

    yearEnergyComparechart.setOption(multiOption)
    window.addEventListener('resize', () => {
      yearEnergyComparechart.resize()
    });
  }
}
</script>

<style scoped>
.rightSide > .chartCard {
  height: 33%;
}
</style>
