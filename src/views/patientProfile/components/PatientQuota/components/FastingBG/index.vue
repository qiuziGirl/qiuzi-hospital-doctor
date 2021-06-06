<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from '../mixins/resize'

export default {
  name: 'FastingBG',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart-fastingBG'
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
        title: {
          text: '空腹血糖',
          subtext: '单位：mmol/L'
        },
        tooltip: { trigger: 'axis' },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: this.time
        }],
        yAxis: [{
          type: 'value',
          min: function (value) {
            return value.min - 2
          },
          max: function (value) {
            if (value.max > 7) {
              return value.max + 2 // 7 为警戒线
            }
            return 12
          },
          interval: 2
        }],
        dataZoom: [{
          type: 'inside',
          startValue: this.time.length < 15 ? 0 : this.time.length - 15, // 表示默认开始区间
          endValue: this.time.length - 1, // 默认结束区间
          orient: 'horizontal', // 只可以水平拖动
          zoomLock: true // 不能放大缩小
        }],
        series: [{
          name: '空腹血糖',
          type: 'line',
          data: this.data,
          itemStyle: { normal: { label: { show: true } } },
          markLine: {
            data: [{ yAxis: 7, name: 'asd', label: { position: 'end', formatter: '警戒' } }],
            lineStyle: { color: '#ee2746' }
          }
        }
        ]
      })
    }
  }
}
</script>
