<template>
  <el-form
    ref="recordForm"
    v-loading="loading"
    :model="record"
    :rules="rules"
    label-position="left"
    class="record-template"
    :hide-required-asterisk="true"
  >
    <div v-show="!isDetail" class="operation-button-group">
      <el-button type="success" @click="handleConfirm">
        确定
      </el-button>
      <el-button type="warning" @click="handleCancel">
        取消
      </el-button>
    </div>

    <div class="record-template-main">
      <el-row>
        <el-col :span="8">
          <el-form-item label="病人：" label-width="70px">
            <el-input v-model="record.patientName" readonly style="width: 220px;" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="时间：" prop="time" label-width="60px">
            <el-date-picker
              v-model="record.time"
              type="datetime"
              :readonly="isDetail"
              format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否转诊：" label-width="90px">
            <el-select v-model="record.change" :readonly="isDetail" placeholder="Please select">
              <el-option label="No" :value="0" />
              <el-option label="Yes" :value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="病情摘要：" prop="diseaseDescribe" label-width="90px">
        <el-input
          v-model="record.diseaseDescribe"
          type="textarea"
          :rows="1"
          :readonly="isDetail"
          class="item-textarea"
          autosize
          placeholder="摘要"
        />
      </el-form-item>
      <el-form-item label="就诊结果：" prop="result" label-width="90px">
        <el-input
          v-model="record.result"
          type="textarea"
          :rows="1"
          :readonly="isDetail"
          class="item-textarea"
          autosize
          placeholder="结果"
        />
      </el-form-item>
      <el-form-item label="医生主诉：" label-width="90px">
        <el-input
          v-model="record.selfTalk"
          type="textarea"
          :rows="1"
          :readonly="isDetail"
          class="item-textarea"
          autosize
          placeholder="主诉"
        />
      </el-form-item>
      <el-form-item label="医生叮嘱：" label-width="90px">
        <el-input
          v-model="record.doctorSuggestion"
          type="textarea"
          :rows="1"
          :readonly="isDetail"
          class="item-textarea"
          autosize
          placeholder="医嘱"
        />
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'RecordTemplate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      record: {},
      rules: {
        time: [{ required: true, message: '时间为必填项', trigger: 'change' }],
        diseaseDescribe: [{ required: true, message: '摘要为必填项', trigger: 'blur' }],
        result: [{ required: true, message: '就诊结果为必填项', trigger: 'blur' }]
      }
    }
  },
  created () {
    const id = this.$route.params && this.$route.params.id

    if (this.isEdit) {
      this.getRecord(id)
    } else {
      this.getAppointment(id)
    }
  },
  methods: {
    async getAppointment (id) {
      const { department, doctorId, doctorName, cardNo, patientName, date, startTime } = await $api.appointment.getAppointment(id)
      this.record = {
        department,
        doctorId,
        doctorName,
        cardNo,
        patientName,
        date,
        time: startTime,
        change: 0
      }
    },
    async getRecord (id) {
      this.record = await $api.record.getRecord(id)
    },
    handleConfirm () {
      if (this.isEdit) {
        this.updateRecord()
      } else {
        this.addRecord()
      }
    },
    addRecord () {
      this.$refs.recordForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const id = this.$route.params && this.$route.params.id

          try {
            await $api.record.addRecord(id, this.record)
            this.$notify({
              title: 'Success',
              message: 'Add Successfully',
              type: 'success',
              duration: 2000
            })
            this.$router.push('/record')
          } finally {
            this.loading = false
          }
        }
      })
    },
    updateRecord () {
      this.$refs.recordForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const id = this.$route.params && this.$route.params.id

          try {
            await $api.record.updateRecord(id, this.record)
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
      })
    },
    handleCancel () {
      if (this.isEdit) {
        this.$router.push('/record')
      } else {
        this.$router.push('/appointment')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.record-template {
  position: relative;
  width: 100%;

  .operation-button-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding: 0 20px;
    background-color: #d0d0d0;
  }

  .record-template-main {
    position: relative;
    padding: 40px 45px 20px 50px;
    margin-bottom: 10px;

    &::after {
      display: block;
      height: 0;
      clear: both;
      font-size: 0;
      visibility: hidden;
      content: " ";
    }
  }
}

.item-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-bottom: 1px solid #bfcbd9;
    border-radius: 0;
  }
}
</style>
