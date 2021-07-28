<template>
  <a-modal v-model="visible" class="model-property" width="320px" height="500px" :footer="null" on-ok="handleOk">
    <section class="header">属性</section>
    <a-divider></a-divider>
    <ul>
      <li v-for="(vue,key) in valueObj">
        <section>{{ key }}:</section>
        <section>{{ vue }}</section>
      </li>
      <!-- <li>类型：</li>
      <li>
        <section>类型 ID：</section>
        <section>{{ valueObj.name1 }}</section>
      </li>
      <li>
        <section>族名称：</section>
        <section>{{ valueObj.name2 }}</section>
      </li>
      <li>
        <section>族与类型：</section>
        <section>{{ valueObj.name3 }}</section>
      </li>
      <li>
        <section>族：</section>
        <section>{{ valueObj.name4 }}</section>
      </li>
      <li>
        <section>幕墙：</section>
        <section>{{ valueObj.name5 }}</section>
      </li>
      <li>
        <section>类型：</section>
        <section>{{ valueObj.name6 }}</section>
      </li>
    </ul>
    <a-divider></a-divider>
    <ul>
      <li>
        <section>创建阶段：</section>
        <section>{{ valueObj.name7 }}</section>
      </li>
      <li>
        <section>拆除阶段：</section>
        <section>{{ valueObj.name8 }}</section>
      </li>
    </ul>
    <a-divider></a-divider>
    <ul>
      <li>
        <section>顶部约束：</section>
        <section>{{ valueObj.name9 }}</section>
      </li>
      <li>
        <section>已附着底部：</section>
        <section>{{ valueObj.name10 }}</section>
      </li>
      <li>
        <section>已附着顶部：</section>
        <section>{{ valueObj.name11 }}</section>
      </li>
      <li>
        <section>定位线：</section>
        <section>{{ valueObj.name12 }}</section>
      </li>
      <li>
        <section>顶部偏移：</section>
        <section>{{ valueObj.name13 }}</section>
      </li> -->
    </ul>
  </a-modal>
</template>

<script>
export default {
  name: 'propertyModal',
  data() {
    return {
      valueObj: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: '',
        name10: '',
        name11: '',
        name12: '',
        name13: ''
      },
      visible: false
    }
  },
  methods: {
    showModal(valueObj) {
      this.valueObj = valueObj
      this.visible = true
    },
    handleOk() {
      this.visible = false
    },
  }
}
</script>

<style scoped>

</style>
