 <template>
  <div
    class="d-status-container"
    v-if="show"
    :class="[dStatus?'d-status-container-green':'d-status-container-yellow']"
  >
    <!-- <div class="d-title">物联感知</div>
    <div class="d-name">
      <span>设备名称：</span>
      <span>{{dName}}</span>
    </div>

    <div class="d-num">
      <span>偏移距离：</span>
      <span>{{dNum}}</span>
    </div>
20
    <div class="d-status">
      <span>设备状态：</span>
      <span :class="[dStatus?'d-status-t1':'d-status-t0']">{{dStatus?'在线':'离线'}}</span>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },

  props: {
    dStatus: {
      type: Boolean,
      default: true
    },
    dName: {
      type: String,
      default: ""
    },
    dNum:{
      type:String,
      default:""
    }
  },
  mounted(){
    setTimeout(()=>{
      window.addEventListener('click',()=>{this.show=false})
    },500)
    //window.addEventListener('click',()=>{this.show=false})
  }
};
</script>

<style lang="css" scoped>
.d-status-container {
  position: absolute;
  left: 0px;
  bottom: 0px;
  min-width: 650px;
  min-height: 200px;
  color: white;
  user-select: none;
  pointer-events: none;
}

.d-status-container-green {
  /* background: url("../../assets/images/popup3d/ds_green.png") no-repeat; */
  background: url("../../assets/images/popup3d/echarts.png") no-repeat;
  background-size: contain;
}

.d-status-container-yellow {
  /* background: url("../../assets/images/popup3d/ds_yellow.png") no-repeat; */
  background: url("../../assets/images/popup3d/prop.png") no-repeat;
  background-size: contain;
  height: 50%;
}

.d-title {
  position: absolute;
  left: 60px;
  top: 32px;
}

.d-name {
  position: absolute;
  left: 30px;
  top: 58px;
}

.d-num {
  position: absolute;
  left: 30px;
  top: 80px;
}

.d-status {
  position: absolute;
  left: 30px;
  top: 102px;
}

.d-status-t0 {
  color: #FFE103;
}

.d-status-t1 {
  color: #29EA77;
}

.d-status-t0:before {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  content: "";
  background:#FFE103;
  margin-right: 10px;
}

.d-status-t1:before {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  content: "";
  background:  #29EA77;
  margin-right: 10px;
}
</style>
