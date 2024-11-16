import * as echarts from 'echarts';
const geoJson = "https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=370200_full"
const myChart = echarts.init(document.getElementById("map"))
// 注册地图名字(china)和数据(geoJson)
echarts.registerMap("china", geoJson)
// 图表配置项
const option = {
    series: [
        {
            type: 'map3D',
            map: 'china'
        }
    ]
}
// 设置图表实例的配置项以及数据
myChart.setOption(option)