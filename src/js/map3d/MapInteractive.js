import axios from 'axios';
import CallbackProperty from 'cesium/Source/DataSources/CallbackProperty';
import {
  floorViews
} from '../../../public/data/floorView.js'

/**
 * 数据加载与交互类
 * 模拟ThingJS的内外三维切换模式
 */

let mapInteractive = {
  sceneModel: 'outdoor', //场景模式：outdoor、indoor、floorsplit
  outdoorDataset: null, //外三维数据
  indoorDataset: null, //内三维数据
  otherDatasetArr: [], //其他数据
  eventHandler: null,
  selectFloorName: '', //当前内三维选中的楼层名
  selectBuildFeature: null, //当前外三维选中的建筑对象
  floorEntity: null, //楼层名标签
  floorConfigs: {}, //楼层名_高度位置信息表
  toBuildInfoFun: null,
  toHomeFun: null,
  floorName: "", //用于记录当前分层的楼层名
  structShowState: {
    '墙': true,
    '门': true,
    '结构柱': true,
    '窗': true,
    '幕墙嵌板': true,
    // '梯段': true,
    '栏杆扶手': true,
    '楼板': true,
    '常规模型': true,
    '幕墙竖梃': true,
    '楼梯': true
  },
  /**是否添加楼层标签，高亮楼层 */
  addFloorLabel: false,

  //加载外三维模型
  loadOutdoorModel() {
    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: 'https://xdata-1251202940.cos.ap-guangzhou.myqcloud.com/3dtiles/sgbd/qxsy/tileset.json',
      modelMatrix: Cesium.Matrix4.fromArray([0.9872182048248306, 0.08568055204034175, -0.13438399854335717, 0, -0.032586267791304024, 0.933899102308549, 0.3560485947995295, 0, 0.15600753575988638, -0.3471185816249952, 0.9247542046818605, 0, -1160.1974571812898, 2581.4528367621824, -15025.367700870614, 1]),
    }));
    // viewer.flyTo(tileset);
    let options = {
      destination: {
        x: -2405178.572459869,
        y: 5381404.211059531,
        z: 2429385.1386184245
      },
      duration: 0.5,
      orientation: {
        heading: 0.06967072816405206,
        pitch: -0.2745573701027455,
        roll: 0.0001716655269072831
      }
    }
    viewer.camera.flyTo(options);

    tileset.skipLevelOfDetail = true;
    tileset.preferLeaves = true;
    tileset.maximumMemoryUsage = 2000;

    this.outdoorDataset = tileset;

    //加载内三维模型
    tileset.allTilesLoaded.addEventListener(function () {
      if (!mapInteractive.indoorDataset) {
        mapInteractive.loadIndoorModel();
        //mapInteractive.laodTreeModel();
      }
    });

    this.initLeftClickHandler();
  },

  //加载小品种植---后续数据需要与建筑模型合并
  laodTreeModel() {
    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: 'http://localhost:9000/model/7d700b70c77811ebba07b157128873b7/tileset.json', //小品+植被
      // url: 'http://localhost:9000/model/c1805130becc11ebb8161106cb5ea1c2/tileset.json', //小品
      //modelMatrix: Cesium.Matrix4.fromArray([0.999999536541895,0.0000010434951087101574,-0.000962764200190952,0,0.0000010434951093762912,0.9999976505275628,0.002167703454158676,0,0.000962764200190841,-0.0021677034541586204,0.9999971870694584,0,-2339.922572680749,5268.432542722672,-13978.816002053209,1]),
      //modelMatrix: Cesium.Matrix4.fromArray([0.9999994599615615, -0.0009583544942708966, 0.00040203637739893994, 0, 0.0009587171713715814, 0.9999991328346105, -0.0009028795115341159, 0, -0.0004011707501286599, 0.0009032644631223885, 0.9999995115875497, 0, -0.9690241585485637, 2.181826769374311, 33.28190477238968, 1]),

    }));
    mapInteractive.otherDatasetArr.push(tileset);
  },

  //加载周边白膜数据
  loadAroundBox() {
    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: "http://localhost:9000/model/cd8755e0b94611eba646d131ed2b2fa0/tileset.json"
    }));
    tileset.readyPromise.then((tileset) => {
      tileset.tileVisible.addEventListener(function (tile) {
        var content = tile.content;
        var featuresLength = content.featuresLength;
        for (var i = 0; i < featuresLength; i += 2) {
          let feature = content.getFeature(i)
          let model = feature.content._model;

          if (model && model._sourcePrograms && model._rendererResources) {
            Object.keys(model._sourcePrograms).forEach(key => {
              let program = model._sourcePrograms[key]
              model._rendererResources.sourceShaders[program.fragmentShader] =
                `varying vec3 v_positionEC;
                              void main(void){
                                  vec4 position = czm_inverseModelView * vec4(v_positionEC,1); // 位置
                                  float glowRange = 100.0; // 光环的移动范围(高度)
                                  gl_FragColor = vec4(0.2,  0.5, 1.0, 1.0); // 颜色
                                  gl_FragColor *= vec4(vec3(position.z / 100.0), 1.0); // 渐变
                                  // 动态光环
                                  float time = fract(czm_frameNumber / 360.0);
                                  time = abs(time - 0.5) * 2.0;
                                  float diff = step(0.005, abs( clamp(position.z / glowRange, 0.0, 1.0) - time));
                                  gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - diff);
                              }
                             `
            })
            model._shouldRegenerateShaders = true
          }
        }
      });
    }).otherwise(function (error) {
      console.error(error);
    });
    this.otherDatasetArr.push(tileset);
  },

  //加载道路数据
  loadRouteLine() {
    let promise = Cesium.GeoJsonDataSource.load('data/daolu.json');
    promise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      this.otherDatasetArr.push(dataSource);
      let values = dataSource.entities.values;

      for (var i = 0; i < values.length; i++) {
        var line = values[i];
        //改变线的离地高度
        let positions = line.polyline.positions._value;
        for (let i in positions) {
          let point = positions[i];
          //世界坐标系转弧度，抬高后再转回世界坐标系
          let ellipsoid = viewer.scene.globe.ellipsoid;
          let cartographic = ellipsoid.cartesianToCartographic(point);
          cartographic.height += 10;
          let point2 = ellipsoid.cartographicToCartesian(cartographic);
          line.polyline.positions._value[i] = point2;
        }
        line.polyline.material = new Cesium.PolylineGlowMaterialProperty({ //设置Glow材质
          glowPower: 0.06,
          color: Cesium.Color.ORANGERED.withAlpha(0.9)
        });
        line.polyline.width = 12;
      }
    }).otherwise(function (error) {
      console.log(error)
    });
  },

  //加载内三维数据
  loadIndoorModel() {
    let tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      // url: 'https://xdata-1251202940.cos.ap-guangzhou.myqcloud.com/3dtiles/sgbd/3dtiles2/tileset.json', //6-22新数据
      url: 'https://xdata-1251202940.cos.ap-guangzhou.myqcloud.com/3dtiles/3d/tileset.json', //小场景切片，适当调整切片大小，加载效率更高
      //url: 'http://localhost:9000/model/5a0970e0c82711ebb083bdcbbb4d34be/tileset.json',
      // modelMatrix: Cesium.Matrix4.fromArray([0.9999994599365517, -0.0009584130231989341, 0.00040195905586765113, 0, 0.0009587755370329964, 0.9999991329888848, -0.0009026466353970752, 0, -0.0004010935990744202, 0.0009030315364203512, 0.9999995118288657, 0, -0.9689102433621883, 2.1814272617921233, 33.27324207453057, 1]),
      //modelMatrix:Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3( 40, -20, -40 ))
    }));
    this.indoorDataset = tileset;
    // viewer.flyTo(tileset);
    this.initIndoorConfig('https://xdata-1251202940.cos.ap-guangzhou.myqcloud.com/3dtiles/sgbd/3Dtiles/scenetree.json');

    // this.initIndoorConfig('http://localhost:9000/model/c61d81d0be9111ebb042d53f49f54e21/scenetree.json');
    tileset.skipLevelOfDetail = true;
    tileset.preferLeaves = true;
    tileset.maximumMemoryUsage = 3000;
    tileset.maximumScreenSpaceError = 99;
  },

  //初始化内三维数据结构配置表
  initIndoorConfig(url) {
    mapInteractive.floorConfigs = {};
    let ellipsoid = viewer.scene.globe.ellipsoid;
    axios.get(url)
      .then(res => {
        for (let node of res.data.scenes) {
          // let sphere = node.sphere;
          // let cartesian3 = new Cesium.Cartesian3(sphere[0], sphere[1], sphere[2]);
          // let cartographic = ellipsoid.cartesianToCartographic(cartesian3);
          //mapInteractive.floorConfigs[node.name] = cartographic.height;
          mapInteractive.floorConfigs[node.name] = node.height;
        }
      }).catch(err => {
        console.log('此数据不存在层级关系表', err)
      })
  },

  //注册鼠标事件事件
  initLeftClickHandler() {
    if (!this.eventHandler) {
      this.eventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    }
    //单击选中外三维建筑
    this.eventHandler.setInputAction(e => {
      if (mapInteractive.sceneModel === "outdoor") {
        let pickFeature = viewer.scene.pick(e.position);
        if (!Cesium.defined(pickFeature) || pickFeature.tileset != mapInteractive.outdoorDataset) return;
        mapInteractive.selectBuildFeature = pickFeature;
        //pickFeature.primitive.show = false;
        let featureId = pickFeature.getProperty('id');
        let filter = '${id}==="' + featureId + '"?color("PALEGREEN"):color("white")';

        let tilesetStyle = new Cesium.Cesium3DTileStyle({
          color: filter
        });
        mapInteractive.outdoorDataset.style = tilesetStyle;
        mapInteractive.toBuildInfoFun();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //双击进入层级
    this.eventHandler.setInputAction(e => {
      let pickFeature = viewer.scene.pick(e.position);
      if (!Cesium.defined(pickFeature)) return;

      switch (mapInteractive.sceneModel) {
        case "outdoor":
          mapInteractive.intoIndoorScen();
          break;
        case "indoor":
          let floorName = pickFeature.getProperty('file');
          this.sceneModel = "floorsplit";
          this.floorName = floorName;
          mapInteractive.buildFloorSplit(floorName);
          //防止误操作锁定标签
          viewer.trackedEntity = undefined
          break;
        case "floorsplit":
          break;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

    //右击退出层级
    this.eventHandler.setInputAction(e => {
      if (window.measureing) return;
      switch (mapInteractive.sceneModel) {
        case "outdoor":
          mapInteractive.unselectOutdoor();
          break;
        case 'indoor':
          mapInteractive.backOutdoor();
          break;
        case "floorsplit":
          mapInteractive.intoIndoorScen();
          break;
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
  },

  /**返回外三维模式*/
  backOutdoor() {
    mapInteractive.outdoorDataset.show = true;
    viewer.scene.globe.show = true;
    mapInteractive.sceneModel = "outdoor";
    mapInteractive.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    viewer.entities.remove(mapInteractive.floorEntity);
    mapInteractive.floorEntity = undefined;
  },

  //外三维模式下取消选择并退回主页
  unselectOutdoor() {
    if (mapInteractive.selectBuildFeature) {
      mapInteractive.outdoorDataset.style = null;
      mapInteractive.selectBuildFeature = null;
      mapInteractive.toHomeFun();
    }
  },

  /**进入内三维模式*/
  intoIndoorScen() {
    if (!mapInteractive.indoorDataset) {
      mapInteractive.loadIndoorModel();
    }

    mapInteractive.outdoorDataset.show = false;
    viewer.scene.globe.show = false
    viewer.scene.skyBox.show = false
    // for(let tileset of this.otherDatasetArr){
    //     tileset.show = false;
    // }
    mapInteractive.sceneModel = 'indoor';
    //要同步结构选项需要重新分类显示
    //mapInteractive.indoorDataset.style = null;
    this.buildFloorSplit();

    //#region 图标的显隐控制
    for (let i = 0; i < 2; i++) {
      const billboardCollection = viewer.scene.primitives.get(i);
      if (billboardCollection.show == true) {
        document.querySelector('.layersBox > .layerBg:nth-child(2)').classList.add('active')
        billboardCollection._billboards.forEach((billboard) => {
          billboard.show = true;
        })
      }
    }
    //#endregion

    //鼠标滑动显示楼层名
    let lastOverFloorName = '';
    let that = this;
    mapInteractive.eventHandler.setInputAction(function showFloorName(movement) {
      if (that.addFloorLabel) {
        let pickFeature = viewer.scene.pick(movement.endPosition);
        if (!pickFeature) return;
        let floorName = pickFeature.getProperty('file');
        if (!floorName) return;
        if (lastOverFloorName == floorName) return;
        lastOverFloorName = floorName;
        mapInteractive.selectFloorName = floorName;
        //创建或更新楼层名标签
        let cartesian = viewer.scene.pickPosition(movement.endPosition);


        mapInteractive.drawFloorLabel(cartesian, floorName);
        mapInteractive.highlightFloor(floorName);
      }

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
  },

  //创建或更新楼层名标签
  drawFloorLabel(position, text) {
    if (!this.floorEntity) {
      this.floorEntity = viewer.entities.add({
        name: 'floorLabel',
        position: position,
        label: {
          text: text,
          font: '16px bold 楷体',
          showBackground: true,
          backgroundColor: Cesium.Color.fromCssColorString('#0fa3f180'),
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 9000.0),
          pixelOffset: new Cesium.Cartesian2(0, -20),
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, -10)
        },
        billboard: {
          image: "https://i.loli.net/2021/05/26/RL5gGp97EOwmQlB.png",
          width: 50,
          height: 50,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          eyeOffset: new Cesium.Cartesian3(0.0, 0.0, -10)
        }
      });
      this.floorEntity.billboard.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
      //this.floorEntity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
    } else {
      this.floorEntity.label.text = text;
      this.floorEntity.position = position;
    }
  },

  //高亮选中的楼层
  highlightFloor(floorName) {
    let filter = "${feature['file']} === '" + floorName + "'";
    let conditions = [];

    Object.keys(this.structShowState).forEach((name) => {
      if (this.structShowState[name]) {
        conditions.push(["${类别} === '" + name + "'", 'true'])
      }
    })
    let style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
          [
            filter, "color('#FFAC3A80')",
          ],
          [true, "color('white')"],
        ],
      },
      show: {
        //conditions: filters,
        conditions: conditions
      },
    });
    mapInteractive.indoorDataset.style = style;
  },

  //模型分层
  buildFloorSplit(floorName) {

    if (mapInteractive.floorConfigs === {}) return;

    let conditions = [];
    if (this.sceneModel === "floorsplit") {
      //移除鼠标滑动事件
      mapInteractive.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      let that = this;
      Object.keys(this.structShowState).forEach((name) => {
        if (that.structShowState[name]) {
          conditions.push(["${file} === '" + (floorName || this.floorName) + "'&&${类别} === '" + name + "'", 'true'])
        }
      })
    } else if (this.sceneModel === "indoor") {
      let that = this;
      Object.keys(this.structShowState).forEach((name) => {
        if (that.structShowState[name]) {
          conditions.push(["${类别} === '" + name + "'", 'true'])
        }
      })
    } else {
      return;
    }

    let style = new Cesium.Cesium3DTileStyle({
      defines: {
        file: "${feature['file']}",
        "类别": "${feature['类别']}"
      },
      show: {
        //conditions: filters,
        conditions: conditions
      },
    })
    mapInteractive.indoorDataset.style = style;
    viewer.entities.remove(mapInteractive.floorEntity);
    mapInteractive.floorEntity = undefined;
    //mapInteractive.sceneModel = "floorsplit";
    //分层模式
    if (this.sceneModel === "floorsplit") {
      //跳到该楼层视角
      let options = floorViews[floorName]
      viewer.camera.flyTo(options)

      //#region 图标的显隐控制
      for (let i = 0; i < 2; i++) {
        const billboardCollection = viewer.scene.primitives.get(i);
        if (billboardCollection.show == true) {
          billboardCollection._billboards.forEach((billboard) => {
            if (billboard.id.split('_')[0] == floorName) {
              billboard.show = true;
            } else {
              billboard.show = false;
            }
          })
        }
      }

      //#endregion
    }
  }

}
export default mapInteractive
