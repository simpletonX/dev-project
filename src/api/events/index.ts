import eventsRequest from '@/api/events-request'

// 登录
export const eventslogin = (data: { username: string; password: string }) => {
  return eventsRequest.post<any, any>('/login_app?userdata=false', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 获取活动列表
export const getActivityList = (data: {
  token: string
  pageIndex: number
  pageSize: number
  activityName?: string
  activityState?: number
}) => {
  return eventsRequest.post<any, any>('/getpractivitylist', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 报名
/**
 * curl -X 'POST' \ 'http://8.134.93.57:9091/api/addactivity' \ -H 'accept: application/json' \ -H'Content-Type: application/x-www-form-urlencoded' \ -d 'token=token&time=enrollStartTime&wid=widusername=2022233203335&activityName=%22activityName%22%3A%20&password=123456'
 */
export const addActivity = (data: {
  token: string
  time: string
  wid: string
  activityName: string
  username: string
  password: string
}) => {
  return eventsRequest.post<any, any>('/addactivity', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
