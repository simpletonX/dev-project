import { MockMethod } from 'vite-plugin-mock'

const getUserData = () => {
  return [
    {
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home', 'system'],
      token: 'System Token',
    },
    {
      userId: 3,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'guest',
      password: '111111',
      desc: '访客用户',
      roles: ['访客'],
      buttons: ['cuser.detail'],
      routes: ['home', 'guest'],
      token: 'Guest Token',
    },
  ]
}

export default [
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      const token = request.headers.token
      const user = getUserData().find((user) => user.token === token)

      if (!user) {
        return {
          code: 401,
          data: 'User does not exist',
        }
      }

      return {
        code: 200,
        data: user,
      }
    },
  },
  // 登录
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      const user = getUserData().find(
        (user) => user.username === username && user.password === password
      )
      if (!user) {
        return {
          code: 401,
          message: 'The user does not exist',
        }
      }
      return {
        code: 200,
        data: {
          token: user.token,
          message: 'Login successfully',
        },
      }
    },
  },
] as MockMethod[]
