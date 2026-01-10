<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
// import echarts from 'echarts'
import * as echarts from "echarts";
// import resize from './mixins/resize'

export default {
  // mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    cData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      chartData: null
    }
  },
  watch: {
    'cData.y'(e) {
      this.chartData = this.cData
      this.initChart()
    }
  },
  mounted() {
    this.chartData = this.cData

    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        legend: {
          show: true
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '0',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { // 恒线
            show: true,
            lineStyle: {
              color: '#ffffff60'
            }
          },
          axisLabel: { // y轴坐标
            margin: 10,
            show:true,
            textStyle: {
              color: '#ffffff50',
              fontSize: 12
            },
            data: [8,10,12,14,16,18,20,22,23]

          },
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: { // 竖线
            show: true,
            lineStyle: {
              color: '#ffffff60'
            }
          },
          axisLabel: { // y轴坐标
            margin: 10,
            show:true,
            textStyle: {
              color: '#ffffff50',
              fontSize: 12
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }],
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [{
          name: this.chartData.seriesName,
          type: 'line',
          smooth: false,
          symbol: 'circle',
          symbolSize: 7,
          showSymbol: true,
          lineStyle: {
            normal: {
              width: 2
            }
          },
          areaStyle: {//区域填充渐变颜色
          color: {
              type: 'linear',
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [{
                  offset: 0, color: this.chartData.color[0] // 0% 处的颜色
              }, {
                  offset: 1, color: this.chartData.color[1] // 100% 处的颜色
              }],
          }
        },
          itemStyle: {
            normal: {
              color: this.chartData.color[0]
            }
          },
          data: this.chartData.y
        }]
      })
    }
  }
}
</script>
