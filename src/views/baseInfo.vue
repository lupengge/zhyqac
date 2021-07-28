<template>
  <section class="base-info-section">
    <left-side>
      <div class="buildingInfoBox">
        <img src="@/assets/images/关闭.png" class="closeBtn"/>
        <div class="BuildInfoTitle">赛格大厦</div>
        <div class="full buildingInfo">
          <tabs-page
            :names="['建筑信息']">
            <div slot='建筑信息'>
              <table>
                <tr>
                  <td width="35%">建筑地址：</td>
                  <td>深圳市交通干道深南中路与华强北路交汇处</td>
                </tr>
                <tr>
                  <td >建筑高度：</td>
                  <td>355.8米 | 79层</td>
                </tr>
                <tr>
                  <td >建筑类型：</td>
                  <td>商业办公</td>
                </tr>
                <tr>
                  <td >疏散楼梯：</td>
                  <td>八部</td>
                </tr>
                <tr>
                  <td >消防电梯：</td>
                  <td>四部</td>
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
              <a-carousel autoplay arrows>
                <div
                  slot="prevArrow"
                  slot-scope="props"
                  class="custom-slick-arrow"
                  style="left: 10px;zIndex: 1">
                  <a-icon type="left-circle" />
                </div>
                <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
                  <a-icon type="right-circle" />
                </div>
                <div><img class="buildingImgBox" src="@/assets/images/baseInfo/1.jpeg"/></div>
                <div><img class="buildingImgBox" src="@/assets/images/baseInfo/2.jpg"/></div>
                <div><img class="buildingImgBox" src="@/assets/images/baseInfo/3.jpg"/></div>
              </a-carousel>
            </div>
          </tabs-page>
          <tabs-page
            :names="['建筑联系人', '片区民警']" :index="0">
            <div slot='建筑联系人' class="active">
              <contact v-for="(row,i) in architecturalContact" :key="i" :name="row.name" :phone="row.phone" :picture="row.picture"/>
            </div>
            <div slot='片区民警'>
              <contact v-for="(row,i) in localPolice" :key="i+10" :name="row.name" :phone="row.phone" :picture="row.picture"/>
            </div>
          </tabs-page>
        </div>
      </div>
    </left-side>
  </section>
</template>

<script>
import Contact from '@/components/contact.vue'
import leftSide from '@/components/index/leftSide'
import tabsPage from '@/components/tabsPage.vue'
export default {
  name: 'baseInfo',
  components: {
    leftSide,
    Contact,
    tabsPage
  },
  data() {
    return {
      architecturalContact:[
        {
          name:"刘涛",
          phone:"139 1259 6950",
          picture:"默认头像",
        },
        {
          name:"王建国",
          phone:"139 1259 6922",
          picture:"默认头像",
        },
        {
          name:"周传喜",
          phone:"139 1259 6938",
          picture:"默认头像",
        }
      ],
      localPolice:[
        {
          name:"康福尔",
          phone:"139 1259 6950",
          picture:"默认头像",
        },
        {
          name:"王三三",
          phone:"139 1259 6459",
          picture:"默认头像",
        },
        {
          name:"李离熊",
          phone:"139 1259 6950",
          picture:"默认头像",
        },
      ]
    }
  }
}
</script>

<style scoped>
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 200px;
  line-height: 200px;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover,
.ant-carousel >>> .custom-slick-arrow:focus{
  color: #fff;
  opacity: .5;
}

.ant-carousel >>> .slick-slide img {
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  border: 0;
}
</style>
