<template>
  <div>
    <div id="cesiumContainer"></div>
    <video-player style="z-index: 3" ref="videoPlayer" videoSrc="./lukou.mp4"></video-player>
    <property-modal ref="propertyModalRef"></property-modal>
  </div>
</template>

<script>
import { BillboardCollection, Rectangle, VerticalOrigin } from 'cesium'
import mapInteractive from '../../js/map3d/MapInteractive.js'
import Cartesian3 from 'cesium/Source/Core/Cartesian3'
import VideoPlayer from '../../components/videoPlayer.vue'
import DeviceStatusWindow from '../../components/DeviceStatus'
import propertyModal from '../index/propertyModal'

import CesiumNavigation from "cesium-navigation-es6";

// require('@dvgis/cesium-map')

export default {
  name: 'CesiumContainer',
  components: {
    VideoPlayer,
    propertyModal
  },
  data() {
    return {
      viewer: null,
      tileSets: [],
      lastSelectedBIM: null,
      lastSelectedBIMPreColor: null,
      selectedColor: Cesium.Color.fromCssColorString('#00ffff')
    }
  },
  mounted() {
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MTNhZmQzNi1lZmY2LTQxMDMtOTcxOC1kYzI1ZjQ3MzU0MjQiLCJpZCI6MjA5ODYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1Nzg2NDgxNDZ9.MHadzfj_2N2A1k8Vps9NM5qxquHsUXXXsKAtS8J8apA"
    /* eslint no-new: */
    this.viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      fullscreenButton: false,
      homeButton: false,
      infoBox: false,
      sceneModePicker: false,
      timeline: false,
      navigationHelpButton: false,
      navigation: true,
      navigationInstructionsInitiallyVisible: false,
      selectionIndicator: false,
      geocoder: false,
      baseLayerPicker: false,
      //解决不能截图
      contextOptions: {
        webgl: {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          //通过canvas.toDataURL()实现截图需要将该项设置为true
          preserveDrawingBuffer: true,
          failIfMajorPerformanceCaveat: true
        }
      }
    })
    this.viewer._cesiumWidget._creditContainer.style.display = 'none'
    //是否开启抗锯齿
    this.viewer.scene.fxaa = true
    this.viewer.scene.postProcessStages.fxaa.enabled = true

    this.viewer.scene.globe.depthTestAgainstTerrain = true

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(113.92528139090503, 22.54239577679465, 2500.0)
    })
    window.viewer = this.viewer
    this.viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#006589')
    window.measureing = false; //临时添加，用于隐藏一个bug

    viewer.clock.currentTime.secondsOfDay = 50113.492

    //测试百度地图偏移加载
    let options = {
      style: 'midnight', // style: img、vec、normal、dark
      crs: 'WGS84' // 使用84坐标系，默认为：BD09
    }
    this.viewer.imageryLayers.addImageryProvider(new Cesium.BaiduImageryProvider(options));

    let compassOptions = {};
    // 用于启用或禁用罗盘。true是启用罗盘，false是禁用罗盘。默认值为true。如果将选项设置为false，则罗盘将不会添加到地图中。
    compassOptions.enableCompass = true;
    // 用于启用或禁用缩放控件。true是启用，false是禁用。默认值为true。如果将选项设置为false，则缩放控件将不会添加到地图中。
    compassOptions.enableZoomControls = false;
    // 用于启用或禁用距离图例。true是启用，false是禁用。默认值为true。如果将选项设置为false，距离图例将不会添加到地图中。
    compassOptions.enableDistanceLegend = false;
    // 用于启用或禁用指南针外环。true是启用，false是禁用。默认值为true。如果将选项设置为false，则该环将可见但无效。
    compassOptions.enableCompassOuterRing = false;
    CesiumNavigation(this.viewer, compassOptions);

    let that = this
    window.points = []
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

    //#region 添加一些图层
    let points1 =
      '[{"lat":22.543698080687236,"lng":114.08186344363665,"alt":-0.7535671454529921},{"lat":22.543821877567233,"lng":114.08191263507781,"alt":-1.032071323984179},{"lat":22.544030910218478,"lng":114.08164518513969,"alt":-1.2981558072764967},{"lat":22.54402813631396,"lng":114.08173811183741,"alt":-1.6532498582901138},{"lat":22.54397187336396,"lng":114.08189572880462,"alt":-0.4581379100108598},{"lat":22.544094110462478,"lng":114.08205317715787,"alt":-1.5815425580654277},{"lat":22.543836512173325,"lng":114.08194199371715,"alt":-0.7203726469086806}]'
    points1 = JSON.parse(points1)
    this.addPoints(points1, './img/1.png', 0.3)

    // let points2 =
    //   '[{"lat":22.544188684470623,"lng":114.08196398074755,"alt":291.57170318939404,"name":"B4_001"},{"lat":22.544053617542254,"lng":114.08183266674486,"alt":291.5760454943162,"name":"B4_002"},{"lat":22.543945662144434,"lng":114.08183809075953,"alt":291.57762624308174,"name":"B4_003"},{"lat":22.543816862497835,"lng":114.08196760984961,"alt":291.87727670343196,"name":"B4_004"},{"lat":22.543816843832772,"lng":114.08207730924356,"alt":291.8526538547324},{"lat":22.543947888752044,"lng":114.08222098510281,"alt":291.5708714466758},{"lat":22.54403187632333,"lng":114.08222056358089,"alt":291.5696829759717}]'
    // points2 = JSON.parse(points2)
    // this.addPoints(points2, './img/6.png', 0.2)

    let points2 = `[
{"lat":22.54355037,"lng":114.0821891,"alt":-16.50419153,"name":"B4_001"},
{"lat":22.54429261,"lng":114.081878,"alt":-16.50443595,"name":"B4_002"},
{"lat":22.54365998,"lng":114.0818145,"alt":-16.50431939,"name":"B4_003"},
{"lat":22.54396178,"lng":114.0816257,"alt":-16.50445867,"name":"B4_004"},
{"lat":22.54429968,"lng":114.0818611,"alt":-0.010190593,"name":"F1_001"},
{"lat":22.5440821,"lng":114.0822779,"alt":-0.009922505,"name":"F1_002"},
{"lat":22.54373213,"lng":114.0819127,"alt":1.104336462,"name":"F1_003"},
{"lat":22.54386122,"lng":114.0815266,"alt":0.625413993,"name":"F1_004"},
{"lat":22.54388595,"lng":114.0822109,"alt":49.59794996,"name":"F11_001"},
{"lat":22.54359785,"lng":114.0819514,"alt":49.59771937,"name":"F11_002"},
{"lat":22.54389035,"lng":114.0817875,"alt":49.59781011,"name":"F11_003"},
{"lat":22.54413777,"lng":114.0818505,"alt":51.84784503,"name":"F11_004"},
{"lat":22.54392121,"lng":114.0821413,"alt":88.46628945,"name":"F19_001"},
{"lat":22.54386208,"lng":114.0818753,"alt":86.81434076,"name":"F19_002"},
{"lat":22.5440742,"lng":114.0819025,"alt":87.7111381,"name":"F19_003"},
{"lat":22.54413629,"lng":114.0820027,"alt":87.66117925,"name":"F19_004"},
{"lat":22.5439209,"lng":114.0821417,"alt":116.9864411,"name":"F27_001"},
{"lat":22.54386313,"lng":114.0818762,"alt":117.1376113,"name":"F27_002"},
{"lat":22.54402579,"lng":114.0819542,"alt":116.8078539,"name":"F27_003"},
{"lat":22.54410412,"lng":114.0820385,"alt":118.1896871,"name":"F27_004"},
{"lat":22.5439219,"lng":114.0821408,"alt":142.1820128,"name":"F34_001"},
{"lat":22.54386763,"lng":114.0818773,"alt":138.5644115,"name":"F34_002"},
{"lat":22.54407312,"lng":114.0819014,"alt":144.9959992,"name":"F34_003"},
{"lat":22.54412031,"lng":114.0820191,"alt":143.5127659,"name":"F34_004"},
{"lat":22.54392498,"lng":114.0821394,"alt":174.119818,"name":"F42_001"},
{"lat":22.54386833,"lng":114.0818772,"alt":173.8429471,"name":"F42_002"},
{"lat":22.54407391,"lng":114.0819024,"alt":173.3975389,"name":"F42_003"},
{"lat":22.544121,"lng":114.0820203,"alt":173.2996843,"name":"F42_004"},
{"lat":22.54392437,"lng":114.0821395,"alt":199.0783852,"name":"F49_001"},
{"lat":22.54386862,"lng":114.0818784,"alt":197.6952848,"name":"F49_002"},
{"lat":22.54407459,"lng":114.0819029,"alt":201.6250438,"name":"F49_003"},
{"lat":22.54412016,"lng":114.0820188,"alt":200.6130536,"name":"F49_004"},
{"lat":22.543911,"lng":114.0821323,"alt":225.2932297,"name":"F55_001"},
{"lat":22.5438674,"lng":114.0818613,"alt":225.2932028,"name":"F55_002"},
{"lat":22.54406469,"lng":114.0819211,"alt":225.2928453,"name":"F55_003"},
{"lat":22.5441161,"lng":114.0820104,"alt":225.292776,"name":"F55_004"},
{"lat":22.54392344,"lng":114.082142,"alt":290.1230058,"name":"F71_001"},
{"lat":22.54386343,"lng":114.0818741,"alt":291.0185247,"name":"F71_002"},
{"lat":22.54407417,"lng":114.0819024,"alt":289.8812928,"name":"F71_003"},
{"lat":22.54412149,"lng":114.0820144,"alt":289.7930819,"name":"F71_004"},
{"lat":22.54412167,"lng":114.0821433,"alt":305.3602274,"name":"桅杆_001"},
{"lat":22.54412221,"lng":114.0821426,"alt":320.0339929,"name":"桅杆_002"},
{"lat":22.54417959,"lng":114.0820825,"alt":319.9004652,"name":"桅杆_003"},
{"lat":22.5441207,"lng":114.0821442,"alt":337.2835175,"name":"桅杆_004"}
]`
    points2 = JSON.parse(points2)
    this.addPoints(points2, './img/6.png', 0.2)

    let points3 =
      '[{"lat":22.544466280970425,"lng":113.92813165715899,"alt":-0.008099479324190511},{"lat":22.543650318001344,"lng":113.93502627838566,"alt":-0.010063065160914686},{"lat":22.543493233321904,"lng":113.9366605329713,"alt":-0.013059530755215699},{"lat":22.536374360643517,"lng":113.94747687691377,"alt":-0.00836429601408433},{"lat":22.533130113316247,"lng":113.94401279557175,"alt":-0.0098336067525416},{"lat":22.533182484041664,"lng":113.94646301382289,"alt":-0.008192735906259936},{"lat":22.53320865489836,"lng":113.94865975244076,"alt":-0.010338691091196455},{"lat":22.532135979902375,"lng":113.9487160742122,"alt":-0.0031619983318087394},{"lat":22.531978989037032,"lng":113.94618139601042,"alt":-0.009836983304484098},{"lat":22.53192661555745,"lng":113.94390017561753,"alt":-0.010233150909162374},{"lat":22.530461488044292,"lng":113.9439002155675,"alt":-0.009714485595271546},{"lat":22.530612564971563,"lng":113.94863800516168,"alt":-0.012843203952984435},{"lat":22.52833632055851,"lng":113.93470201377433,"alt":-0.017381190540338952},{"lat":22.529513666812477,"lng":113.940023442455,"alt":-0.015394036089997561}]'
    points3 = JSON.parse(points3)
    this.addPoints(points3, './img/3.png', 1)

    let point4 =
      '[{"lat":22.54035671794959,"lng":113.94165514631615,"alt":-0.007716859001099126},{"lat":22.54022753850554,"lng":113.94622048705398,"alt":-0.013962554616167796},{"lat":22.54010371754462,"lng":113.94993845986598,"alt":-0.01222960467587024},{"lat":22.539785653351796,"lng":113.95257194437241,"alt":-0.009148469339873242},{"lat":22.535676649036517,"lng":113.94939634760892,"alt":-0.0118841639609178},{"lat":22.53190264562796,"lng":113.9485052152038,"alt":-0.006582298480342881},{"lat":22.53368749544029,"lng":113.9488798442733,"alt":-0.00512628441184615},{"lat":22.533572955929717,"lng":113.94260621325873,"alt":-0.010950795862513756},{"lat":22.53680491197232,"lng":113.94189007738352,"alt":-0.009741215580190634},{"lat":22.53922497663566,"lng":113.94083409314695,"alt":-0.00593755193508858},{"lat":22.537718778739848,"lng":113.93498103421315,"alt":-0.017072981466977503},{"lat":22.538630343808297,"lng":113.93019330741367,"alt":-0.00860138136988162},{"lat":22.531497315816633,"lng":113.93210261845925,"alt":-0.0011554607142929996},{"lat":22.526302876392347,"lng":113.93198286325018,"alt":-0.015122628706041783},{"lat":22.527649431387744,"lng":113.95639381045929,"alt":-0.013103673874285026},{"lat":22.535034370182444,"lng":113.95561181736328,"alt":-0.007626729462917618},{"lat":22.540138605888245,"lng":113.95583319623063,"alt":-0.016154116739276584}]'
    point4 = JSON.parse(point4)
    this.addPoints(point4, './img/7.png', 0.2)

    let point5 =
      '[{"lat":22.53859164441585,"lng":113.93230224251047,"alt":-0.01724440466749111},{"lat":22.537621070078874,"lng":113.93998081462705,"alt":-0.017437131959188036},{"lat":22.53812720802337,"lng":113.95270269551983,"alt":-0.011426323073781093},{"lat":22.533146630439905,"lng":113.95533746080235,"alt":-0.010295102455627588},{"lat":22.527702086358627,"lng":113.95411021446756,"alt":-0.016800437159372315},{"lat":22.533737891590885,"lng":113.95002162105824,"alt":-0.011339009812196646},{"lat":22.533864740298753,"lng":113.93929932944553,"alt":-0.00941404884335354},{"lat":22.52901082555221,"lng":113.93212112295154,"alt":-0.01450439259050289},{"lat":22.53627016476178,"lng":113.92980344630571,"alt":-0.010546670866281088}]'
    point5 = JSON.parse(point5)
    this.addPoints(point5, './img/5.png', 1)

    let point6 =
      '[{"lat":22.53923699768558,"lng":113.94422561664696,"alt":-0.012977490065814865},{"lat":22.5385648928986,"lng":113.93684623303388,"alt":-0.010782655542090062},{"lat":22.54100806504195,"lng":113.93508961634653,"alt":-0.011042154539425208},{"lat":22.530974649062767,"lng":113.93332701746162,"alt":-0.006896813488607614},{"lat":22.527053341968994,"lng":113.94184587067855,"alt":-0.011990176651341498},{"lat":22.528044821121433,"lng":113.94643242136478,"alt":-0.0161133578035631},{"lat":22.52873638630586,"lng":113.95316978301017,"alt":-0.012099312928478021},{"lat":22.532059885820324,"lng":113.95247937426441,"alt":-0.008663790081003058},{"lat":22.53308067718976,"lng":113.94542799664231,"alt":-0.009279914955797958},{"lat":22.539435362889346,"lng":113.94808159492045,"alt":-0.008516635141086148},{"lat":22.54062451702165,"lng":113.9573232520317,"alt":-0.012143684892868817},{"lat":22.536057381899266,"lng":113.95575271788395,"alt":-0.013374509977208626}]'
    point6 = JSON.parse(point6)
    this.addPoints(point6, './img/6.png', 0.2)

    let point7 =
      '[{"lat":22.53521895746196,"lng":113.93822112771522,"alt":-0.010667284939358637},{"lat":22.528899197224913,"lng":113.93703485748114,"alt":-0.00779946610006571},{"lat":22.524067787086718,"lng":113.94102766155956,"alt":-0.015244032537626876},{"lat":22.528716078705354,"lng":113.95057774694068,"alt":-0.014428857068673166},{"lat":22.533463973491056,"lng":113.95806326729532,"alt":-0.008877886356074106}]'
    point7 = JSON.parse(point7)
    this.addPoints(point7, './img/4.png', 0.2)
    //#endregion

    mapInteractive.loadOutdoorModel()

    //mapInteractive.loadAroundBox()
    //mapInteractive.loadRouteLine()
    //mapInteractive.toBuildInfoFun = this.toBuildInfo;
    //mapInteractive.toHomeFun = this.toHome;

    //加载一个整体模型
    // let tileset = viewer.scene.primitives.add(
    //   new Cesium.Cesium3DTileset({
    //     //url: './data/out/tileset.json',//原始处理
    //     url: 'https://xdata-1251202940.cos.ap-guangzhou.myqcloud.com/3dtiles/sgbd/sgbd/tileset.json', //扩大切片，压缩顶点---效果并不明显
    //     //classificationType: Cesium.ClassificationType.BOTH,
    //     //shadows:Cesium.ShadowMode.DISABLED
    //     modelMatrix: Cesium.Matrix4.fromArray([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0, 0, 0, 1.0]),
    //     maximumMemoryUsage: 3000
    //   })
    // )

    // mapInteractive.loadIndoorModel()
    //mapInteractive.loadOutdoorModel();

    // handler.setInputAction((e) => {
    //   let pickFeature = viewer.scene.pick(e.position)
    //   if (!Cesium.defined(pickFeature)) return
    //   console.log(pickFeature)
    //   // console.log(pickFeature instanceof Cesium.Cesium3DTileFeature);

    //   debugger
    //   if (pickFeature.collection && pickFeature.collection === this.viewer.scene.primitives.get(0)) {
    //     that.$refs.videoPlayer.showPlayer = true

    //     that.$refs.videoPlayer.changeSrc('./lukou.mp4')
    //   }
    //   if (pickFeature.collection && pickFeature.collection === this.viewer.scene.primitives.get(1)) {
    //     this.selectedEntityChanged(e)
    //   }
    //   //选中的是模型数据
    //   if (pickFeature instanceof Cesium.Cesium3DTileFeature) {
    //     if (that.lastSelectedBIM) {
    //       that.lastSelectedBIM.color = that.lastSelectedBIMPreColor
    //     }
    //     that.lastSelectedBIMPreColor = pickFeature.color
    //     pickFeature.color = that.selectedColor
    //     //this.selectedEntityChanged(e, false)
    //     this.onSelect(pickFeature)
    //     that.lastSelectedBIM = pickFeature
    //   }
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

    // //双击进入楼层查看
    // function seeFloor(e) {
    //   console.log(mapInteractive.floorConfigs)
    //   that.viewer.scene.globe.show = false
    //   that.viewer.scene.skyBox.show = false
    //   tileset.show = false
    //   mapInteractive.buildFloorSplit('B1')
    //   let pickFeature = viewer.scene.pick(e.position)
    //   handler.setInputAction(that.watchFloor, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // }
    // handler.setInputAction(seeFloor, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    // //右击退出楼层查看
    // handler.setInputAction(() => {
    //   if (that.lastSelectedBIM) that.lastSelectedBIM.color = this.lastSelectedBIMPreColor
    //   if (!that.viewer.scene.globe.show) {
    //     that.viewer.scene.globe.show = true
    //     that.viewer.scene.skyBox.show = true
    //     tileset.show = true
    //     handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    //     handler.setInputAction(seeFloor, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    //     mapInteractive.buildFloorSplit('F72')
    //     that.tileSets.forEach((tileSet) => {
    //       tileSet.show = true
    //     })
    //   }
    // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

    // handler.setInputAction(function (event) {
    //   // var pickedPosition = viewer.scene.pickPosition(event.position)

    //   var ellipsoid = viewer.scene.globe.ellipsoid

    //   //var cartesian3 = that.viewer.scene.globe.pickWorldCoordinates(viewer.camera.getPickRay(event.position), viewer.scene)
    //   var cartesian3 = that.viewer.scene.pickPosition(event.position)
    //   var cartographic = ellipsoid.cartesianToCartographic(cartesian3)
    //   var lat = Cesium.Math.toDegrees(cartographic.latitude)
    //   var lng = Cesium.Math.toDegrees(cartographic.longitude)
    //   var alt = cartographic.height
    //   window.points.push({ lat, lng, alt })
    //   console.log(lat, lng, alt)
    // }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  },
  methods: {
    addPoints(points, image, scale) {
      let billbords = viewer.scene.primitives.add(new BillboardCollection())
      points.forEach((point) => {
        billbords.add({
          id: point.name || '图层点',
          position: Cartesian3.fromDegrees(point.lng, point.lat, point.alt),
          image,
          scale,
          verticalOrigin: VerticalOrigin.BOTTOM,
          //distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 300.0)
        })
      })
      billbords.show = false
    },
    addGLB(position, url) {
      var entity = (viewer.trackedEntity = viewer.entities.add({
        name: url,
        position: position,
        model: {
          uri: url
        }
      }))
      return entity
    },
    addTileSet(url) {
      let tileSet = viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
          url, //小场景切片，适当调整切片大小，加载效率更高
          //url: './data/in/tileset.json',
          modelMatrix: Cesium.Matrix4.fromArray([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, -80, 1.0])
        })
      )
      this.tileSets.push(tileSet)
      return tileSet
    },
    watchFloor(e) {
      let pickFeature = viewer.scene.pick(e.position)
      if (!Cesium.defined(pickFeature)) return

      let floorName = pickFeature.getProperty('file')

      mapInteractive.buildFloorSplit(floorName)
    },

    //路由跳转
    toBuildInfo() {
      this.$router.push({ name: 'pipeline' })
    },
    toHome() {
      this.$router.push({ name: 'cesiumContainer' })
    },
    //实体选中事件
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
      let position = this.viewer.scene.pickPosition(e.position)
      this.pWindow = new DeviceStatusWindow(this.viewer, position, info)
    },

    //属性弹窗
    onSelect(feature) {
      let propertys = {}
      let propertyNames = feature.getPropertyNames()
      for (let name of propertyNames) {
        if (name === 'id') continue
        let value = feature.getProperty(name)
        propertys[name] = value ? value : ''
      }
      this.$refs.propertyModalRef.showModal(propertys)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#cesiumContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  box-shadow: inset 0 0 0 0 #000000;
}
</style>
