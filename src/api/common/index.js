import request from '@/utils/request'

export default {
  login: data => request({
    url: '/doctor/login',
    method: 'post',
    data
  }),
  getInfo: params => request({
    url: '/doctor/info',
    method: 'get',
    params
  }),
  logout: () => request({
    url: '/doctor/logout',
    method: 'post'
  })
}
