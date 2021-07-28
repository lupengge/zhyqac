<template>
  <section class="archives-section">
    <right-side>
      <a-tree @select="onSelect" @expand="onExpand" :tree-data="treeData">
      </a-tree>
    </right-side>
  </section>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import RightSide from '../components/index/rightSide'
import axios from 'axios'
export default {
  name: 'archives',
  directives: {
    infiniteScroll
  },
  components: {
    RightSide
  },
  data() {
    return {
      treeData: [],
      dataList: [],
      loading: false,
      busy: false
    }
  },
  mounted() {
    this.queryFileList()
  },
  methods: {
    queryFileList: async function() {
      const result = await axios.get('http://106.53.99.11:3000/file/queryData?type=2')
      this.treeData = result.data
    },
    onSelect(key, e) {
      if (e.selectedNodes[0].data.props.url) {
        window.open(`http://106.53.99.11:3000${e.selectedNodes[0].data.props.url}`)
      }
    },
    onExpand(key) {
    }
  }
}
</script>

<style scoped>
.anticon {
  font-size: 24px;
  margin: 12px 0 8px;
  transition: transform .3s ease-in-out;
  will-change: transform;
}
.ant-list,
.ant-list-item-meta-description,
.ant-list-item-meta-title > a{
  color: #fff !important;
}
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 100%;
  color: #fff;
}
.demo-infinite-container::-webkit-scrollbar {
  width: 0;
}

.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
