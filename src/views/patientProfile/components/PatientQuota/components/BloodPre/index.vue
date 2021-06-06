<template>
  <div :id="id" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import resize from '../mixins/resize'

export default {
  name: 'BloodPre',
  mixins: [resize],
  props: {
    id: {
      type: String,
      default: 'chart-bloodPre'
    },
    diastolicPressure: {
      type: Array,
      default: () => []
    },
    systolicPressure: {
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
        title: { text: '血压', subtext: '单位：mmHg' },
        tooltip: { trigger: 'axis' },
        color: ['orange', '#2486b9'],
        legend: { data: ['收缩压', '舒张压'] },
        xAxis: { type: 'category', boundaryGap: false, data: this.time },
        yAxis: {
          type: 'value',
          min: function (value) {
            return value.min - 20
          },
          max: function (value) {
            if (value.max > 140) {
              return value.max + 20
            }
            return 160
          },
          interval: 20
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
            name: '收缩压',
            type: 'line',
            data: this.diastolicPressure,
            markLine: {
              data: [{ yAxis: 140, name: 'asd', label: { position: 'end', formatter: '警戒' } }],
              lineStyle: { color: '#ee2746' }
            }
          },
          {
            name: '舒张压',
            type: 'line',
            data: this.systolicPressure
          }
        ]
      })
    }
  }
}
</script>
