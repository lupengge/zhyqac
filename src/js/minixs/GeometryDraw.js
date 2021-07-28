/**
 * 图形绘制类
 */
import EntityDraw from "@/js/EntityDraw"
import PlotDraw from "@/js/Plot/MilitaryPlot/PlotDraw"
import MilitaryPlotLayer from "@/js/Plot/PlotLayer/MilitaryPlot"
import {
  Object
} from "core-js"
export default {
  data() {
    return {
      name: 'geodrawminix',
      option: null,
    }
  },
  methods: {
    //初始化绘制工具---点线面
    initDrawTool() {
      this.drawTool = new EntityDraw(viewer);
      this.drawTool.DrawEndEvent.addEventListener((result, positions, drawType) => {
        result.remove();
        this.addDrawResult(positions, drawType);
        console.log("绘制类型：" + drawType + "结果如下");
        console.log(positions)
      })
    },

    //初始化标绘---军事标绘类
    initPlot() {
      this.plotDraw = new PlotDraw(viewer);
      this.militaryPlotLayer = new MilitaryPlotLayer(viewer);
      this.militaryPlotLayer.setPlotSelectable(true);
      this.plotDraw.PlotDrawEndEvent.addEventListener((drawPlot, type) => {
        drawPlot.remove(); //移除绘制的对象
        this.militaryPlotLayer.addPlot(drawPlot.toGeoJson()); //将标绘对象添加到图层中进行管理
      });
    },

    //添加绘制结果
    addDrawResult(positions, drawType) {
      switch (drawType) {
        case "Point":
          this.generatePoint(positions);
          break;
        case "Polyline":
          this.generatePolyline(positions);
          break;
        case "Polygon":
          this.generatePolygon(positions);
          break;
      }
    },

    //构造点
    generatePoint(positions) {
      let entity = viewer.entities.add({
        position: positions[0],
        billboard: {
          image: "../../static/images/poi/sp.png",
          scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4), //设置随图缩放距离和比例
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000), //设置可见距离 10000米可见
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        }
      })
    },

    //构造线
    generatePolyline(positions) {
      let lineType=document.querySelector('[name=line]>.imgBox .selected').dataset.type;
      let material=null;
      switch (lineType) {
        case 'solid':
          material=Cesium.Color.fromCssColorString(document.querySelector('[name=line] [name=color]').value)
          break;
        case 'dash':
          material=new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.fromCssColorString(document.querySelector('[name=line] [name=color]').value),
          })
          break;
        default:
          break;
      }

      let entity = viewer.entities.add({
        name: document.querySelector('[name=line] [name=title]').value,
        polyline: {
          positions: positions,
          width: document.querySelector('[name=line] [name=width]').value,
          material,
          depthFailMaterial: new Cesium.PolylineDashMaterialProperty({
            color: Cesium.Color.fromCssColorString(document.querySelector('[name=line] [name=color]').value)
          }),
        }
      })
    },

    //构造面
    generatePolygon(positions) {
      let material = Cesium.Color.fromCssColorString(document.querySelector('[name=polygon] [name=fillColor]').value);
      material.alpha = document.querySelector('[name=polygon] [name=Opacity]').value;

      let entity = viewer.entities.add({
        name: document.querySelector('[name=polygon] [name=title]').value,
        polygon: {
          hierarchy: positions,
          material,
          outline: true,
          outlineColor: Cesium.Color.fromCssColorString(document.querySelector('[name=polygon] [name=edgeColor]').value),
          perPositionHeight: true,
          extrudedHeight: 0.5
        }
      })
    },

    //激活绘制工具
    drawActivate(type) { //type in Point Polyline Polygon
      this.drawTool.activate(type);
    },

    //军事标绘激活绘制
    activateMiliDraw(plotType) {
      this.plotDraw.activate(plotType);
    },

    //清除所有绘制
    clearDraw() {
      viewer.entities.removeAll();
      this.militaryPlotLayer.clear();
    }
  }
}
