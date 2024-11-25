var ROOT_PATH = '/resources/data/friendship.json';

var chartDom = document.getElementById('ship');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.get(ROOT_PATH, function (graph) {
    myChart.hideLoading();
    graph.nodes.forEach(function (node) {
        node.label = {
            show: node.symbolSize > 30
        };
    });
    option = {
        // title: {
        //     text: 'Les Miserables',
        //     subtext: 'Default layout',
        //     top: 'bottom',
        //     left: 'right'
        // },
        tooltip: {},
        legend: [
            {
                // selectedMode: 'single',
                data: graph.categories.map(function (a) {
                    return a.name;
                })
            }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                legendHoverLink: false,
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
});

option && myChart.setOption(option);
