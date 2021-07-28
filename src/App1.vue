<template>
  <div id="app">
    <div class="titleBg">
      <div id="pageTitle">
        <div style="position: absolute;margin: 20px;color: white;">{{ nowTime }}</div>
        <div>
          <div class="titleImage"></div>
        </div>
      </div>
    </div>
    <CesiumContainer />
    <router-view />
    <layer-manager ref="layerManager" />
    <div class="menuPlane">
      <a-menu v-model="current" mode="horizontal">
        <a-menu-item key="index">
          <menu-item toLink="/" title="主页" imgSrc="概览.png" />
        </a-menu-item>
        <a-sub-menu key="check">
          <a slot="title" class="menuItem">
            <div>
              <img :src="require('@/assets/images/能源.png')" />
            </div>
            <a>排查信息</a>
          </a>
          <a-menu-item key="checkReport">
            <a href="#/check">排查报告</a>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="three">
          <section>
            <a class="menuItem" href="#/baseInfo">
              <div>
                <img :src="require('@/assets/images/能源.png')" />
              </div>
              <a>基本信息</a>
            </a>
          </section>
        </a-menu-item>
        <a-menu-item key="four">
          <a @click="recoverView" class="bigMenuItem" to="/d">
            <div>
              <img src="@/assets/images/全息场景.png" />
            </div>
            <a style="color:#90adc9;top: 0px">全息场景</a>
          </a>
        </a-menu-item>
        <a-sub-menu key="five">
          <a slot="title" class="menuItem">
            <div>
              <img :src="require('@/assets/images/能源.png')" />
            </div>
            <a>监测信息</a>
          </a>
          <a-menu-item key="five-one">
            <a>周边环境</a>
          </a-menu-item>
          <a-menu-item key="five-two">
            <a>大型设备</a>
          </a-menu-item>
          <a-menu-item key="five-three">
            <a>幕墙</a>
          </a-menu-item>
          <a-menu-item key="five-four">
            <a>消防</a>
          </a-menu-item>
          <a-menu-item key="kineticAnalysis">
            <a href="#/kineticAnalysis" >动力学分析</a>
          </a-menu-item>
          <a-menu-item key="windSpeed">
            <a href="#/windSpeed" >风速风向</a>
          </a-menu-item>
          <a-menu-item key="EvacuationSimulation">
            <a href="#/EvacuationSimulation" >疏散模拟</a>
          </a-menu-item>
          <a-menu-item key="five-five">
            <a href="#/construction">结构监测</a>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="six">
          <section>
            <a class="menuItem" href="#/archives">
              <div>
                <img :src="require('@/assets/images/能源.png')" />
              </div>
              <a>档案管理</a>
            </a>
          </section>
        </a-menu-item>
        <a-menu-item key="seven">
          <section>
            <a class="menuItem" href="#/bookmark">
              <div>
                <img :src="require('@/assets/images/管线.png')" />
              </div>
              <a>书签</a>
            </a>
          </section>
        </a-menu-item>
      </a-menu>
      <!--      <a @click="recoverView" class="bigMenuItem" to="/d">-->
      <!--        <div>-->
      <!--          <img src="@/assets/images/全息场景.png" />-->
      <!--        </div>-->
      <!--        <a style="color:#90adc9;top:-35px">全息场景</a>-->
      <!--      </a>-->
      <!--      <menu-item toLink="/bookmark" title="书签" imgSrc="管线.png" />-->
      <!-- <menu-item toLink="/patrolManage" title="巡检" imgSrc="巡检.png" />
      <menu-item toLink="/draw" title="预案" imgSrc="应急管理.png" />
      <menu-item toLink="/assetsManage" title="资产" imgSrc="资产管理.png" /> -->
    </div>
    <div class="appShadow"></div>
    <!-- <img class="CompLabel" src="@/assets/images/szgk.png" /> -->
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/es/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import menuItem from './components/mainPage/menuItem'
import CesiumContainer from './components/mainPage/CesiumContainer'
import LayerManager from './components/layerManager.vue'
import mapInteractive from './js/map3d/MapInteractive'
moment.locale('zh-cn')
export default {
  data() {
    return {
      current: ['index'],
      nowTime: null,
      weather: '',
      zh_CN
    }
  },
  components: {
    menuItem,
    CesiumContainer,
    LayerManager
  },
  mounted() {
    setInterval(() => {
      this.nowTime = new Date().toLocaleDateString() + ' '
      let dates = ['一', '二', '三', '四', '五', '六', '日']
      this.nowTime += '星期' + dates[new Date().getDay() - 1] + ' '
      this.nowTime += new Date().toLocaleTimeString()
    }, 1000)
  },
  methods: {
    recoverView() {
      viewer.scene.primitives._primitives.forEach(primitive => {
        if (primitive._billboards) {
          primitive.show = false
          primitive._billboards.forEach(billbord => (billbord.show = false))
        } else if (primitive.isCesium3DTileset) {
          primitive.style = undefined
        }
      })

      //关闭点查属性
      if (this.$refs.layerManager.handler) {
        this.$refs.layerManager.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
      }

      //关闭楼层高亮
      mapInteractive.addFloorLabel = false

      document.querySelectorAll('.layerBg').forEach(ele => ele.classList.remove('active'))

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
      viewer.camera.flyTo(options)

      mapInteractive.backOutdoor()
    }
  },
  watch: {
    $route(link, old) {
      let videoPalyer=this.$refs.layerManager.$refs.videoPlayer;
      videoPalyer.showPlayer=false;
      if (link.name == 'baseInfo'||link.name=="index"||link.name=='EvacuationSimulation') {
        document.querySelector('#navigationDiv').style.right = '1vw'
        document.querySelector('#navigationDiv').style.top = '-30px'
        document.querySelector('#layerManager').style.right = 'calc(1vw + 19px)'
        document.querySelector('#layerManager').style.top = '150px'
        if(link.name=='EvacuationSimulation'){
          videoPalyer.changeSrc('./人员疏散模拟.mp4')
          videoPalyer.showPlayer=true;
        }
      } else {
        document.querySelector('#navigationDiv').style.right = '21vw'
        document.querySelector('#navigationDiv').style.top = '-60px'
        document.querySelector('#layerManager').style.right = 'calc(21vw + 19px)'
        document.querySelector('#layerManager').style.top = '120px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
}
.appShadow {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: inset 0 0 300px 50px #000000;
  z-index: 0;
  pointer-events: none;
}
.titleBg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 75px;
  // background: linear-gradient(#000000ff, #00000004);
  z-index: 5;
  pointer-events: none;
}
#pageTitle {
  background: url('./assets/images/顶部1.png') no-repeat 0px 0px;
  background-size: 100%;
  height: 75px;
}
#pageTitle div {
  width: 48%;
  height: 100%;
  margin: 0 auto;
}
.titleImage {
  background-image: url('./assets/images/title1.png');
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
}
.menuPlane {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 15%;
  width: 40%;
  margin: 0 30%;

  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 5;
  // background: linear-gradient(#00000004,#000000ff);
}
.bigMenuItem {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 6vw;
}
.bigMenuItem div img {
  background: url('./assets/images/默认.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 98%;
}
.bigMenuItem a {
  position: relative;
  top: -1vw;
  font-weight: bold;
  color: #90adc9;
  font-size: 1vw;
}
a.router-link-exact-active div img {
  background: url('./assets/images/触发.png') no-repeat 0 0;
  background-size: cover;
}
</style>

<style>
* {
  user-select: none;
}
.CompLabel {
  z-index: 3;
  position: fixed;
  right: 20px;
  top: 20px;
  height: 40px;
  width: 100px;
}
#navigationDiv {
  right: 21vw;
  position: fixed;
  /* bottom: 229px; */
  top: -60px;
}
</style>
