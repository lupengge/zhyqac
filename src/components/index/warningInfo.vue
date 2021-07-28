<template>
  <div class="section-scorll">
    <chart class="warningInfo" title="设备列表">
      <a-table :columns="columns" :data-source="tableData" :pagination="false" :expandRowByClick="true">
        <a-table slot="expandedRowRender" :expandIconColumnIndex="1" slot-scope="record" :columns="innerColumns" :data-source="record.innerData" :pagination="false" :customRow="click"> </a-table>
      </a-table>
    </chart>
  </div>
</template>

<script>
import mapInteractive from '../../js/map3d/MapInteractive'
import Chart from '../chart.vue'

export default {
  components: {
    Chart
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
  data() {
    return {
      columns: [{ title: '设备-楼层', dataIndex: 'floor', key: 'floor' }],
      innerColumns: [
        // { title: 'floor', dataIndex: 'name', key: 'name' },
        { title: '设备编号', dataIndex: 'deviceType', key: 'deviceType' },
        { title: '状态', dataIndex: 'status', key: 'status' }
      ],
      tableData: [],
      status: ['正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '正常', '离线', '离线', '离线', '故障']
    }
  },
  methods: {
    click(record, index) {
      return {
        on: {
          click: () => {
            console.log(record, index)
            //定位到设备

            let facilityNum = record.deviceType
            let primitives = viewer.scene.primitives.get(1)
            let billboards = primitives._billboards
            for (let billbaord of billboards) {
              if (billbaord._id === facilityNum) {
                // viewer.camera.flyTo({
                //   destination:billbaord._position
                // })
               let transform = Cesium.Transforms.eastNorthUpToFixedFrame(billbaord._position)

                let heading = Cesium.Math.toRadians(50.0)
                let pitch = Cesium.Math.toRadians(-50.0)
                let range = 2.0//距离目标点的位置，单位米
                viewer.camera.lookAt(billbaord._position, new Cesium.HeadingPitchRange(heading, pitch, range))

                viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)

                let floorName=facilityNum.split('_')[0];
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
