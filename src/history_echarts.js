import * as echarts from 'echarts';
(function () {
    // 柱状图1
    var chartDom = document.getElementById('bar1');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            text: '某某数据',
            left: 0,
            top: 2,
            textStyle: {
                color: '#6cb4f3',
                fontSize: 13
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            right: 10,
            top: 0,
            right: 0,
        },
        grid: {
            left: '-8%',
            right: '4%',
            bottom: '10%',
            top: 30,
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
        },
        series: [
            {
                name: '2011',
                type: 'bar',
                data: [18203, 23489, 29034, 104970, 131744, 630230],
                color: '#5744e9'
            },
            {
                name: '2012',
                type: 'bar',
                data: [19325, 23438, 31000, 121594, 134141, 681807]
            }
        ]
    };

    option && myChart.setOption(option);
})();
(function () {
    // 柱状图2
    var chartDom2 = document.getElementById('bar2');
    var myChart2 = echarts.init(chartDom2);
    var option2;

    option2 = {
        title: [
            {
                text: '某某数据',
                textStyle: {
                    fontSize: 13,
                    color: "#6cb4f3",
                }
            },
        ],
        polar: {
            radius: [30, '60%'],
        },
        angleAxis: {
            max: 4,
            startAngle: 75,
        },
        radiusAxis: {
            type: 'category',
            data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
        series: {
            type: 'bar',
            data: [2, 1.2, 2.4, 3.6],
            coordinateSystem: 'polar',
            label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
            }
        }
    };

    option2 && myChart2.setOption(option2);
})();

(function () {
    // 折线图1

    var chartDom3 = document.getElementById('line1');
    var myChart3 = echarts.init(chartDom3);
    var option3;

    option3 = {
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0',
            top: 25,
            containLabel: true,
        },
        title: {
            text: '某某数据折线图',
            left: 0,
            top: 0,
            textStyle: {
                fontSize: 10,
                color: '#6cb4f3'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                color: '#ffffff80',
                fontSize: 12
            },
            axisTick: {
                lineStyle: {
                    color: '#ffffff',
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#ffffff',
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#ffffff80',
                fontSize: 12,
            },
        },
        series: [
            {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line',
                lineStyle: {
                    color: '#2B85FA'
                }
            }
        ]
    };

    option3 && myChart3.setOption(option3);

})();


(function () {
    // 折线图2
    var chartDom4 = document.getElementById('line2');
    var myChart4 = echarts.init(chartDom4);
    var option4;

    option4 = {
        title: {
            text: 'Stacked Area Chart',
            left: 0,
            top: 0,
            textStyle: {
                fontSize: 13,
                color: '#6cb4f3'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '15%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                // label: {
                //     show: true,
                //     position: 'top'
                // },
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    option4 && myChart4.setOption(option4);
})();


(function () {
    // 折线图3
    var chartDom5 = document.getElementById('line3');
    var myChart5 = echarts.init(chartDom5);
    var option5;

    option5 = {
        title: {
            text: 'Stacked Line Chart',
            left: 0,
            top: 0,
            textStyle: {
                fontSize: 13,
                color: '#6cb4f3'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '0',
            top: '22%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }
        ]
    };

    option5 && myChart5.setOption(option5);
})();

