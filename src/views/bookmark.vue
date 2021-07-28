<template>
  <div>
    <!-- <left-side>
      <persion-count :owner="5839" :visitor="143" :other="22" />
      <carport :putIn="196" :putOut="28" :internalCar="100" :externalCar="50" :surplusPorts="50" />
      <device-statistics :deviceNum="2160" :badDevRate="11.6" />
      <warning-info></warning-info>
    </left-side> -->
    <right-side>
      <chart-2 title="视点书签">
        <div id="addPointBox">
          <input autocomplete="off" name="pointName" type="text" maxlength="7" />
          <button @click="addViewPoint">添加</button>
        </div>
        <div class="viewPoints">
          <div v-for="(value, index) in viewPoints" :key="index" @click="value.flyToHere()" class="viewPointBox">
            <img :src="value.img" height="114" width="100%" />
            <div class="viewPointName">{{ value.name }}<img @click.stop="removeViewPoint(index)" src="@/assets/images/delete.png" height="100%" /></div>
          </div>
        </div>
      </chart-2>
    </right-side>
  </div>
</template>

<script>
import axios from 'axios'
import Chart2 from '../components/chart2.vue'
import Carport from '../components/index/carport.vue'
import DeviceStatistics from '../components/index/deviceStatistics.vue'
import LeftSide from '../components/index/leftSide.vue'
import PersionCount from '../components/index/persionCount.vue'
import RightSide from '../components/index/rightSide.vue'
import WarningInfo from '../components/index/warningInfo.vue'

/**
 *  视点类
 * 记录了相机必要的参数
 */
class ViewPoint {
  /**
   * @param {String } name 视点的名称
   * @param {Object } option 记录相机位置、角度的对象
   * @param {Object} option.orientation 相机各个角度
   * @param {Cesium.Cartesian3 } option.destination 相机的位置
   * @param {Number } option.duration 相机飞行的时间，单位是秒
   * @param {String } img 视点的缩略图，为dataURL
   */
  constructor(name, option, img) {
    this.name = name
    this.option = option
    this.img = img
  }
  flyToHere() {
    /**@type { Cesium.Viewer }*/
    let viewer = window.viewer

    viewer.camera.flyTo(this.option)
  }
}

export default {
  components: {
    LeftSide,
    PersionCount,
    Carport,
    DeviceStatistics,
    WarningInfo,
    RightSide,
    Chart2
  },
  mounted() {
    document.querySelectorAll('.rightSide>.chartCard').forEach(ele => {
      ele.firstChild.style.height = '4%'
      ele.lastChild.style.height = '96%'
    })

    if (localStorage.viewPoints) {
      /** @type {ViewPoint} */
      let localViewPoints = JSON.parse(localStorage.viewPoints)
      localViewPoints.forEach((value, index) => {
        this.viewPoints.push(new ViewPoint(value.name, value.option, value.img))
      })
    } else {
      axios.get('./data/viewPoints.json').then(response => {
        response.data.forEach((value, index) => {
          this.viewPoints.push(new ViewPoint(value.name, value.option, value.img))
        })
      })
    }
  },
  data() {
    return {
      viewPoints: []
    }
  },
  methods: {
    addViewPoint() {
      /**@type { Cesium.Camera } */
      let camera = window.viewer.camera
      let name = document.getElementsByName('pointName')[0].value
      if (name) {
        let orientation = {
          heading: camera.heading,
          pitch: camera.pitch,
          roll: camera.roll
        }

        this.viewPoints.push(
          new ViewPoint(
            name,
            {
              destination: camera.positionWC.clone(),
              orientation,
              duration: 0.5
            },
            window.viewer.canvas.toDataURL('image/jpeg', 0.01)
          )
        )

        document.getElementsByName('pointName')[0].value = ''
      } else {
        alert('请先填写视点书签名称!!!')
      }

      localStorage.setItem('viewPoints', JSON.stringify(this.viewPoints))
    },
    removeViewPoint(i) {
      this.viewPoints = this.viewPoints.flatMap((value, index) => {
        return index == i ? [] : [value]
      })
      localStorage.setItem('viewPoints', JSON.stringify(this.viewPoints))
    }
  }
}
</script>


<style scoped>
.rightSide > .chartCard {
  height: 100%;
}
.viewPoints {
  overflow: auto;
  height: calc(100% - 50px);
}
.viewPoints::-webkit-scrollbar {
  width: 2px;
}
#addPointBox > input {
  width: calc(calc(100% -2em) - 60px);
  height: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  border: 0;
  margin: 10px 5px;
  border-radius: 3px;
  font-size: 20px;
  color: #dddddd;
  padding: 2px;
}
#addPointBox {
  height: 50px;
  position: relative;
}
#addPointBox > input:focus {
  border: 0;
  outline: none;
}
#addPointBox > button {
  height: 34px;
  background-color: #dddddd;
  border-radius: 3px;
  line-height: 34px;
  font-weight: 500;
  border: 0;
  position: absolute;
  top: 10px;
  width: calc(2em + 12px);
}
.viewPointBox {
  width: calc(50% - 12px);
  height: 114px;
  display: inline-block;
  position: relative;
  margin: 5px;
  border: rgb(161 206 241 / 60%) solid 1px;
}
.viewPointName {
  position: absolute;
  bottom: 0;
  height: 20px;
  text-align: center;
  background-color: rgb(161 206 241 / 60%);
}
.viewPointName > img {
  float: right;
  margin-right: 5px;
  vertical-align: super;
}
</style>
