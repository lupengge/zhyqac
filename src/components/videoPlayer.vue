<template>
  <div v-show="showPlayer" ref="playerWindow" style="top:100px;left:50px;" @mousedown="moveWindow" class="palyerWindow">
    <div class="windowTitle" @click.stop>
      {{title}}
      <span @click.stop>
        <img src="@/assets/images/X.png" title="1232131" @click.stop="closeVideo" />
      </span>
    </div>
    <div>
      <video id="videoEle" key="videoEle" autoplay loop :src="videoSrc" controls="controls"></video>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showPlayer:false,
      title:'',
      videoSrc:'./lukou.mp4'
    }
  },
  methods: {
    /**
     * @param {MouseEvent} event
     */
    moveWindow(event) {
      /**@type {Element} */
      if (event.target.nodeName === 'IMG') {
        this.closeVideo()
        return
      }
      let windowele = this.$refs.playerWindow;
      let offsetX = event.offsetX;
      let offsetY = event.offsetY;

      /**@param {MouseEvent} e */
      function move(e) {
        windowele.style.left = e.clientX - offsetX-20 + 'px';
        windowele.style.top = e.clientY - offsetY-20 + 'px';
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', move)
      })
    },
    changeSrc(url){
      this.videoSrc=url;
      document.querySelector('#videoEle').load();
      document.querySelector('#videoEle').play();
    },
    closeVideo(){
     // that.$refs.videoPlayer.showPlayer = false
      this.showPlayer=false;
      document.querySelector('#videoEle').pause();
    }
  }
}
</script>

<style>
.palyerWindow {
  padding: 10px;
  position: relative;
  width: 640px !important;
  height: 404px !important;
  background: url('../assets/images/windowBG.png') no-repeat;
  background-size: cover;
}
.windowTitle {
  color: white;
  height: 24px;
}
.windowTitle span {
  vertical-align: middle;
  float: right;
}
.windowTitle img {
  margin: 0 5px;
}
.palyerWindow>div:last-child{
  height: calc(100% - 24px);
}
.palyerWindow video{
  width: 100%;
  height: 100%;
}
</style>
