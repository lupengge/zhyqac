<template>
  <div class="fullScreen mainbg">
    <a-space class="btns">
      <a-button @click="preStage" type="primary"> <a-icon type="left" />上个阶段 </a-button>
      <a-button @click="nextStage" type="primary"> 下个阶段 <a-icon type="right" /></a-button>
    </a-space>
    <div class="AnalyTitle">楼顶桅杆结构动力学分析(第{{ ChineseNum[currentstage] }}阶震型)</div>
    <div class="tip">自然频率</div>
    <div class="info">
      第{{ ChineseNum[currentstage] }}阶段频率<br />
      计算：{{ frequences[currentstage].cal }}<br />
      实测：{{ frequences[currentstage].real }}
    </div>
    <a-card class="sideView">
      <img slot="cover" alt="example" :src="images[(currentstage - 1) * 2]" />
      <a-card-meta title="侧视图" />
    </a-card>
    <a-card align="center" class="topView">
      <img slot="cover" alt="example" :src="images[(currentstage - 1) * 2 + 1]" />
      <a-card-meta align="center" title="俯视图" />
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentstage: 1,
      ChineseNum: { 1: '一', 2: '二', 3: '三', 4: '四' },
      images: Array.from(Array(8)).map((a, i) => require('@/assets/桅杆摆动动画/image' + (i + 2) + '.gif')),
      frequences: {
        1: { cal: '1.670Hz', real: '1.603Hz' },
        2: { cal: '1.822Hz', real: '1.787Hz' },
        3: { cal: '2.045Hz', real: '1.959Hz' },
        4: { cal: '2.122Hz', real: '2.118Hz' }
      }
    }
  },
  methods:{
    preStage(){
      if(this.currentstage!=1){
        this.currentstage-=1
      }
    },
    nextStage(){
      if(this.currentstage!=4){
        this.currentstage+=1
      }
    }
  }
}
</script>

<style>
.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 4;
}
</style>
<style scoped>
.mainbg {
  background-color: rgb(0 65 89);
  color: aliceblue;
}
.btns {
  position: fixed;
  bottom: 15%;
  right: 100px;
}
.AnalyTitle {
  text-align: center;
  margin-top: 80px;
  font-weight: 600;
  font-size: 1.5vw;
}
.info {
  display: inline-block;
  font-size: 1.4vw;
  font-weight: 500;
  top: 30%;
  margin: 40px;
  height: 100%;
  position: absolute;
}
.sideView {
  position: fixed;
  width: 20vw;
  left: 25vw;
  top: 20vh;
  min-width: 300px;
}
.topView {
  position: fixed;
  width: 30vw;
  left: 50vw;
  top: 20vh;
  min-width: 450px;
}
.tip{
    position: fixed;
    background-color: #dd0000;
    border: 1px solid black;
    border-radius: 12%;
    padding: 5px;
    font-size: 1.2vw;
    font-weight: 600;
    left: 50px;
    top: 125px;
}
</style>
