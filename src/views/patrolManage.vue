<template>
  <div>
    <right-side>
      <chart-2 title="巡检管理" image="">
        <pie-chart style="height:30%" chartId="patroler" :datas="patrolerData" :names="patrolerNames" :unit="['个', '个']">
          <div style="font-size:1.5vw;font-weight:700;">
            36
          </div>
          <span>巡检人员</span>
        </pie-chart>
        <div style="height:10%;">
          <span>人员巡检记录</span>
          <span style="float:right">
            <span style="font-size:1.5vw;color:#00d4f3;font-weight:600;">
              {{ patrolerRecord.length }}
            </span>
            条</span
          >
        </div>
        <div id="patrolRecordTable" class="patrolRecord">
          <table>
            <tr v-for="(record, i) in patrolerRecord" :key="i">
              <td>{{ String(i + 1).padStart(2, '0') }}</td>
              <td v-for="(field, j) in record" :key="j">{{ field }}</td>
              <td><img src="@/assets/images/定位 拷贝 2.png" /></td>
            </tr>
          </table>
        </div>
        <div style="height:10%;">
          <div class="pageTurning">
            <div @click="scrollDown"><triangle colorFill="#ffffff" :sideLen="5" dirTo="down" /></div>
            <div @click="scrollUP"><triangle colorFill="#ffffff" :sideLen="5" dirTo="up" /></div>
          </div>
        </div>
      </chart-2>
      <chart-2 title="智能巡检" image="">
        <div class="viderMonitor">
          <span>
            <span style="font-size:1.5vw;color:#00d4f3;font-weight:600;"> {{ videos.length }} </span>条
          </span>
          <div v-for="(img, i) in videos" :key="i" style="position:relative;display:inline;width:calc(50% - 20px);margin:10px;height:35%">
            <video @click="playVideo(img)" autoplay loop :src="img.src" style="width:calc(50% - 20px);" ></video>
            <span style="position:absolute;left:10px;bottom:5px;color:#ffffff;"><img src="@/assets/images/椭圆 507.png" /> {{ img.name }}</span>
          </div>
        </div>
        <div class="createNewLine">
          <div></div>
          <div>新建检查路线</div>
        </div>
      </chart-2>
    </right-side>
    <video-player ref="videoPlayer" :videoSrc="videos[0].src" class="viderWindow" />
  </div>
</template>

<script>
import Chart2 from '../components/chart2.vue'
import rightSide from '../components/index/rightSide.vue'
import PieChart from '../components/pieChart.vue'
import Triangle from '../components/triangle.vue'
import VideoPlayer from '../components/videoPlayer.vue'


export default {
  components: { rightSide, Chart2, PieChart, Triangle, VideoPlayer },
  data() {
    return {
      patrolerData: [33, 3],
      patrolerNames: ['当值人员', '休假人员'],
      patrolerRecord: [
        { name: '王旭东', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '里格朗订正', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '张杨果二', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '刘福是斌', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '欧阳慧敏', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '东芝华', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '王旭东', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '王旭东', time: '11:35', address: 'A区物联巡检 位置01' },
        { name: '王旭东', time: '11:35', address: 'A区物联巡检 位置01' }
      ],
      videos: [
        { name: '小区东南角1', src:require('../../public/lukou.mp4') },
        { name: '小区东南角2', src:require('../../public/lukou.mp4') },
        { name: '小区东南角3', src:require('../../public/lukou.mp4') },
        { name: '小区东南角4', src:require('../../public/lukou.mp4') },
        { name: '小区东南角5', src:require('../../public/lukou.mp4') },
        { name: '小区东南角6', src:require('../../public/lukou.mp4') },
        { name: '小区东南角7', src:require('../../public/lukou.mp4') },
        { name: '小区东南角7', src:require('../../public/lukou.mp4') },
        { name: '小区东南角7', src:require('../../public/lukou.mp4') },
        { name: '小区东南角7', src:require('../../public/lukou.mp4') },
        { name: '小区东南角8', src:require('../../public/img/1.png') },
      ],
    }
  },
  computed:{

  },
  mounted() {
    document.querySelectorAll('.rightSide>.chartCard').forEach(ele => {
      ele.firstChild.style.height = '7%'
      ele.lastChild.style.height = '93%'
    })
    window.a=this;
  },
  methods:{
    scrollUP(enent){
      let scroll=document.querySelector('#patrolRecordTable');
      let Height = scroll.scrollHeight;

      scroll.scrollTop-=100;

    },
    scrollDown(enent){
      let scroll=document.querySelector('#patrolRecordTable');
      let Height = scroll.scrollHeight;

      scroll.scrollTop+=100;
    },
    playVideo(video){
      this.$refs.videoPlayer.showPlayer=true;
      this.$refs.videoPlayer.title=video.name;
      this.$refs.videoPlayer.changeSrc(video.src);
    }
  }
}
</script>

<style scoped>
.rightSide > .chartCard {
  height: 50%;
}
.patrolRecord {
  height: 50%;
  overflow: hidden;
  padding: 10px;
}
.patrolRecord::-webkit-scrollbar {
  width: 2px;
}
.patrolRecord > table {
  /* width: 90%; */
  /* text-align: center; */
  font-size: 0.8vw;
  border-collapse: collapse;
  color: #dedede;
  font-weight: 500;
}
.patrolRecord td {
  padding: 5px 3px;
}
.patrolRecord > table > tr {
  border-bottom: 1.5px solid #094355;
}
.patrolRecord > table > tr img {
  opacity: 0.3;
}
.patrolRecord > table > tr:hover {
  color: #00d4f3;
}
.patrolRecord > table > tr:hover img {
  opacity: 1;
}
.pageTurning {
  height: fit-content;
  width: fit-content;
  float: right;
}
.pageTurning > div {
  margin-inline: 1px;
  background-color: rgba(162, 184, 202, 0.4);
  display: inline-block;
  width: 20px;
  text-align: center;
}
.pageTurning > div:hover {
  background-color: #00d4f366;
}

.viderMonitor {
  width: 100%;
  height: 80%;
  margin-top: 10px;
  overflow: auto;
}
.viderMonitor::-webkit-scrollbar {
  width: 2px;
}
.viderMonitor img:hover {
  background: url('../assets/images/选中.png');
  box-shadow: 0 0 20px 0 #01d4f3;
}
.viderMonitor > span:first-child {
  position: absolute;
  height: fit-content;
  width: fit-content;
  top: -30px;
  right: 10px;
}
.createNewLine {
  position: relative;
}
.createNewLine > div:first-child {
  width: 45%;
  height: 12%;
  margin: 2% 2%;
  background-color: #01d4f3;
  border-radius: 5px;
  transform: skew(-30deg);
  opacity: 0.2;
}
.createNewLine > div:nth-child(2) {
  position: absolute;
  top: 10px;
  height: 12%;
  width: 48%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  color: #01d4f3;
}
</style>
