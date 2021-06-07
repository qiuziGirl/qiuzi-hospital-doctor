<template>
  <section v-loading="loading" class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <user-card :user="user" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="Activity" name="activity">
              <user-activity />
            </el-tab-pane>
            <el-tab-pane label="Account" name="account">
              <user-account :user="user" @update="updateDoctor" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import UserActivity from './components/UserActivity'
import UserAccount from './components/UserAccount'

export default {
  name: 'Profile',
  components: {
    UserCard,
    UserActivity,
    UserAccount
  },
  data () {
    return {
      loading: false,
      user: {
        id: null,
        doctorId: '',
        name: '',
        mobile: '',
        email: '',
        avatar: '',
        introduce: ''
      },
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters(['doctorId'])
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      this.loading = true

      try {
        this.user = await $api.doctor.getDoctor(this.doctorId)
      } finally {
        this.loading = false
      }
    },
    async updateDoctor () {
      this.loading = true
      const { id, name, mobile, email, avatar, introduce } = this.user

      try {
        await $api.doctor.updateDoctor(id, { name, mobile, email, avatar, introduce })
        this.getUser()
        this.$notify({
          title: 'Success',
          message: 'Update Successfully',
          type: 'success',
          duration: 2000
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
