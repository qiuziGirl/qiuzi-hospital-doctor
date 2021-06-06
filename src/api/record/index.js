import request from '@/utils/request'

export default {
  getRecordList: params => request({
    url: '/record',
    method: 'get',
    params
  }),
  getRecord: id => request({
    url: `/record/${id}`,
    method: 'get'
  }),
  updateRecord: (id, data) => request({
    url: `/record/${id}`,
    method: 'put',
    data
  }),
  addRecord: (id, data) => request({
    url: `/record/create/${id}`,
    method: 'post',
    data
  })
}
