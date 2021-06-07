<template>
  <el-card style="margin-bottom: 20px;">
    <div slot="header" class="clearfix">
      <span>About patient</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="patient.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <div>Hey</div>
          Patient
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ patient.name }}
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-house" />
          <span>Address</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ patient.address }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-phone" />
          <span>Phone</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ patient.mobile }}
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <i class="el-icon-date" />
          <span>Birth</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            {{ patient.birth }}
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  name: 'UserCard',
  components: { PanThumb },
  props: {
    patient: {
      type: Object,
      default: () => {
        return {
          cardNo: null,
          name: '',
          birth: '',
          mobile: '',
          address: '',
          avatar: ''
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
