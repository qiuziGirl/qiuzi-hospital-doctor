<template>
  <section v-loading="loading" class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <user-card :patient="patient" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs value="quota">
            <el-tab-pane label="Quota" name="quota">
              <patient-quota :id="patient.cardNo" />
            </el-tab-pane>
            <el-tab-pane label="Record" name="record">
              <patient-record />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import UserCard from './components/UserCard'
import PatientQuota from './components/PatientQuota'
import PatientRecord from './components/PatientRecord'

export default {
  name: 'PatientProfile',
  components: {
    UserCard,
    PatientQuota,
    PatientRecord
  },
  data () {
    return {
      loading: false,
      patient: null
    }
  },
  created () {
    this.getPatient()
  },
  methods: {
    async getPatient () {
      this.loading = true
      const id = this.$route.params?.id ?? null

      try {
        this.patient = await $api.patient.getPatient(id)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
