
<template>
  <div>
    <div class="leftPage_">
        <div id="addPointBox">
          <input autocomplete="off" name="pointName" type="text" maxlength="7" />
          <button @click="addViewPoint">添加</button>
          <button @click="exportData">导出</button>
        </div>
        <div class="viewPoints">
          <div v-for="(value, index) in viewPoints" :key="index" @click="value.flyToHere()" class="viewPointBox">
            <img :src="value.img" height="114" width="100%" />
            <div class="viewPointName">{{ value.name }}<img @click.stop="removeViewPoint(index)" src="@/assets/images/delete.png" height="100%" /></div>
          </div>
        </div>

    </div>
    <right-side>
      <div class="drawBox">
        <div style="height: fit-content">
          <img src="@/assets/images/labels/shu.png" /> 标绘<br />
          <hr style="border: dashed 1px" />
        </div>
        <div class="drawTypes">
          <img @click="changeType" v-for="(img, i) in images" :key="i" data-selected="false" :data-index="i" :src="img" />
        </div>
        <div name="point" v-show="currentType == 1" class="drawOptions">
          <div class="imgBox">
            <img @click="changeStyle" v-for="(img, index) in pointTypes" :src="img" :key="index" />
          </div>
          <div style="height: fit-content"><label for="title">标题：</label><input type="text" name="title" maxlength="5" /></div>
          <!-- <div class="harfWidth"><label for="fontSize">字号：</label><input value="15" type="text" name="fontSize" maxlength="5" /></div> -->
          <div class="harfWidth"><label for="color">颜色：</label><input value="#ffffff" type="color" name="color" /></div>
          <div class="harfWidth"><label for="scale">比例：</label><input value="1" type="text" name="scale" maxlength="5" /></div>
          <!-- <div class="harfWidth"><label for="scale">可见高：</label><input value="1" type="text" name="scale" maxlength="5" /></div> -->
        </div>
        <div name="line" v-show="currentType == 2" class="drawOptions">
          <div class="imgBox">
            <img @click="changeStyle" v-for="(type, index) in lineTypes" :data-type="type.name" :src="type.img" :key="index" />
          </div>
          <div style="height: fit-content"><label for="title">标题：</label><input type="text" name="title" maxlength="5" /></div>
          <div class="harfWidth"><label for="width">粗细：</label><input value="1.5" type="text" name="width" maxlength="5" /></div>
          <div class="harfWidth"><label for="color">颜色：</label><input value="#ff0000" type="color" name="color" /></div>
        </div>
        <div name="polygon" v-show="currentType == 3" class="drawOptions">
          <div class="imgBox">
            <img @click="changeStyle($event, 3, index)" v-for="(img, index) in polygonTypes" :src="img" :key="index" />
          </div>
          <div style="height: fit-content"><label for="title">标题：</label><input type="text" name="title" maxlength="5" /></div>
          <div class="harfWidth"><label for="fillColor">填充色：</label><input value="#ff0000" type="color" name="fillColor" /></div>
          <div class="harfWidth"><label for="edgeColor">描边色：</label><input value="#ff0000" type="color" name="edgeColor" /></div>
          <div class="harfWidth"><label for="width">粗细：</label><input value="1.5" type="text" name="width" maxlength="5" /></div>
          <div class="harfWidth"><label for="Opacity">透明度：</label><input value="0.3" type="text" name="Opacity" maxlength="5" /></div>
        </div>
        <div name="model" v-show="currentType == 4" class="drawOptions">
          <div class="imgBox"></div>
          <div style="height: fit-content"><label for="title">标题：</label><input type="text" name="title" maxlength="5" /></div>
          <div class="harfWidth"><label for="Opacity">透明度：</label><input value="15%" type="text" name="Opacity" maxlength="5" /></div>
        </div>
      </div>
      <div class="layersBox">
        <div style="height: fit-content">
          <img src="@/assets/images/labels/shu.png" /> 我的图层<br />
          <hr style="border: dashed 1px" />
        </div>
        <div @click="toggle($event, 'showPoint')" id="pointLayer" class="layerTitle">
          <img src="@/assets/images/labels/文件夹2.png" />
          定点标注
          <span
            >{{ points.length }}
            <!--  <img src="@/assets/images/labels/展开.png" /> -->
          </span>
        </div>

        <div v-show="showPoint" style="width: 100%; height: fit-content">
          <div v-for="(point, index) in points" :key="index" class="layer">
            <img src="@/assets/images/labels/定点标注.png" />
            {{ point.id }}
            <span><img @click="removePoint(index)" src="@/assets/images/labels/关闭.png"/></span>
          </div>
        </div>

        <div @click="toggle($event, 'showLine')" id="lineLayer" class="layerTitle">
          <img src="@/assets/images/labels/文件夹2.png" />
          线条标注
          <span
            >{{ lines.length }}
            <!--  <img src="@/assets/images/labels/展开.png" /> -->
          </span>
        </div>
        <div v-show="showLine" style="width: 100%; height: fit-content">
          <div v-for="(line, index) in lines" :key="index" class="layer">
            <img src="@/assets/images/labels/线条标注.png" />
            {{ line.name }}
            <span><img @click="removeEntity(line.entity)" src="@/assets/images/labels/关闭.png"/></span>
          </div>
        </div>

        <div @click="toggle($event, 'showPolygon')" id="polygonLayer" class="layerTitle">
          <img src="@/assets/images/labels/文件夹2.png" />
          面积标注
          <span
            >{{ polygons.length
            }}<!--   <img src="@/assets/images/labels/展开.png" /> -->
          </span>
        </div>
        <div v-show="showPolygon" style="width: 100%; height: fit-content">
          <div v-for="(polygon, index) in polygons" :key="index" class="layer">
            <img src="@/assets/images/labels/区域标注.png" />
            {{ polygon.name }}
            <span><img @click="removeEntity(polygon.entity)" src="@/assets/images/labels/关闭.png"/></span>
          </div>
        </div>
      </div>
    </right-side>
  </div>
</template>

<script>
import Cesium, { BillboardCollection, Color, PolylineCollection, Scene, ScreenSpaceEventHandler, ScreenSpaceEventType, VerticalOrigin, Viewer } from 'cesium'
import Chart2 from '../components/chart2.vue'
import rightSide from '../components/index/rightSide.vue'
import TabsPage from '../components/tabsPage.vue'
import { color } from 'echarts'
import geodrawminix from '../js/minixs/GeometryDraw.js'
import LeftSide from '../components/index/leftSide.vue'
import axios from 'axios'

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
  components: { rightSide, TabsPage, Chart2, LeftSide },
  mixins: [geodrawminix],
  data() {
    return {
      images: [
        require('@/assets/images/labels/选择.png'),
        require('@/assets/images/labels/定点标注.png'),
        require('@/assets/images/labels/线条标注.png'),
        require('@/assets/images/labels/区域标注.png'),
        require('@/assets/images/labels/模型.png')
      ],
      imagesSelected: [
        require('@/assets/images/labels/选择2.png'),
        require('@/assets/images/labels/定点标注2.png'),
        require('@/assets/images/labels/线条标注2.png'),
        require('@/assets/images/labels/区域标注2.png'),
        require('@/assets/images/labels/模型2.png')
      ],
      pointTypes: [
        require('@/assets/images/labels/绿点.png'),
        require('@/assets/images/labels/蓝点.png'),
        require('@/assets/images/labels/拉开.png'),
        require('@/assets/images/labels/推开.png'),
        require('@/assets/images/labels/绿旗.png'),
        require('@/assets/images/labels/灭火设备.png')
      ],
      lineTypes: [
        { name: 'solid', img: require('@/assets/images/labels/白实线.png') },
        { name: 'dash', img: require('@/assets/images/labels/白虚线.png') }
      ],
      polygonTypes: [
        require('@/assets/images/labels/粗边填充.png'),
        require('@/assets/images/labels/集结地.png'),
        require('@/assets/images/labels/钳击.png'),
        require('@/assets/images/labels/圆.png')
      ],
      currentType: 1,
      drawTypes: ['平移', '添加定点', '添加线条', '添加面积', '添加模型'],
      showPoint: true,
      showLine: true,
      showPolygon: true,
      billboards: null,
      models: null,
      eventHandler: null,
      viewPoints: []
    }
  },
  computed: {
    points() {
      if (!this.billboards) {
        return []
      }
      return this.billboards._billboards.map((billboard, index) => {
        return { index, id: billboard.id }
      })
    },
    lines() {
      /**@type{Cesium.Viewer} */
      let viewer = window.viewer
      return viewer.entities.values
        .filter((entity, index) => {
          return entity.polyline
        })
        .map((polyline, index) => {
          return { name: polyline.name, entity: polyline }
        })
    },
    polygons() {
      /**@type{Cesium.Viewer} */
      let viewer = window.viewer
      return viewer.entities.values
        .filter((entity, index) => {
          return entity.polygon
        })
        .map((polygon, index) => {
          return { name: polygon.name, entity: polygon }
        })
    }
  },

  mounted() {

    this.initDrawTool()
    this.initPlot()

    document.querySelectorAll('.leftSide>.chartCard').forEach(ele => {
      ele.firstChild.style.height = '7%'
      ele.lastChild.style.height = '93%'
    })

    this.billboards = window.viewer.scene.primitives.add(new BillboardCollection())

    this.eventHandler = new ScreenSpaceEventHandler(viewer.canvas)

    //document.querySelector('.drawTypes').firstChild.click()
    // document.querySelectorAll('.imgBox').forEach((ele, index) => {
    //   ele.firstChild.click()
    // })



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
  destroyed() {
    this.clearDraw()
    this.billboards.destroy()
  },
  methods: {
    changeType(event) {
      /**@type {Element} */
      let ele = event.target
      let index = Number(event.target.dataset.index)

      /**@type {ScreenSpaceEventHandler}*/
      let handler = this.eventHandler
      /** @type {Cesium.Viewer} */
      let viewer = window.viewer

      ele.parentElement.children.forEach((ele, i) => {
        ele.setAttribute('src', this.images[i])
      })
      ele.setAttribute('src', this.imagesSelected[index])
      if (index > 0) {
        this.currentType = index
        switch (index) {
          case 1:
            handler.setInputAction(e => {
              this.billboards.add({
                verticalOrigin: VerticalOrigin.BOTTOM,
                position: viewer.scene.globe.pickWorldCoordinates(viewer.camera.getPickRay(e.position), viewer.scene),
                scale: Number(document.querySelector('[name=point] [name=scale]').value),
                image: document.querySelector('[name="point"] .imgBox .selected').src,
                color: Color.fromCssColorString(document.querySelector('[name=point] [name=color]').value),
                id: document.querySelector('[name=point] [name=title]').value
              })
            }, ScreenSpaceEventType.LEFT_CLICK)
            break
          case 2:
            handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
            let Cesium = window.Cesium
            this.drawActivate('Polyline', {
              name: document.querySelector('[name=line] [name=title]').value,
              polyline: {
                width: document.querySelector('[name=line] [name=width]').value,
                material: new Cesium.PolylineDashMaterialProperty({
                  color: Cesium.Color.fromCssColorString(document.querySelector('[name=line] [name=color]').value)
                }),
                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
                  color: Cesium.Color.fromCssColorString(document.querySelector('[name=line] [name=color]').value)
                })
              }
            })
            break
          case 3:
            // handler.setInputAction((e)=>{
            //   console.log(333);
            //   },ScreenSpaceEventType.LEFT_CLICK)
            handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
            //this.drawActivate('Polygon')
            break
          default:
            break
        }
      } else {
        handler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
      }
    },
    changeStyle(event, drawType, index) {
      /**@type {Element} */
      let ele = event.target

      ele.parentElement.children.forEach((ele, i) => {
        ele.classList.remove('selected')
      })
      ele.classList.add('selected')

      console.log(drawType + '^^^^')
      if (drawType === 3) {
        switch (index) {
          case 0:
            this.drawActivate('Polygon')
            break
          case 1:
            this.activateMiliDraw('gatheringplace')
            break
          case 2:
            this.activateMiliDraw('doublearrow')
            break
          case 3:
            this.activateMiliDraw('circle')
          default:
            break
        }
      }
    },
    toggle(e, name) {
      this[name] = !this[name]
      if (this[name]) {
        // temp1.lastElementChild.lastElementChild.src=
        // console.log(e.target);
      }
    },
    removePoint(index) {
      this.billboards.remove(this.billboards.get(index))
    },
    removeEntity(entity) {
      /**@type {Cesium.Viewer} */
      let viewer = window.viewer
      viewer.entities.remove(entity)
    },
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
    },
    exportData(){

    }
  }
}
</script>

<style scoped>
.leftPage_{
position:fixed;
height: 90%;
top:5%;
width: 250px;
background-color:rgba(0 0 0 / 83%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.drawBox {
  margin: 10px;
  padding: 10px;
  width: calc(100% - 20px);
  height: calc(40% - 22px);
  border: #00deff33 1px solid;
  color: #fff;
}
.drawTypes {
  height: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 5px;
}
.drawTypes > img {
  margin: 5px;
  width: fit-content;
  height: fit-content;
}
.drawOptions {
  position: relative;
  /* height: 90%; */
}
.imgBox {
  height: 150px;
  border: solid 1px #16304c;
  overflow: auto;
}
.imgBox::-webkit-scrollbar {
  width: 2px;
}
.imgBox > img {
  padding: 5px;
}
.imgBox > img.selected {
  box-shadow: inset #16304c 0 0 14px 8px;
}
input {
  padding: 5px;
  margin: 5px;
  background-color: transparent;
  color: #fff;
  border: 1px solid rgb(165, 165, 165);
  width: calc(100% - 90px);
}
.harfWidth {
  display: inline-block;
  width: 50%;
  height: fit-content;
}
input[type='color'] {
  padding: 0;
}
input:focus {
  outline: 0;
}
.layersBox {
  margin: 10px;
  padding: 0 10px;
  width: calc(100% - 20px);
  height: calc(60% - 35px);
  border: #00deff33 1px solid;
  overflow: auto;
  color: #fff;
}
.layersBox::-webkit-scrollbar {
  width: 2px;
}
.layerTitle {
  height: fit-content;
  padding: 2px;
}

.layerTitle > span,
.layer > span {
  float: right;
  color: #00deff;
}
.layer {
  height: fit-content;
  padding: 2px;
  width: 90%;
  margin: 0 auto;
  vertical-align: super;
  color: #ffffff99;
}

.emergencyEvents{
  height: 1.5em;
  margin: 0.5em;

}
.emergencyEvents > img {
  height: 100%;
  margin-right: 10px;
}
.plan {
  margin: 5px 10px;
  height: fit-content;
}
.plan > img {
  vertical-align: sub;
  height: 18px;
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
  /* position: absolute; */
  top: 10px;
  width: calc(1em + 6px);
}
.viewPointBox {
  width: calc(100% - 12px);
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
  width: 100%;
  text-align: center;
  background-color: rgb(161 206 241 / 60%);
}
.viewPointName > img {
  float: right;
  margin-right: 5px;
  vertical-align: super;
}
</style>
