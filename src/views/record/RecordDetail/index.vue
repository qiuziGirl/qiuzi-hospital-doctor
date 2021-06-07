<template>
  <record-template :is-edit="true" :is-detail="true" />
</template>

<script>
import RecordTemplate from '../components/RecordTemplate'

export default {
  name: 'RecordDetail',
  components: { RecordTemplate }
}
</script>
