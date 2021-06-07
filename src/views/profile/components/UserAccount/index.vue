<template>
  <section class="account-container">
    <div class="container-left">
      <el-form
        ref="doctorForm"
        :rules="rules"
        :model="user"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model.trim="user.name" style="width: 320px;" />
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile">
          <el-input v-model.trim="user.mobile" style="width: 320px;" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model.trim="user.email" style="width: 320px;" />
        </el-form-item>
        <el-form-item label="Introduce">
          <el-input
            v-model="user.introduce"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5 }"
            style="width: 320px;"
          />
        </el-form-item>
        <el-form-item style="margin-top: 200px;">
          <el-button type="primary" style="width: 500px;" @click="handleSubmit">
            Update
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="container-right">
      <el-upload
        class="avatar-uploader"
        action="api/v1/uploadAvatar"
        :data="{ filePath: 'doctor/avatar' }"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
        :on-success="handleAvatarSuccess"
      >
        <img
          v-if="user.avatar"
          :src="user.avatar"
          class="avatar"
          alt="admin's avatar"
        >
        <i v-else class="el-icon-plus avatar-uploader-icon" style="border: 1px dashed #d9d9d9;" />
      </el-upload>
    </div>
  </section>
</template>

<script>
import { validMobile } from '@/utils/validate'

export default {
  name: 'UserAccount',
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          doctorId: '',
          name: '',
          mobile: '',
          email: '',
          avatar: '',
          introduce: ''
        }
      }
    }
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      if (!validMobile(value)) {
        callback(new Error('Please enter the correct phone number'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
        mobile: [{ required: true, trigger: ['blur', 'change'], validator: validateMobile }],
        email: [
          { required: true, message: 'Email is required', trigger: 'blur' },
          { type: 'email', message: 'Please enter the correct email', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.doctorForm.validate(valid => {
        if (valid) {
          this.$emit('update', this.user)
        }
      })
    },
    beforeAvatarUpload (file) {
      const isIMG = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isIMG) this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')

      if (!isLt1M) this.$message.error('上传头像图片大小不能超过 1MB!')

      return isIMG && isLt1M
    },
    handleAvatarSuccess (result) {
      this.user.avatar = result.data.url
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  line-height: 178px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}

.account-container {
  display: flex;
  width: 700px;
  margin-bottom: 100px;
}

.container-left {
  display: flex;
  width: 500px;
}

.container-right {
  width: 200px;
}
</style>
