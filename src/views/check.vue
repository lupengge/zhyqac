<template>
  <section class="check-section">
    <right-side>
      <a-tree @select="onSelect" @expand="onExpand" :tree-data="treeData">
      </a-tree>
    </right-side>
  </section>
</template>

<script>
import RightSide from '../components/index/rightSide.vue'
import axios from 'axios';
export default {
  name: 'check',
  components: { RightSide },
  data () {
    return {
      treeData: []
    }
  },
  mounted() {
    this.queryFileList()
  },
  methods: {
    queryFileList: async function() {
      const result = await axios.get('http://106.53.99.11:3000/file/queryData?type=1')
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
