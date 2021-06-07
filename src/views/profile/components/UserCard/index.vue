<template>
  <el-card style="margin-bottom: 20px;">
    <div slot="header">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hello</div>
          Doctor
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="introduce" />
          <span>Introduce</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ user.introduce }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon icon-class="skill" />
          <span>Skills</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>外科</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>针灸</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>推拿</span>
            <el-progress :percentage="12" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          doctorId: '',
          name: '',
          email: '',
          avatar: '',
          introduce: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  display: table;
  margin: 0 auto;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: 700;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-size: 14px;
    font-weight: 400;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    padding: 15px 0;
    font-size: 14px;

    .user-bio-section-header {
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: 700;
      border-bottom: 1px solid #dfe6ec;
    }
  }
}
</style>
