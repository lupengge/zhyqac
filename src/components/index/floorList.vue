<template>
  <chart title="结构列表">
    <tabs-page :names="['楼层', '结构', '物联感知设备']">
      <div slot="楼层">
        <section class="floor-list">
          <a-directory-tree multiple @select="onSelect" @expand="onExpand">
            <a-tree-node v-for="tree in treeData" :key="tree.key" :title="tree.title">
              <a-tree-node v-for="child in tree.children" :key="child.key" :title="child.title"></a-tree-node>
            </a-tree-node>
          </a-directory-tree>
        </section>
        <property-modal ref="propertyModalRef"></property-modal>
      </div>
      <div slot="结构">
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="墙" />墙</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="门" />门</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="结构柱" />结构柱</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="窗" />窗</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="幕墙嵌板" />幕墙嵌板</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="幕墙竖梃" />幕墙竖梃</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="楼梯" />楼梯</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="栏杆扶手" />栏杆扶手</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="楼板" />楼板</div>
        <div class="structOption"><input type="checkbox" name="struct" @change="changeStyle" checked value="常规模型" />常规模型</div>
      </div>
      <div slot="物联感知设备" class="sensor" :style="sensorStyle">
        <a-table :columns="columns" :data-source="tableData" :pagination="false" :expandRowByClick="true">
          <a-table slot="expandedRowRender" :expandIconColumnIndex="1" slot-scope="record" :columns="innerColumns" :data-source="record.innerData" :pagination="false" :customRow="click">
            <span slot="status" slot-scope="record">
              <a-tag :color="record.status === '离线' ? 'orange' : record.status === '故障' ? 'red' : 'rgba(0, 0, 0, 0)'">{{ record.status }}</a-tag>
            </span>
          </a-table>
        </a-table>
      </div>
    </tabs-page>
  </chart>
</template>
<script>
import Chart from '../chart.vue'
import propertyModal from './propertyModal'
import mapInteractive from '../../js/map3d/MapInteractive.js'
import { floorViews } from '../../../public/data/floorView.js'
import TabsPage from '../tabsPage.vue'
import { Cesium3DTileStyle } from 'cesium'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'floorList',
  components: {
    Chart,
    propertyModal,
    TabsPage
  },
  data() {
    return {
      sensorStyle: {},
      columns: [{ title: '振荡传感器', dataIndex: 'floor', key: 'floor' }],
      innerColumns: [
        // { title: 'floor', dataIndex: 'name', key: 'name' },
        { title: '设备编号', dataIndex: 'deviceType', key: 'deviceType' },
        { title: '状态', key: 'status', scopedSlots: { customRender: 'status' } }
      ],
      tableData: [],
      status: ['正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '离线', '离线', '离线', '故障'],
      visible: false,
      treeData: [
        {
          title: '避难层',
          key: '0-0',
          icon: 'floor',
          children: [
            { title: 'F11', key: '0-0-0' },
            { title: 'F19', key: '0-0-1' },
            { title: 'F34', key: '0-0-2' },
            { title: 'F49', key: '0-0-3' },
            { title: 'F63', key: '0-0-4' }
          ]
        },
        {
          title: '标准层',
          key: '0-1',
          icon: 'floor',
          children: [
            { title: 'F18', key: '0-1-0' },
            { title: 'F27', key: '0-1-1' },
            { title: 'F34', key: '0-1-2' },
            { title: 'F42', key: '0-1-3' },
            { title: 'F49', key: '0-1-4' }
          ]
        },
        {
          title: '屋顶层',
          key: '0-2',
          icon: 'floor',
          children: [
            { title: 'F70', key: '0-2-0' },
            { title: 'F71', key: '0-2-1' }
          ]
        },
        {
          title: '停机坪',
          key: '0-3',
          icon: 'apron',
          children: [{ title: 'F72', key: '0-3-0' }]
        },
        {
          title: '地下室',
          key: '0-4',
          icon: 'floor',
          children: [
            { title: 'B1', key: '0-4-0' },
            { title: 'B2', key: '0-4-1' },
            { title: 'B3', key: '0-4-2' },
            { title: 'B4', key: '0-4-3' }
          ]
        },
        {
          title: '裙楼',
          key: '0-5',
          icon: 'floor',
          children: [
            { title: 'F1', key: '0-5-0' },
            { title: 'F2', key: '0-5-1' },
            { title: 'F3', key: '0-5-2' },
            { title: 'F4', key: '0-5-3' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState(['deviceState'])
  },
  created() {
    this.tableData = []
    const floor = ['B4', 'F1', 'F11', 'F19', 'F27', 'F34', 'F42', 'F49', 'F55', 'F63', 'F71', '桅杆']
    for (let i = 0; i < floor.length; i++) {
      const obj = {
        floor: floor[i],
        innerData: []
      }
      for (let j = 0; j < 4; j++) {
        obj.innerData.push({
          deviceType: `${floor[i]}_00${j + 1}`,
          status: this.status[Math.floor(Math.random() * this.status.length)]
        })
        /* -----------------------------lpg: 将设备状态信息存到vuex中 ----------------------------- */
        this.setDeviceInfo({ ...this.deviceState, [`${floor[i]}_00${j + 1}`]: this.status[Math.floor(Math.random() * this.status.length)] })
      }
      this.tableData.push(obj)
    }
  },
  mounted() {
    this.sensorStyle = {
      height: document.body.clientHeight - document.querySelector('.tabPage').getBoundingClientRect().y + 'px'
    }
  },
  methods: {
    ...mapMutations(['setDeviceInfo']),
    onSelect(keys, event) {
      console.log('Trigger Select', keys, event)
      for (let floorArray of this.treeData) {
        for (let info of floorArray.children) {
          if (info.key === keys[0]) {
            mapInteractive.floorName = info.title
            //下面两行直接进入到分层显示的模式
            mapInteractive.intoIndoorScen()
            mapInteractive.sceneModel = 'floorsplit'
            //分层
            mapInteractive.buildFloorSplit(info.title)
          }
        }
      }
    },
    onExpand() {
      console.log('Trigger Expand')
    },
    /**lpg: 修改模型的样式，使其按照选定的结构显示 */
    changeStyle(e) {
      mapInteractive.structShowState[e.target.value] = e.target.checked
      mapInteractive.buildFloorSplit()
    },
    click(record, index) {
      return {
        on: {
          click: () => {
            //console.log(record, index)
            //定位到设备
            document.querySelector('.layersBox > .layerBg:nth-child(2)').classList.add('active')
            let facilityNum = record.deviceType
            let primitives = viewer.scene.primitives.get(1)
            let billboards = primitives._billboards

            for (let billbaord of billboards) {
              if (billbaord._id === facilityNum) {
                billbaord.状态 = record.status
                let transform = Cesium.Transforms.eastNorthUpToFixedFrame(billbaord._position)
                //提交选中设备的时间
                this.$emit('choseDevice', billbaord)

                let floorName = facilityNum.split('_')[0]

                //进入分层模式,并分层到设备位置
                mapInteractive.intoIndoorScen()
                mapInteractive.sceneModel = 'floorsplit'

                mapInteractive.buildFloorSplit(floorName)

                let heading = Cesium.Math.toRadians(50.0)
                let pitch = Cesium.Math.toRadians(-50.0)
                let range = 2.0 //距离目标点的位置，单位米
                viewer.camera.lookAt(billbaord._position, new Cesium.HeadingPitchRange(heading, pitch, range))

                viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)



                viewer.scene.primitives.get(1).show = true
                viewer.scene.primitives.get(1)._billboards.forEach(billbaord => {
                  billbaord.show = billbaord.id.indexOf(floorName+'_') > -1
                })
              }
            }
          }
        }
      }
    }
  }
}
</script>
<style>
.structOption {
  width: fit-content;
  margin: 0.5em 20px;
  color: #fff;
  font-size: 18px;
}
</style>
