<template>
  <section v-loading="loading" class="patient-record">
    <div v-for="item in recordList" :key="item.id">
      <div @click="goToRecordDetail(item.id)">
        <el-card shadow="always" class="card-container">
          <p>就诊地点：秋子医院 {{ item.department }}</p>
          <p>就诊时间：{{ item.time | timeFilters }}</p>
          <p>就诊医生：{{ item.doctorName }}</p>
          <p>病情摘要：{{ item.diseaseDescribe }}</p>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PatientRecord',
  filters: {
    timeFilters (time) {
      return $dayjs(time).format('YYYY-MM-DD HH:mm')
    }
  },
  data () {
    return {
      loading: false,
      recordList: [],
      listQuery: {
        cardNo: this.$route.params && this.$route.params.id
      }
    }
  },
  created () {
    this.getRecordList()
  },
  methods: {
    async getRecordList () {
      this.loading = true

      try {
        const { records } = await $api.record.getRecordList(this.listQuery)
        this.recordList = records
      } finally {
        this.loading = false
      }
    },
    goToRecordDetail (id) {
      this.$router.push({ path: `/record/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-record {
  .card-container {
    width: 80%;
    margin: 20px 0 20px 50px;
    cursor: pointer;
  }
}
</style>
