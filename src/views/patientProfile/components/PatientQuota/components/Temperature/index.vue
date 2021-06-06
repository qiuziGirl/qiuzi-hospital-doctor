<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from '../mixins/resize'

export default {
  name: 'Temperature',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart-temperature'
    },
    data: {
      type: Array,
      default: () => []
    },
    time: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    }
  },
  data () {
    return {
      chart: null
    }
  },
  watch: {
    time () {
      this.initChart()
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        title: { text: '体温', subtext: '单位：°C' },
        tooltip: { trigger: 'axis' },
        color: ['#2486b9'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.time
        },
        yAxis: {
          type: 'value',
          min: 36,
          max: 41,
          interval: 1
        },
        dataZoom: [{
          type: 'inside',
          startValue: this.time.length < 15 ? 0 : this.time.length - 15, // 表示默认开始区间
          endValue: this.time.length - 1, // 默认结束区间
          orient: 'horizontal', // 只可以水平拖动
          zoomLock: true // 不能放大缩小
        }],
        series: [
          {
            name: '体温',
            type: 'line',
            data: this.data,
            itemStyle: { normal: { label: { show: true } } }
          }
        ]
      })
    }
  }
}
</script>
