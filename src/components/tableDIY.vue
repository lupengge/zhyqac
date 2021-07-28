<template>
  <div style="height:100%;width:100%;position:absolute;">
    <div class="dataFilters" ref="filters">
      <div @click="selectData($event)" :index="index" v-for="(value,index) in filters" class="filterItem" :key="index">{{value}}</div>
    </div>
    <div class="dataTable">
      <table>
          <tr><th v-for="(field,index) in  Object.keys(datas[0])" :key="index">{{field}}</th></tr>
          <tr v-for="(flelds,row) in showData" :key="row">
            <td v-for="(field,cle) in Object.keys(flelds)" :key="cle">{{flelds[field]}}</td>
          </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  props:{
    filters:Array,
    datas:Array,
    conditions:Array,
  },
  data(){
    return {
      currentCon:0,
      allData:null,
      showData:null,
    }
  },
  computed:{
    displayData(){
      let that=this;
      if(this.currentCon==0){
        return this.allData;
      }

      return this.allData.filter((value,index,data)=>{
        let currentKey=Object.keys(that.conditions[that.currentCon-1])[0];
        return value[currentKey]== that.conditions[that.currentCon-1][currentKey];
      });
    }
  },
  methods:{
    selectData(event){
      let ele=event.target;
      Array.from(ele.parentNode.children).forEach((a)=>{
        a.classList.remove('active');
      });
      ele.classList.add('active');
      this.currentCon=Number(ele.getAttribute('index'));
      this.showData=this.displayData;
    }
  },
  mounted(){
    this.$refs.filters.children[0].classList.add('active');
  },
  created(){
    this.allData=this.datas;
    this.showData=this.displayData;

    let that=this;
    setInterval(()=>{
      let theFirst=that.showData[0];
      that.showData=that.showData.reduce((pre,value,index)=>{
        if(index>0){
          pre.push(value);
        }
        return pre;
      },[]);
      that.showData.push(theFirst);
    },800)
  },
  components:{

  }
}
</script>

<style scoped>
  .dataFilters{
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .dataTable{
    position: absolute;
    height: 80%;
    width: 100%;
    color: aliceblue;
  }
  .filterItem{
    background-color: #6fafd833;
    color: aliceblue;
    min-width: 55px;

    padding: 5px 10px;
    margin: 0 10px;
    text-align: center;
    font-size: 0.5vw;
  }
  .filterItem.active{
    box-shadow: inset 0px -4px 20px 0px #00d4f3a8;
  }
  table,tr{
    width: 100%;
    text-align: center;
    font-size: 0.8vw;
  }
  tr{
    border-top: 2px #888888 solid;
  }
</style>
