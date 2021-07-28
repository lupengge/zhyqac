<template>
  <div class="buildingInfoBox">
    <img src="@/assets/images/关闭.png" class="closeBtn"/>
    <div class="BuildInfoTitle">航天科创大厦B栋</div>
    <div class="full buildingInfo">
      <tabs-page
        :names="['建筑信息','应急联系','入驻单位']">
        <div slot='建筑信息'>
          <table>
            <tr>
              <td width="35%">建筑地址：</td>
              <td>深圳市南山区西丽街道翻身路</td>
            </tr>
            <tr>
              <td >建筑高度：</td>
              <td>75米 | 6层</td>
            </tr>
            <tr>
              <td >建筑类型：</td>
              <td>商业办公</td>
            </tr>
            <tr>
              <td >疏散楼梯：</td>
              <td>四部</td>
            </tr>
            <tr>
              <td >消防电梯：</td>
              <td>无</td>
            </tr>
            <tr>
              <td >安全出口：</td>
              <td>36个</td>
            </tr>
            <tr>
              <td >室内消火栓：</td>
              <td>108个</td>
            </tr>
            <tr>
              <td >消防控制室：</td>
              <td>一楼防损办公室</td>
            </tr>
          </table>

          <img class="buildingImgBox" src="http://192.168.188.21/static/1 (1).png"/>
        </div>
        <div slot='应急联系'>
          建筑联系人
          <contact v-for="(row,i) in architecturalContact" :key="i" :name="row.name" :phone="row.phone" :picture="row.picture"/>
          片区民警
          <contact v-for="(row,i) in localPolice" :key="i+10" :name="row.name" :phone="row.phone" :picture="row.picture"/>
        </div>
        <table-with-pagenum slot='入驻单位'
          :cels="{qiye:'企业',roomNum:'楼层房号'}"
          :tableData="settledEnterprise"/>

        </tabs-page>
    </div>
  </div>
</template>

<script>
import Contact from './contact.vue'
import TableWithPagenum from './mainPage/tableWithPagenum.vue'
import tabsPage from './tabsPage.vue'
export default {
  components: { tabsPage, Contact, TableWithPagenum },
  data(){
    return{
      architecturalContact:[
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        },
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        },
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        }
      ],
      localPolice:[
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        },
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        },
        {
        name:"福尔康",
        phone:"139 1259 6950",
        picture:"默认头像",
        },
      ],
      settledEnterprise:[
        {
          index:0,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:1,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:2,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:3,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:4,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:5,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:6,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:7,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:8,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:9,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:10,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:11,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:12,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:13,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:14,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:15,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:16,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:17,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:18,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:19,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:20,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:21,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:22,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:23,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:24,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:25,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:26,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:27,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:28,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:29,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
        {
          index:30,
          qiye:'深圳市~~~科技有限公司',
          roomNum:"1052"
        },
      ]
    }
  }
}
</script>

<style scoped>
  .full{
    width: 100%;
    height: 100%;
  }
  .buildingInfoBox{
    position: fixed;
    background: url('../assets/images/科技框.png') no-repeat;
    top: 9.3vh;
    height: 60vh;
    width: 18vw;
    min-width: 250px;
    left: 4vw;
    background-size: 100% 100%;
    color: aliceblue;
    font-size: 0.8vw;
  }
  .closeBtn{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .BuildInfoTitle{
    width: 80%;
    padding: 10px;
    color: #43E6FE;
    font-weight: 600;
    font-size: 1.2vw;
    float: left;
  }
  .buildingImgBox{
    width: calc(100% - 4px);
    height: 30%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid #adf1ff10;
    margin-top: 10px;
  }
  .buildingInfo{
    width: calc(100% - 30px);
    margin: 0 auto;
  }
  tr{
    height: 1.7em;
  }
  tr:hover{
  box-shadow: inset 0 0 5px 0 #00d4f3;
  }
  tr:hover>td{
    color: #00d4f3;
    transform: scale(1.05);
  }
</style>
