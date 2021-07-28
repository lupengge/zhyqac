<template>
  <div class="inforPan">
    <div class="inforItem">
      <div><img src="@/assets/images/资产1.png" alt="" /></div>
      <div>
        <div class="inforName">{{ '资产总数' }} <triangle dirTo="up" colorFill="#ff0000" :sideLen="5" />{{ '0.16' }}%</div>
        3152
      </div>
    </div>
    <div class="inforItem">
      <div><img src="@/assets/images/标签.png" alt="" /></div>
      <div>
        <div class="inforName">{{ '标签数' }} <triangle dirTo="down" colorFill="#0f0" :sideLen="5" />{{ '0.16' }}%</div>
        32,489
      </div>
    </div>
    <div class="inforItem">
      <div><img src="@/assets/images/闲置.png" alt="" /></div>
      <div>
        <div class="inforName">{{ '闲置资产' }} <triangle dirTo="up" colorFill="#ff0000" :sideLen="5" />{{ '0.35' }}%</div>
        1,532
      </div>
    </div>
    <div class="inforItem">
      <div><img src="@/assets/images/故障.png" alt="" /></div>
      <div>
        <div class="inforName">{{ '故障资产' }} <triangle dirTo="up" colorFill="#ff0000" :sideLen="5" />{{ '0.35' }}%</div>
        256
      </div>
    </div>
  </div>
</template>

<script>
import triangle from '../triangle.vue'
export default {
  components: { triangle }
}
</script>

<style scoped>
.inforPan {
  position: fixed;
  top: 80px;
  width: 44%;
  margin: 0 28%;
  height: 56px;
  display: flex;
  z-index: 1;

  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
}
.inforItem {
  min-width: 198px;
}
.inforItem > div {
  display: inline-block;
  font-size: 26px;
  color: #ffffff;
  font-weight: 600;
}
.inforItem > div:nth-child(2) {
  vertical-align: super;
}
.inforItem img {
  background: url('../../assets/images/{}.png');
  margin: 0 5px;
  height: 56px;
  width: 56px;
}
.inforName {
  font-size: 15px;
}
</style>
