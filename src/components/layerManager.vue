<template>
  <div>
    <div v-show="display" id="layerManager" class="layerManager">
      <div class="layersBox">
        <div @click="toggleLayer" v-for="(layer, index) in layers" :key="index" :data-layerIndex="index" class="layerBg" :title="layer">
          <div :style="'background:url(' + require('@/assets/images/' + layer + '.png') + ') no-repeat;background-position: center center;background-size: cover;pointer-event:none;'"></div>
        </div>
      </div>
    </div>
    <property-modal ref="propertyModalRef"></property-modal>
    <video-player style="z-index: 3" ref="videoPlayer" videoSrc="./lukou.mp4"></video-player>
  </div>
</template>

<script>
import { Cartesian3, BillboardCollection, Viewer } from 'cesium'
import propertyModal from './index/propertyModal'
import VideoPlayer from './videoPlayer'
import DeviceStatusWindow from './DeviceStatus'
import mapInteractive from '../js/map3d/MapInteractive'

import measureTool from '../js/map3d/Measure'
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
    VideoPlayer,
    propertyModal
  },
  data() {
    return {
      //layers: ['监控设备', '物联', '点击查询', '照明', '空气质量', '空调', '门禁'],
      layers: ['监控设备', '物联', '点击查询', '楼层拆分', '距离', '面积', '清除'],
      handler: undefined,
      lastSelectedBIM: undefined
    }
  },
  computed: {
    ...mapState(['deviceState']),
    display() {
      let a = this.$route.path != '/pipeline'
      return a
    }
  },
  methods: {
    addPoints(points, image, scale) {
      let billbords = viewer.scene.primitives.add(new BillboardCollection())
      points.forEach((point) => {
        billbords.add({
          position: Cartesian3.fromDegrees(point.lng, point.lat, point.alt),
          image,
          scale
        })
      })
      billbords.show = false
    },
    toggleLayer(e) {
      /**
       * @type {Number} 当前图层的索引值
       */
      let index = e.target.parentNode.dataset.layerindex
      let ele = e.target.parentNode

      /* -------------------------------------------------------------------------- */
      /*                                   测距、侧面积                              */
      /* -------------------------------------------------------------------------- */
      if (index == '4') {
        document.documentElement.style.cursor = 'crosshair';
        measureTool.measureLineSpace(viewer)
        return
      }
      if (index == '5') {
        document.documentElement.style.cursor = 'crosshair';
        measureTool.measureAreaSpace(viewer)
        return
      }
      if (index == '6') {
        measureTool.clearAll()

        return
      }
      /* -------------------------------------------------------------------------- */
      /*                                    开关图层                                 */
      /* -------------------------------------------------------------------------- */
      if (viewer.scene.primitives.get(index)) {
        if (ele.classList.contains('active')) {
          ele.classList.remove('active')
        } else {
          ele.classList.add('active')
        }
        if (index === '0' || index === '1') {
          viewer.scene.primitives.get(index).show = ele.classList.contains('active')

          if (mapInteractive.sceneModel == 'floorsplit' && index == '1') {
            viewer.scene.primitives.get(index)._billboards.forEach((billbord) => (billbord.show = mapInteractive.floorName == billbord.id.split('_')[0]))
          } else {
            viewer.scene.primitives.get(index)._billboards.forEach((billbord) => (billbord.show = true))
          }
        }
        /* ---------------------------------lpg: 属性点查开关 --------------------------------- */
        if (index === '2') {
          if (ele.classList.contains('active')) {
            this.clickSearchFun(this)
          } else {
            this.cancleClickFun(this)
          }
        }
        /* ---------------------------------lpg: 楼层标签开关 --------------------------------- */
        if (index === '3') {
          if (ele.classList.contains('active')) {
            mapInteractive.addFloorLabel = true
          } else {
            mapInteractive.addFloorLabel = false
            mapInteractive.buildFloorSplit()
          }
        }
      }
    },
    clickSearchFun(that) {
      if (!this.handler) {
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
      }
      this.handler.setInputAction((e) => {
        let pickFeature = viewer.scene.pick(e.position)
        if (!Cesium.defined(pickFeature)) return
        // console.log(pickFeature instanceof Cesium.Cesium3DTileFeature);
        /* ---------------------------------lpg: 选中的监控点 --------------------------------- */
        if (pickFeature.collection && pickFeature.collection === viewer.scene.primitives.get(0)) {
          that.$refs.videoPlayer.showPlayer = true
          that.$refs.videoPlayer.changeSrc('./lukou.mp4')
        }
        /* ---------------------------------lpg: 选中的是设备点 -------------------------------- */
        if (pickFeature.collection && pickFeature.collection === viewer.scene.primitives.get(1)) {
          // //取消将属性信息弹出窗口，改用右边固定位置
          //this.selectedEntityChanged(e)
          //that.hideBimAttr();
          //that.changeBIMAttr({ 设备编号: pickFeature.id, 状态: that.deviceState[pickFeature.id] })
          let randomDisTance=()=>{return Math.floor(Math.random()/6*10000)/1000}
          that.changeDeviceAttr({
            deviceName: pickFeature.id,
            deviceStatus: that.deviceState[pickFeature.id],
            distanceFromWall:`东:${randomDisTance()}米,西:${randomDisTance()}米,南:${randomDisTance()}米,北:${randomDisTance()}米`,
            });
        }
        //选中的是模型数据
        if (pickFeature instanceof Cesium.Cesium3DTileFeature) {
          if (that.lastSelectedBIM) {
            that.lastSelectedBIM.color = Cesium.Color.WHITE
          }

          // that.lastSelectedBIMPreColor = pickFeature.color
          pickFeature.color = Cesium.Color.fromCssColorString('#00ffff')
          //this.selectedEntityChanged(e, false)
          //this.onSelect(pickFeature,that)
          let position=Cesium.Cartographic.fromCartesian(pickFeature.content.tile.boundingSphere.center,viewer.scene.globe.ellipsoid);
          position.longitude=Cesium.Math.toDegrees(position.longitude).toFixed(3)+"°"
          position.latitude=Cesium.Math.toDegrees(position.latitude).toFixed(3)+"°"
          position.height=position.height.toFixed(3)+'m'
          let propertys = {}
          Object.defineProperty(propertys,'hidePro',{enumerable:false,value:{}})
          //添加深圳市BIM标准结构字段映射
          let modelType = pickFeature.getProperty('类别')

          switch (modelType) {
            case '墙':
            case '幕墙竖梃':
              propertys['名称'] = '外墙'
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height

              propertys['体量'] = pickFeature.getProperty('族与类型').split(':')[1]

              propertys.hidePro['材质'] = ''
              propertys.hidePro['主要材料导热细数'] = ''
              propertys.hidePro['主要材料密度'] = ''
              propertys.hidePro['D值'] = ''
              propertys.hidePro['K值'] = ''
              propertys.hidePro['墙厚'] = ''
              break
            case '结构柱':
              propertys['名称'] = '结构柱'
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height
              propertys['材质'] = pickFeature.getProperty('族与类型').split(' ')[0]
              propertys['体量'] = pickFeature.getProperty('族与类型').split(':')[1]+"mm"
              propertys.hidePro['柱横截面长度'] = ''
              propertys.hidePro['柱横截面宽度'] = ''
              break

            case '门':

              propertys['名称'] = modelType
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')

              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height


              propertys['体量'] = pickFeature.getProperty('族与类型').split(':')[1]
              propertys.hidePro['空间名称'] = ''
              propertys.hidePro['底高度'] = ''
              propertys.hidePro['开启面积'] = ''
              propertys.hidePro['K值'] = ''
              propertys.hidePro['太阳得热系数'] = ''
              propertys.hidePro['防火性能等级'] = ''
              propertys.hidePro['生产厂家名称'] = ''
              propertys.hidePro['产品执行标准'] = ''
              propertys.hidePro['产品认证体系'] = ''
              propertys.hidePro['出厂日期'] = ''
              propertys.hidePro['出厂价格'] = ''
              break
            case '窗':
              propertys['名称'] = modelType
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')

              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height
              propertys.hidePro['空间名称'] = ''
              propertys.hidePro['底高度'] = ''
              propertys.hidePro['开启面积'] = ''
              propertys['材质'] = pickFeature.getProperty('族与类型').split(':')[1]
              break
            case '楼板':
              propertys['名称'] = modelType
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height

              propertys['体量'] = pickFeature.getProperty('族与类型').split(':')[1]
              propertys.hidePro['材质'] = pickFeature.getProperty('族与类型').split(' ')[0]
              propertys.hidePro['主要材料导热细数'] = ''
              propertys.hidePro['主要材料密度'] = ''
              propertys.hidePro['K值'] = ''
              propertys.hidePro['耐火极限'] = ''
              break
            case '幕墙嵌板':
              propertys['名称'] = '外墙'
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height
              propertys['材质'] = pickFeature.getProperty('族与类型').split(':')[1]
              propertys.hidePro['K值'] = ''
              propertys.hidePro['太阳得热系数'] = ''
              propertys.hidePro['耐火极限'] = ''
              propertys.hidePro['幕墙墙厚'] = ''
              break
            case '梯段':
            case '楼梯':
              propertys['名称'] = '楼梯'
              propertys['编码'] = pickFeature.getProperty('sid')
              propertys['建筑单体名称'] = '赛格大厦'
              propertys['所在楼层'] = pickFeature.getProperty('file')

              propertys['体量'] = pickFeature.getProperty('族与类型').split(':')[1]
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height
              propertys.hidePro['K值'] = ''
              propertys.hidePro['太阳得热系数'] = ''
              propertys.hidePro['耐火极限'] = ''
              propertys.hidePro['幕墙墙厚'] = ''
              break
            default:

              let propertyNames = pickFeature.getPropertyNames()
              for (let name of propertyNames) {
                if (name === 'id') continue
                let value = pickFeature.getProperty(name)
                if (name === 'file'){ propertys['所在楼层'] = value; continue}
                if (name === 'name'){ propertys['名称'] = value; continue}
                if (name === 'sid') {propertys['编码'] = value ;continue}
                if(value&&value!='0'){
                  propertys[name] = value
                }
              }
              propertys['基点坐标X'] = position.longitude
              propertys['基点坐标Y'] = position.latitude
              propertys['基点坐标Z'] = position.height
              break;
          }

          // //取消弹出信息框，改用固定的属性窗口
          //that.$refs.propertyModalRef.showModal(propertys)
          that.changeBIMAttr(propertys)

          that.lastSelectedBIM = pickFeature
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    //属性弹窗
    onSelect(feature, that) {
      let propertys = {}
      let propertyNames = feature.getPropertyNames()
      for (let name of propertyNames) {
        if (name === 'id') continue
        let value = feature.getProperty(name)
        propertys[name] = value ? value : ''
      }
      that.$refs.propertyModalRef.showModal(propertys)
    },
    cancleClickFun() {
      if (this.lastSelectedBIM) {
        this.lastSelectedBIM.color = Cesium.Color.WHITE
      }
      this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    //实体选中处理事件，不用了
    selectedEntityChanged(e, dStatus = true) {
      if (!e || !e.position) return
      if (this.pWindow) {
        this.pWindow.windowClose()
        this.pWindow = undefined
      }
      let info = {
        dStatus,
        dName: '沉降监测',
        dNum: '0.2mm'
      }
      let position = viewer.scene.pickPosition(e.position)
      this.pWindow = new DeviceStatusWindow(viewer, position, info)
    },
    ...mapMutations(['showAttr', 'changeBIMAttr','hideBimAttr','changeDeviceAttr'])
  },
  mounted() {},
  destroyed() {
    viewer.scene.primitives.removeAll()
  }
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
.layerManager {
  position: fixed;
  right: calc(21vw + 17px);
  top: 120px;
  width: fit-content;
  height: 60%;
  z-index: 1;
}
.layersBox {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  align-content: center;
  align-items: center;
}
.layerBg {
  width: 3vw;
  height: 3vw;
  background: url('../assets/images/园背景3.png') no-repeat;
  background-position: center center;
  background-size: cover;
}
.layerBg.active {
  background: url('../assets/images/有色背景 拷贝.png') no-repeat;
  background-size: cover;
}
</style>
