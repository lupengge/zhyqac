<template>
  <section class="construction-section">
    <right-side>
      <persion :owner="48" :visitor="5" :other="3" />
      <energy-state />
      <comfort-level />
      <chart title="传感器列表">
        <section class="sensor" :style="sensorStyle">
          <a-table  :columns="columns" :data-source="tableData" :pagination="false" :expandRowByClick="true">
            <a-table slot="expandedRowRender" :expandIconColumnIndex="1" slot-scope="record" :columns="innerColumns" :data-source="record.innerData" :pagination="false" :customRow="click">
               <span slot="status" slot-scope="record">
                 <a-tag :color="record.status === '离线' ? 'orange' : record.status === '故障' ? 'red' : 'rgba(0, 0, 0, 0)'">{{ record.status }}</a-tag>
               </span>
            </a-table>
          </a-table>
        </section>
      </chart>
    </right-side>
  </section>
</template>

<script>
import RightSide from '../components/index/rightSide'
import persion from '@/components/index/persionCount'
import EnergyState from '@/components/index/energyState'
import comfortLevel from '@/components/index/comfortLevel'
import Chart from '@/components/chart.vue'
import mapInteractive from '@/js/map3d/MapInteractive'
export default {
  name: 'construction',
  components: {
    Chart,
    RightSide,
    persion,
    EnergyState,
    comfortLevel
  },
  data() {
    return {
      sensorStyle: {},
      columns: [{ title: '设备-楼层', dataIndex: 'floor', key: 'floor' }],
      innerColumns: [
        // { title: 'floor', dataIndex: 'name', key: 'name' },
        { title: '设备编号', dataIndex: 'deviceType', key: 'deviceType' },
        { title: '状态', key: 'status', scopedSlots: { customRender: 'status' } }
      ],
      tableData: [],
      status: ['正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '离线', '离线', '离线', '故障']
    }
  },
  created() {
    this.tableData = []
    const floor = ['B4', 'F1', 'F11', 'F19', 'F27', 'F34', 'F42', 'F49', 'F55', 'F63', 'F71','桅杆']
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
      }
      this.tableData.push(obj)
    }
  },
  mounted() {
    this.sensorStyle = {
      height:'165%'
    }
  },
  methods: {
    onSelect(keys, event) {
      for (let floorArray of this.treeData) {
        for (let info of floorArray.children) {
          if (info.key === keys[0]) {
            mapInteractive.floorName=info.title;
            mapInteractive.buildFloorSplit(info.title)
            mapInteractive.sceneModel='floorsplit';
          }
        }
      }
    },
    onExpand() {
      console.log('Trigger Expand')
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
                billbaord.状态=record.status;
               let transform = Cesium.Transforms.eastNorthUpToFixedFrame(billbaord._position)
               //提交选中设备的时间
               this.$emit('choseDevice',billbaord)

               let floorName=facilityNum.split('_')[0];

                //进入分层模式,并分层到设备位置
                mapInteractive.intoIndoorScen()
                mapInteractive.sceneModel = 'floorsplit'
                mapInteractive.buildFloorSplit(floorName)

                let heading = Cesium.Math.toRadians(50.0)
                let pitch = Cesium.Math.toRadians(-50.0)
                let range = 2.0//距离目标点的位置，单位米
                viewer.camera.lookAt(billbaord._position, new Cesium.HeadingPitchRange(heading, pitch, range))

                viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)

                viewer.scene.primitives.get(1).show=true;
                viewer.scene.primitives.get(1)._billboards.forEach(billbaord=>{
                  billbaord.show=(billbaord.id.indexOf(floorName)>-1);
                });
              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
