import request from '@/utils/request'

export default {
  getPatient: id => request({
    url: `/patient/${id}`,
    method: 'get'
  })
}
