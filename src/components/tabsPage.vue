<template>
  <div class="tabPage">
    <div class="tabPageHead">
      <template v-if="images">
        <div class="tableTitle" :data-page="names[i]" @click="changeTab"  v-for="(image, i) in images" :key="i">
          <img style="width:fit-content" :src="image"/>
        </div>
      </template>
      <template v-else>
        <div class="tableTitle" :ref="'ref' + i" :data-page="name" @click="changeTab"  v-for="(name, i) in names" :key="i" v-html="name"></div>
      </template>
    </div>
    <div class="tablePageBody" v-show="showPage == name" v-for="(name, i) in names" :ref="name" :key="i">
      <slot :name="name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    names:{type:Array,required:true},
    images:Array
  },
  data() {
    return {
      showPage: null
    }
  },
  methods: {
    changeTab(e) {
      this.showPage = e.target.dataset.page;
      let ele=e.target;
      Array.from(ele.parentNode.childNodes).forEach((value,index)=>{
        value.classList.remove('active');
      });
      e.target.classList.add('active');
    }
  },
  mounted() {
    this.$el.querySelectorAll('.tableTitle')[0].click()
  }
}
</script>

<style>
.tabPage {
  position: relative;
  width: 100%;
  height: 100%;
}
.tabPageHead {
  padding: 10px;
  width: 100%;
  display: flex;
  float: left;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
}
.tableTitle{
  padding:5px 2px;
  color: #ffffff;
  font-weight: 300;
  font-size: 0.8vw;
  box-shadow: inset 0 0px 10px 0px #666666;
  flex-grow: 1;
  text-align: center;
}
.tableTitle.active{
  box-shadow: inset 0 0px 10px 0px #00d4f3;
  color: #00d4f3;
  font-weight: 500;
}
.tablePageBody {
  width: 100%;
  height: 80%;

  position: relative;
  float: left;
}
</style>
