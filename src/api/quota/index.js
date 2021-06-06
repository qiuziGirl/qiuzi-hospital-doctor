import request from '@/utils/request'

export default {
  getQuotaList: params => request({
    url: '/quota',
    method: 'get',
    params
  })
}
