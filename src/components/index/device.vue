<template>
  <section class="device-section" v-show="isShow">
    <a-row>
      <a-col :span="12"> <span style="color:#00deff" @click="$emit('goBack')">返回 </span>| 设备信息 </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        设备名称：
      </a-col>
      <a-col :span="12">
        {{ deviceName }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        运行状态：
      </a-col>
      <a-col :span="12">
        {{ deviceStatus }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        与墙体距离：
      </a-col>
      <a-col :span="12">
        {{ distanceFromWall }}
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        当前检测值：
      </a-col>
      <a-col :span="12"> </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <div style="position: relative; width: 0%; font-size: 0.8vw; display: inline-block">
          <div id="powerLoadliquidfill"></div>
        </div>
        <div style="width: 100%; display: inline-block; position: absolute">
          <div class="infoBox">
            <div class="info">
              <span>X值</span><br />
              <triangle dirTo="down" :side-len="8" color-fill="green">{{ load.rate }}</triangle>
              <div class="number">{{ load.num }}µm</div>
            </div>
            <div class="info">
              <span>Y值</span><br />
              <triangle dirTo="up" :side-len="8" color-fill="yellow">{{ energyConsumption.rate }}</triangle>
              <div class="number">{{ energyConsumption.num }}µm</div>
            </div>
            <div class="info">
              <span>Z值</span><br />
              <triangle dirTo="up" :side-len="8" color-fill="yellow">{{ electricCharge.rate }}</triangle>
              <div class="number">{{ electricCharge.num }}µm</div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        监测数据：
      </a-col>
      <a-col :span="12">
        <a-tag color="blue" @click="exportExcel" style="float: right; cursor: pointer;">导出</a-tag>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <a-tabs v-model="activeKey" @change="changeTabs">
          <a-tab-pane key="day" tab="日">
            <div id="energyCurveDay" class="lineChart"></div>
          </a-tab-pane>
          <a-tab-pane key="week" tab="周">
            <div id="energyCurveWeek" class="lineChart"></div>
          </a-tab-pane>
          <a-tab-pane key="month" tab="月">
            <div id="energyCurveMonth" class="lineChart"></div>
          </a-tab-pane>
          <a-tab-pane key="custom" tab="自定义">
            <a-row>
              <a-col>
                <a-range-picker v-model="dateTime" :locale="locale" :placeholder="['开始时间', '结束时间']" show-time @ok="onSelect" />
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <div id="energyCurveCustom" style="width: 336px; height: 336px;"></div>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </section>
</template>

<script>
import Triangle from '../triangle.vue'
import * as echarts from 'echarts'
import moment from 'moment'
import 'moment/locale/zh-cn'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
export default {
  name: 'device.vue',
  components: {
    Triangle
  },
  data() {
    return {
      locale: locale,
      activeKey: 'day',
      powerLoad: 0.36, // 用电负荷
      load: {
        rate: '16%',
        num: Math.floor(Math.floor(Math.random() * 100))
      }, // 实时负荷
      energyConsumption: {
        rate: '16%',
        num: Math.floor(Math.floor(Math.random() * 100))
      }, // 今日能耗
      electricCharge: {
        rate: '16%',
        num: Math.floor(Math.floor(Math.random() * 100))
      }, // 今日电费
      isShow: false,
      dateTime: '',
      deviceName: '', // 设备名称
      deviceStatus: '', // 设备状态
      distanceFromWall:"",
      dayX: [],
      dayY: [],
      dayZ: [],
      weekX: [],
      weekY: [],
      weekZ: [],
      monthX: [],
      monthY: [],
      monthZ: [],
      customX: [],
      customY: [],
      customZ: [],
      dayChart: '',
      weekChart: '',
      monthChart: '',
      customChart: '',
      isChartInit: [true, false, false, false],
      option: {
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
            data: []
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
            // areaStyle: {},
            // smooth: true,
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: 'Y',
            type: 'line',
            // smooth: true,
            // areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: []
          },
          {
            name: 'Z',
            type: 'line',
            // smooth: true,
            // areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: []
          }
        ]
      }
    }
  },
  mounted() {
    this.dayChart = echarts.init(this.$el.querySelector('#energyCurveDay'))
    // const chartDom = document.getElementById('powerLoadliquidfill')
    // const myChart = echarts.init(chartDom)
    // const option = {
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
    //   myChart.resize()
    // })
  },
  methods: {
    show(obj) {
      this.deviceName = obj.deviceName
      this.deviceStatus = obj.deviceStatus
      this.distanceFromWall = obj.distanceFromWall
      this.isChartInit = [true, false, false, false]
      /* -------------------------------- 每天变化4.8 -------------------------------- */
      // this.dayX = new Array(24).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.dayX = this.getLineData(Math.floor(Math.random()*100),0.2,24)
      // this.dayY = new Array(24).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.dayY = this.getLineData(Math.floor(Math.random()*100),0.2,24)
      // this.dayZ = new Array(24).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.dayZ = this.getLineData(Math.floor(Math.random()*100),0.2,24)
      // this.weekX = new Array(7).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.weekX = this.getLineData(Math.floor(Math.random()*100),4.8,7)
      // this.weekY = new Array(7).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.weekY = this.getLineData(Math.floor(Math.random()*100),4.8,7)
      // this.weekZ = new Array(7).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.weekZ = this.getLineData(Math.floor(Math.random()*100),4.8,7)
      const date = new Date()
      // date.setMonth(date.getMonth() + 1)
      // date.setDate(0)

      // this.monthX = new Array(date.getDate()).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.monthX = this.getLineData(Math.floor(Math.random()*100),4.8,date.getDate())
      // this.monthY = new Array(date.getDate()).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.monthY = this.getLineData(Math.floor(Math.random()*100),4.8,date.getDate())
      // this.monthZ = new Array(date.getDate()).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.monthZ = this.getLineData(Math.floor(Math.random()*100),4.8,date.getDate())
      this.option.xAxis[0].data = new Array(24).fill(0).map((val, index) => index+'点')
      this.option.series[0].data = this.dayX
      this.option.series[1].data = this.dayY
      this.option.series[2].data = this.dayZ
      this.dayChart.setOption(this.option)
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    moment,
    onSelect(dates, dateStrings) {
      const startDate = dates[0]._d
      const endDate =dates[1]._d
      const day = (endDate.getTime() - startDate.getTime()) / 86400000
      this.option.xAxis[0].data = []
      let len
      if (day < 1) {
        len = endDate.getHours() - startDate.getHours() + 1
        for (let i = startDate.getHours(); i <= endDate.getHours(); i++) {
          this.option.xAxis[0].data.push(i)
        }
      } else {
        const len = Math.ceil(day)
        for (let i = 0; i < len; i++) {
          startDate.setDate(startDate.getDate() + i)
          this.option.xAxis[0].data.push(`${startDate.getMonth() + 1}月-${startDate.getDate()}日`)
        }
      }
      // this.option.series[0].date = new Array(len).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.option.series[0].date = this.getLineData(Math.floor(Math.random()*100),4.8,len)
      // this.option.series[1].date = new Array(len).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.option.series[1].date = this.getLineData(Math.floor(Math.random()*100),4.8,len)
      // this.option.series[2].date = new Array(len).fill(0).map((val) => Math.floor(Math.random() * 100))
      this.option.series[2].date = this.getLineData(Math.floor(Math.random()*100),4.8,len)
      this.customChart.setOption(this.option)
    },
    changeTabs(key) {
      switch (key) {
        case 'day':
          break
        case 'week':
          if (!this.weekChart) {
            this.$nextTick(() => {
              this.weekChart = echarts.init(this.$el.querySelector('#energyCurveWeek'))
              this.option.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
              this.option.series[0].data = this.weekX
              this.option.series[1].data = this.weekY
              this.option.series[2].data = this.weekZ
              this.weekChart.setOption(this.option)
            })
          }

          break
        case 'month':
          if (!this.monthChart) {
            this.$nextTick(() => {
              this.monthChart = echarts.init(this.$el.querySelector('#energyCurveMonth'))
              this.option.xAxis[0].data = new Array(this.monthX.length).fill(0).map((val, index) => index+1+'日')
              this.option.series[0].data = this.monthX
              this.option.series[1].data = this.monthY
              this.option.series[2].data = this.monthZ
              this.monthChart.setOption(this.option)
            })
          }
          break
        case 'custom':
          if (!this.customChart) {
            this.$nextTick(() => {
              this.customChart = echarts.init(this.$el.querySelector('#energyCurveCustom'))
            })
          }
          break
      }
    },
    exportExcel() {
      window.open('http://106.53.99.11:3000/uploads/监控数据.xls')
    },
    getLineData(start,delat,length){
      let out=Array.from(Array(length-1))
      return out.reduce((pre,value,index)=>{
        let theNext=pre[pre.length-1]+Math.floor(((Math.random()*delat*2)-delat)*10)/10;
        theNext=Number(theNext.toFixed(3))
        pre.push(theNext)
        return pre;
      },start?[start]:[Math.floor(Math.random()*10)])
    }
  }
}
</script>

<style scoped>
#powerLoadliquidfill {
  /* background: url('../../assets/images/旋转.png') no-repeat 0 0;
  background-position: center center;
  background-size: 100%; */
  width: 150px;
  height: 150px;
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
  height: 100%;
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
  top: 0;
  width: 60%;
  height: 1em;
  margin-top: calc(11.5% - 0.5em);
  font-size: 1.2vw;
  color: #00d4f3;
  text-align: center;
  font-family: Quartz-Bold;
}
</style>
