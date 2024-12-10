import * as echarts from 'echarts';
import 'echarts-gl'; // 引入echarts-gl库
// 导入jquery
import $ from 'jquery';

(function () {
    const dom = document.getElementById("pin");
    const myChart = echarts.init(dom);
    let option;

    // 生成模拟 3D 饼图的配置项
    function getPie3D(pieData, internalDiameterRatio) {
        const series = [];
        // 总和
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        const legendData = [];
        const k =
            typeof internalDiameterRatio !== "undefined"
                ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
                : 1 / 3;
        // 为每一个饼图数据，生成一个 series-surface 配置
        for (let i = 0; i < pieData.length; i += 1) {
            sumValue += pieData[i].value;
            const seriesItem = {
                name:
                    typeof pieData[i].name === "undefined"
                        ? `series${i}`
                        : pieData[i].name + "  " + pieData[i].value,

                type: "surface",
                parametric: true,
                wireframe: {
                    show: false,
                },
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                    k,
                },
            };
            if (typeof pieData[i].itemStyle !== "undefined") {
                const { itemStyle } = pieData[i];
                typeof pieData[i].itemStyle.color !== "undefined"
                    ? (itemStyle.color = pieData[i].itemStyle.color)
                    : null;
                typeof pieData[i].itemStyle.opacity !== "undefined"
                    ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
                    : null;
                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);
        }
        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i += 1) {
            endValue = startValue + series[i].pieData.value;
            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
            series[i].parametricEquation = getParametricEquation(
                series[i].pieData.startRatio,
                series[i].pieData.endRatio,
                false,
                false,
                k,
                // ，使除了第一个之外的值都是10
                series[i].pieData.value === series[0].pieData.value ? 35 : 10
            );
            startValue = endValue;
            legendData.push(series[i].name);
        }
        // 准备待返回的配置项，把准备好的 legendData、series 传入。
        const option = {
            color: [
                "#2B99EE",
                "#EB7A6A",
                "#4FED7D",
                "#47D8E1",
                "#E1CD47",
                "#4F5AED",
                "#E19D47",
            ],
            legend: {
                type: "scroll",
                data: legendData,
                icon: "roundRect",
                padding: 5,
                itemGap: 20,
                bottom: 10,
                itemWidth: 10, // 设置宽度
                itemHeight: 10, // 设置高度
                selectedMode: true,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 14,
                    lineHeight: 14,
                    rich: {
                        a: {
                            verticalAlign: "middle",
                        },
                    },
                    padding: [0, 0, -3, 0],
                },
            },
            tooltip: {
                formatter: (params) => {
                    if (params.seriesName !== "mouseoutSeries") {
                        return `${params.seriesName
                            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
                            };"></span>${option.series[params.seriesIndex].pieData.value}`;
                    }
                    return "";
                },
            },
            xAxis3D: {
                min: -1,
                max: 1,
            },
            yAxis3D: {
                min: -1,
                max: 1,
            },
            zAxis3D: {
                min: -1,
                max: "dataMax",
            },
            grid3D: {
                show: false,
                boxHeight: 16,
                top: "-18%",
                viewControl: {
                    // 3d效果可以放大、旋转等，请自己去查看官方配置
                    alpha: 27,
                    beta: 70, //旋转角度
                    rotateSensitivity: 1,
                    zoomSensitivity: 0,
                    panSensitivity: 0,
                    // autoRotate: true,
                    distance: 150,
                },
                // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
                postEffect: {
                    // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
                    enable: false,
                    bloom: {
                        enable: true,
                        bloomIntensity: 0.1,
                    },
                    SSAO: {
                        enable: true,
                        quality: "medium",
                        radius: 2,
                    },
                },
            },
            series,
        };
        return option;
    }

    // 生成扇形的曲面参数方程
    function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        h
    ) {
        // 计算
        const midRatio = (startRatio + endRatio) / 2;
        const startRadian = startRatio * Math.PI * 2;
        const endRadian = endRatio * Math.PI * 2;
        const midRadian = midRatio * Math.PI * 2;

        // 如果只有一个扇形，则不实现选中效果。
        if (startRatio === 0 && endRatio === 1) {
            // eslint-disable-next-line no-param-reassign
            isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        // eslint-disable-next-line no-param-reassign
        k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        const hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
            u: {
                min: -Math.PI,
                max: Math.PI * 3,
                step: Math.PI / 32,
            },

            v: {
                min: 0,
                max: Math.PI * 2,
                step: Math.PI / 20,
            },

            x(u, v) {
                if (u < startRadian) {
                    return (
                        offsetX +
                        Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            y(u, v) {
                if (u < startRadian) {
                    return (
                        offsetY +
                        Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                if (u > endRadian) {
                    return (
                        offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
                    );
                }
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },

            z(u, v) {
                if (u < -Math.PI * 0.5) {
                    return Math.sin(u);
                }
                if (u > Math.PI * 2.5) {
                    return Math.sin(u) * h * 0.1;
                }
                // 当前图形的高度是Z根据h（每个value的值决定的）
                return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
            },
        };
    }

    // 传入数据生成 option
    option = getPie3D(
        [
            {
                name: "文学创作",
                value: 160,
            },
            {
                name: "学问追求",
                value: 244,
            },
            {
                name: "自然与风水",
                value: 332,
            },
        ],
        0.75
    );

    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    let hoveredIndex = "";

    // 监听 mouseover，近似实现高亮（放大）效果
    myChart.on("mouseover", function (params) {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;

        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
            // 否则进行高亮及必要的取消高亮操作
        } else {
            // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
            if (hoveredIndex !== "") {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
                isSelected = option.series[hoveredIndex].pieStatus.selected;
                isHovered = false;
                startRatio = option.series[hoveredIndex].pieData.startRatio;
                endRatio = option.series[hoveredIndex].pieData.endRatio;
                k = option.series[hoveredIndex].pieStatus.k;

                // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
                option.series[hoveredIndex].parametricEquation =
                    getParametricEquation(
                        startRatio,
                        endRatio,
                        isSelected,
                        isHovered,
                        k,
                        option.series[hoveredIndex].pieData.value
                    );
                option.series[hoveredIndex].pieStatus.hovered = isHovered;

                // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
                hoveredIndex = "";
            }

            // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
            if (params.seriesName !== "mouseoutSeries") {
                // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
                isSelected = option.series[params.seriesIndex].pieStatus.selected;
                isHovered = true;
                startRatio = option.series[params.seriesIndex].pieData.startRatio;
                endRatio = option.series[params.seriesIndex].pieData.endRatio;
                k = option.series[params.seriesIndex].pieStatus.k;

                // 对当前点击的扇形，执行高亮操作（对 option 更新）
                option.series[params.seriesIndex].parametricEquation =
                    getParametricEquation(
                        startRatio,
                        endRatio,
                        isSelected,
                        isHovered,
                        k,
                        option.series[params.seriesIndex].pieData.value + 5
                    );
                option.series[params.seriesIndex].pieStatus.hovered = isHovered;

                // 记录上次高亮的扇形对应的系列号 seriesIndex
                hoveredIndex = params.seriesIndex;
            }

            // 使用更新后的 option，渲染图表
            myChart.setOption(option);
        }
    });

    // 修正取消高亮失败的 bug
    myChart.on("globalout", function () {
        if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            let isSelected;
            isSelected = option.series[hoveredIndex].pieStatus.selected;
            let isHovered;
            isHovered = false;
            let k;
            k = option.series[hoveredIndex].pieStatus.k;
            let startRatio;
            startRatio = option.series[hoveredIndex].pieData.startRatio;
            let endRatio;
            endRatio = option.series[hoveredIndex].pieData.endRatio;

            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            option.series[hoveredIndex].parametricEquation = getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                option.series[hoveredIndex].pieData.value
            );
            option.series[hoveredIndex].pieStatus.hovered = isHovered;

            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
        }

        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
    });

    if (option && typeof option === "object") {
        myChart.setOption(option);
    }
})();

// 人物关系图
(function () {
    var ROOT_PATH = '/resources/data/randomShip.json';

    var chartDom = document.getElementById('ship');
    var myChart = echarts.init(chartDom);
    var option;

    myChart.showLoading();
    myChart.showLoading();
    $.get(ROOT_PATH, function (webkitDep) {
        myChart.hideLoading();
        option = {
            legend: {
                data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    animation: false,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    draggable: true,
                    data: webkitDep.nodes.map(function (node, idx) {
                        node.id = idx;
                        return node;
                    }),
                    categories: webkitDep.categories,
                    force: {
                        edgeLength: 5,
                        repulsion: 20,
                        gravity: 0.2
                    },
                    edges: webkitDep.links
                }
            ]
        };
        myChart.setOption(option);
    });

    option && myChart.setOption(option);

})();

// 中国路径图
(function () {
    const charts = echarts.init(document.getElementById('path'))
    $.get('/resources/data/china.json', function (china) {
        let points = [
            // 散点图数据
            {
                name: '浙江',
                value: [120.152575, 30.266619],
                itemStyle: { color: '#00EEFF' },
            }, // 浙江
            {
                name: '北京',
                value: [116.407387, 39.904179],
                itemStyle: { color: '#00EEFF' },
            }, // 北京
            {
                name: '陕西',
                value: [108.953939, 34.266611],
                itemStyle: { color: '#00EEFF' },
            }, // 陕西
            {
                name: '广东',
                value: [113.266887, 23.133306],
                itemStyle: { color: '#00EEFF' },
            }, // 广东
            {
                name: '河南',
                value: [113.753094, 34.767052],
                itemStyle: { color: '#A6283F' },
            }, // 河南
        ]
        let linesData = [
            // 线条数据
            {
                coords: [
                    [113.266887, 23.133306],
                    [120.152575, 30.266619],
                ],
            }, // 广东->浙江
            {
                coords: [
                    [113.266887, 23.133306],
                    [116.407387, 39.904179],
                ],
            }, // 广东->北京
            {
                coords: [
                    [113.266887, 23.133306],
                    [108.953939, 34.266611],
                ],
            }, // 广东 -> 陕西
            {
                coords: [
                    [113.266887, 23.133306],
                    [113.753094, 34.767052],
                ],
            } // 广东 -> 河南
        ]
        let planePath = // 飞机svg
            'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

        const option = {
            // backgroundColor: '#0E2152', // 背景颜色
            geo: {
                // 地图配置
                map: 'china',
                label: {
                    // 图形上的文本标签
                    normal: {
                        // 通常状态下的样式
                        show: false,
                        textStyle: {
                            color: '#fff',
                        },
                    },
                    emphasis: {
                        // 鼠标放上去高亮的样式
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
                itemStyle: {
                    // 地图区域的样式设置
                    normal: {
                        // 通常状态下的样式
                        borderColor: '#5089EC',
                        borderWidth: 1,
                        areaColor: {
                            //地图区域的颜色
                            type: 'radial', // 径向渐变
                            x: 0.5, // 圆心
                            y: 0.5, // 圆心
                            r: 0.8, // 半径
                            colorStops: [
                                {
                                    // 0% 处的颜色
                                    offset: 0,
                                    color: 'rgba(0, 102, 154, 0)',
                                },
                                {
                                    // 100% 处的颜色
                                    offset: 1,
                                    color: 'rgba(0, 102, 154, .4)',
                                },
                            ],
                        },
                    },
                    // 鼠标放上去高亮的样式
                    emphasis: {
                        areaColor: '#2386AD',
                        borderWidth: 0,
                    },
                },
                zoom: 2.0,
                center: [112, 31]
            },
            series: [
                {
                    // 散点系列数据
                    type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
                    coordinateSystem: 'geo', //该系列使用的坐标系:地理坐标系
                    // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
                    effectType: 'ripple',
                    // 配置何时显示特效。可选'render'和'emphasis' 。
                    showEffectOn: 'emphasis',
                    rippleEffect: {
                        // 涟漪特效相关配置。
                        period: 10, // 动画的周期，秒数。
                        scale: 4, // 动画中波纹的最大缩放比例。
                        // 波纹的绘制方式，可选 'stroke' 和 'fill'。
                        brushType: 'fill',
                    },
                    zlevel: 1, // 所有图形的 zlevel 值。
                    data: points,
                },
                {
                    // 线条系列数据
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'], // 标记的图形: 箭头
                    symbolSize: 10, // 标记的大小
                    effect: {
                        // 线条特效的配置
                        show: true,
                        period: 6, // 特效动画的时间，单位s
                        trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
                        symbol: planePath, // 特效图形的标记 可选'circle'等
                        symbolSize: 15, // 特效标记的大小
                    },
                    lineStyle: {
                        // 线条样式
                        normal: {
                            color: '#93EBF8',
                            width: 1.5, // 线条宽度
                            opacity: 0.6, // 尾迹线条透明度
                            curveness: 0.2, // 尾迹线条曲直度
                        },
                    },
                    data: linesData,
                },
            ],
        }
        // 地图注册，第一个参数的名字必须和option.geo.map一致
        echarts.registerMap('china', china)
        charts.setOption(option)
    })
})();
