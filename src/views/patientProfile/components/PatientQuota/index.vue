<template>
  <div class="patient-quota">
    <div class="echarts">
      <blood-pre :time="time" :diastolic-pressure="diastolicPressure" :systolic-pressure="systolicPressure" />
      <fasting-bg :time="time" :data="fastingBlood" />
      <random-bg :time="time" :data="randomBlood" />
      <weight :time="time" :data="weight" />
      <waist :time="time" :data="waist" />
      <hipline :time="time" :data="hipline" />
      <temperature :time="time" :data="temperature" />
    </div>
  </div>
</template>

<script>
import BloodPre from './components/BloodPre'
import FastingBG from './components/FastingBG'
import RandomBG from './components/RandomBG'
import Hipline from './components/Hipline'
import Weight from './components/Weight'
import Waist from './components/Waist'
import Temperature from './components/Temperature'

export default {
  name: 'PatientQuota',
  components: {
    Waist,
    Weight,
    Hipline,
    BloodPre,
    Temperature,
    'fasting-bg': FastingBG,
    'random-bg': RandomBG
  },
  data () {
    return {
      loading: false,
      time: [],
      weight: [],
      waist: [],
      hipline: [],
      temperature: [],
      diastolicPressure: [],
      systolicPressure: [],
      fastingBlood: [],
      randomBlood: []
    }
  },
  created () {
    this.getQuotaList()
  },
  methods: {
    async getQuotaList () {
      this.loading = true
      const id = this.$route.params.id

      try {
        const { quotas } = await $api.quota.getQuotaList({ id })
        this.sortData(quotas)
      } finally {
        this.loading = false
      }
    },
    sortData (data) {
      for (let i = 0; i < data.length; i++) {
        this.time.push(data[i].time.substring(2))
        this.weight.push(data[i].weight)
        this.waist.push(data[i].waist)
        this.hipline.push(data[i].hipline)
        this.temperature.push(data[i].temperature)
        this.diastolicPressure.push(data[i].diastolicPressure)
        this.systolicPressure.push(data[i].systolicPressure)
        this.fastingBlood.push(data[i].fastingBlood)
        this.randomBlood.push(data[i].randomBlood)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-quota {
    width: 100%;
    height: 80vh;
    overflow-y: scroll;

    .echarts {
      width: 80%;
      margin: 0 auto;
    }
  }
</style>
