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
        v-model="listQuery.change"
        placeholder="Change"
        clearable
        style="width: 130px;"
        class="filter-item"
        @change="handleFilter"
        @clear="handleFilter"
      >
        <el-option label="No" :value="0" />
        <el-option label="Yes" :value="1" />
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
        :data="recordList"
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
            <span>{{ row.patientName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="CardNo" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.cardNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Date" align="center" min-width="80">
          <template v-slot="{ row }">
            <span>{{ row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Action" align="center" min-width="80">
          <template v-slot="{ row }">
            <router-link :to="'/record/edit/' + row.id">
              <el-button type="primary">
                Edit
              </el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>

      <qz-pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getRecordList"
      />
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Record',
  data () {
    return {
      recordList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 15,
        date: '',
        doctorName: '',
        patientName: '',
        change: null
      }
    }
  },
  computed: {
    ...mapGetters(['doctorId'])
  },
  created () {
    this.getRecordList()
  },
  methods: {
    async getRecordList () {
      this.listLoading = true
      this.listQuery.doctorId = this.doctorId

      if (this.listQuery.change === '') {
        this.listQuery.change = null
      }

      try {
        const { records, total } = await $api.record.getRecordList(this.listQuery)
        this.total = total
        this.recordList = records
      } finally {
        this.listLoading = false
      }
    },
    handleFilter () {
      this.listQuery.page = 1
      this.getRecordList()
    }
  }
}
</script>
