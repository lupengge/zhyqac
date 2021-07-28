<template>
  <div style="position: relative;height:70%;color:aliceblue;">
    <div class="carPie" :id="chartId"></div>
    <div class="chartCenter">
      <slot></slot>
    </div>
    <div class="legend">
      <div
        :style="'background:url('+getBgUrl(index)+') no-repeat 0 0;background-size: contain;'"
        v-for="(value,index) in this.datas" :key="index">
          <span class="fieldName">{{names[index]}}</span>
          <span class="fielsValue">{{value}} {{unit[index]}}</span>
        </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  props:{
    /**
     * echarts绑定的dom的id
     */
    chartId:String,
    datas:Array,
    names:Array,
    unit:Array,
    colors:Array
  },
  methods:{
    getBgUrl(index){
      return require(`@/assets/images/线 ${index+1}.png`);
    }
  },
  mounted(){
    var chartDom = document.getElementById(this.chartId);
    var myChart = echarts.init(chartDom);
    let option = {
      color:['#15C3FF','#F9B946','#22C677'],
      tooltip: {
          formatter:'{b0}: {c0}',
          position:"right",
          backgroundColor:"rgba(0,0,0,0.7)",
          textStyle:{
            color:"#ffffff",
          }
      },
      legend: {
          show:false,
      },
      series: [
          {
              name: '访问来源',
              type: 'pie',
              radius: ['70%', '90%'],
              avoidLabelOverlap: false,
              label: {
                  show: false,
                  position: 'center'
              },
              labelLine: {
                  show: false
              },
              data: [

              ]
          }
      ]
    };
    option.series[0].data=this.datas.reduce((pre,value,index)=>{
      pre.push({value,name:this.names[index]});
      return pre;
    },[]);
    if(this.colors){
      option.color=this.colors;
    }
    myChart.setOption(option);
    window.addEventListener("resize",()=>{
      myChart.resize();
    })
  }
}
</script>

<style scoped>
  .carPie{
    width: 35%;
    height: 100%;
    display: inline-block;
  }
  .legend{
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    padding: 20px 20px;
    height: calc(100% - 20px);
    width: calc(70% - 40px);
    flex-direction: column;
    justify-content: space-between;
  }
  .legend > div{
    height: 33%;
    text-align: center;
  }
  .fieldName{
    float: left;
    margin-left: 30px;
  }
  .fieldValue{
    float: right;
  }
  .chartCenter{
    position: absolute;
    top: 0;
    left: 0;
    width: 35%;
    height: 100%;
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;

    font-size: 0.8vw;
    font-weight: 500;
    z-index: -1;
  }
</style>
