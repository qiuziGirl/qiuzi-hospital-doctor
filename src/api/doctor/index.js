import request from '@/utils/request'

export default {
  getDoctor: id => request({
    url: `/doctor/${id}`,
    method: 'get'
  }),
  updateDoctor: (id, data) => request({
    url: `/doctor/${id}`,
    method: 'put',
    data
  })
}
