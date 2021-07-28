// 设备状态窗口
import DeviceStatusWindow from "@/components/DeviceStatus";
import appConfig from "@/js/appConfig"
let cesiumInit = {
    init(el) {
        this.initViewer(el);
        this.load3dtiles();
        this.initMonitors();
        this.setView();

        this.viewer.selectedEntityChanged.addEventListener(e => {
            this.selectedEntityChanged(e);
        });
    },

    //初始化viewer
    initViewer(el) {
        this.viewer = new Cesium.Viewer(el, {
            infoBox: false,
            selectionIndicator: false,
            navigation: false,
            animation: false,
            timeline: false,
            baseLayerPicker: false,
            geocoder: false,
            homeButton: false,
            sceneModePicker: false,
            navigationHelpButton: false,
            shouldAnimate: false,
            // imageryProvider: new Cesium.UrlTemplateImageryProvider({
            //     url: appConfig.imageryProvider
            // })
            imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
            })
        });
        this.viewer.scene.globe.depthTestAgainstTerrain = true;
    },

    //设置默认视图
    setView() {
        let flyToOpts = {
            destination: {
                x: -2552997.1108133984,
                y: 4097831.305986945,
                z: 4154017.331783954
            },
            orientation: {
                heading: 2.382532010169211,
                pitch: -0.5338417557370554,
                roll: 0.002652478338631248
            },
            duration: 1
        };
        this.viewer.scene.camera.flyTo(flyToOpts);
    },

    //初始化点位
    initMonitors() {
        let p1 = Cesium.Cartesian3.fromDegrees(121.9248319402616, 40.89779035529933, 20);
        let p2 = Cesium.Cartesian3.fromDegrees(121.92435768210461, 40.89759625865303, 18);
        let p3 = Cesium.Cartesian3.fromDegrees(121.92543397812894, 40.897983965047615, 19);
        let monitors = [{
            dName: "电缆室",
            dStatus: false,
            dNum: "camera3033232",
            position: p1,
        }, {
            dName: "过滤处理室",
            dStatus: true,
            dNum: "camera5054232",
            position: p2,
        }, , {
            dName: "机房F",
            dStatus: true,
            dNum: "camera6036232",
            position: p3,
        }, ];

        monitors.forEach(item => {
            this.viewer.entities.add({
                position: item.position,
                info: item,
                billboard: {
                    image: 'static/images/blueCamera.png',
                    scaleByDistance: new Cesium.NearFarScalar(500, 1, 1200, 0.8),
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 10000),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                }
            })
        })
    },

    //实体选中事件
    selectedEntityChanged(e) {
        if (!e || !e.position) return;
        if (this.pWindow) {
            this.pWindow.windowClose();
            this.pWindow = undefined;
        }
        this.pWindow = new DeviceStatusWindow(this.viewer, e.position._value, e.info);
    },

    //加载3dtiles数据
    load3dtiles() {
        var tileset = this.viewer.scene.primitives.add(
            new Cesium.Cesium3DTileset({
                url: "http://data.marsgis.cn/3dtiles/max-ytlhz/tileset.json",
            })
        );

        tileset.readyPromise
            .then(tileset => {
                this.viewer.zoomTo(
                    tileset,
                );
            })
            .otherwise(function(error) {
                console.log(error);
            });
    },

    destroy() {
        if (this.pWindow) {
            this.pWindow.windowClose();
            this.pWindow = undefined;
        }
        this.viewer.entities.removeAll();
        this.viewer.imageryLayers.removeAll(true);
        this.viewer.destroy();
    },
}

export default cesiumInit;