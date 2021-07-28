<template>
  <div class="tableWithPageNum">
    <table class="table-pagination-body">
      <tr>
        <th></th>
        <th v-for="(cel, i) in cels" :key="i">{{ cel }}</th>
      </tr>
      <tr v-for="(row, i) in currentPageData" :key="i">
        <td>{{ i + 1 + (currentPage - 1) * 10 }}</td>
        <td v-for="(cel, j) in Object.keys(cels)" :key="j * 10 + i">{{ row[cel] }}</td>
      </tr>
      <div style="height: 100%"></div>
    </table>
    <div class="Pagination">
      <span><img @click="currentPage = 1" src="@/assets/images/形状 1017 拷贝.png" alt="首页" /></span>
      <span><img @click="prePage" src="@/assets/images/形状 1021 拷贝.png" alt="上一页" /></span>
      <span><img @click="nextPage" src="@/assets/images/形状 1021.png" alt="下一页" /></span>
      <span><img @click="currentPage = pageCount" src="@/assets/images/形状 1017.png" alt="尾页" /></span>
      <div style="float: right; margin-top: 5px">{{ currentPage }}/{{ pageCount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * @type {Array}要显示的数据,键值对的形式
     */
    tableData: { type: Array, required: true },
    /**要显示的列名 */
    cels: Object
  },
  data() {
    return {
      /** @type {Number} 当前表格的页码*/
      currentPage: 1,
      /**@type {Number} 表格总页数*/
      pageCount: Math.floor(this.tableData.length / 10) + 1
    }
  },
  computed: {
    currentPageData() {
      let lastNum = 10 * (this.currentPage - 1) - 1
      let currentNum = 10 * this.currentPage - 1
      let out = this.tableData.filter((value, index) => {
        let a = lastNum < index && index < currentNum + 1
        return a
      })
      return out
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    prePage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    }
  }
}
</script>

<style>
.tableWithPageNum {
  position: relative;
  width: 100%;
  height: 100%;
}
.table-pagination-body {
  width: 100%;
  height: 90%;
}
.Pagination {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.Pagination > span > img:hover {
  background-color: #00eded;
}
.tableWithPageNum > table {
  text-align: left;
}
.tableWithPageNum > table > tr:nth-child(1) {
  height: 9%;
}
.tableWithPageNum > table > tr:hover{
  box-shadow: inset 0 0 15px 0 #00d4f3;
  transform: scale(1.05);
}
.tableWithPageNum td{
  border-bottom: 2px solid #adf1ff10;
}
</style>
