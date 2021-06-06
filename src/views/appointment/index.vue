<template>
  <el-container class="app-container">
    <el-header class="filter-container">
      <el-input
        v-model.trim="listQuery.patientName"
        placeholder="Patient Name"
        clearable
        style="width: 200px;"
        class="filter-item"
        @clear="handleFilter"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="listQuery.date"
        type="date"
        clearable
        placeholder="Pick a date"
        style="width: 130px;"
        class="filter-item"
        @clear="handleFilter"
        @change="handleFilter"
      />
      <el-select
        v-model="listQuery.status"
        placeholder="Status"
        clearable
        style="width: 130px;"
        class="filter-item"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.key"
          :label="item.displayName"
          :value="item.key"
        />
      </el-select>
      <el-button
        class="filter-item"
        style="margin-left: 15px;"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
    </el-header>

    <el-main>
      <el-table
        v-loading="listLoading"
        :data="appointmentList"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          label="ID"
          align="center"
          type="index"
          width="70"
        />
        <el-table-column label="PatientName" align="center" min-width="80">
          <template v-slot="{ row }">
            <router-link :to="'/patient-profile/' + row.cardNo" class="link-type">
              <span>{{ row.patientName }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="CardNo" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.cardNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Department" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Doctor" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.doctorName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="listQuery.status === 0"
          label="Actions"
          align="center"
          min-width="80"
        >
          <template v-slot="{ row }">
            <router-link :to="'/record/create/' + row.id">
              <el-button type="primary" size="mini">
                Consult
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <qz-pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getAppointmentList"
      />
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

const statusOptions = [
  { key: 0, displayName: '未就诊' },
  { key: 1, displayName: '已就诊' },
  { key: -1, displayName: '已失效' }
]

export default {
  name: 'Appointment',
  data () {
    return {
      appointmentList: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 15,
        date: '',
        doctorId: null,
        status: 0
      },
      statusOptions
    }
  },
  computed: {
    ...mapGetters(['doctorId'])
  },
  created () {
    this.getAppointmentList()
  },
  methods: {
    async getAppointmentList () {
      this.listLoading = true
      this.listQuery.doctorId = this.doctorId

      try {
        const { total, appointments } = await $api.appointment.getAppointmentList(this.listQuery)

        this.total = total
        this.appointmentList = appointments
      } finally {
        this.listLoading = false
      }
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getAppointmentList()
    }
  }
}
</script>
