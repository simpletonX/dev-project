<template>
  <div class="py-10 px-7">
    <template v-if="!token">
      <InputText type="text" v-model="username" placeholder="请输入账号" class="mr-3" />
      <InputText type="text" v-model="password" placeholder="请输入密码" class="mr-3" />
      <Button @click="eventslogin">登录</Button>
    </template>
    <template v-else>
      <p class="username text-blue-400 font-bold mb-2">[ {{ username }} ]</p>
      <span class="mr-3">{{ token }}</span>
      <Button @click="logout">退出登录</Button>

      <div class="activity-list mt-10">
        <div class="totalRecords-list flex flex-wrap justify-between">
          <div
            class="totalRecords-item w-[calc(50%-20px)] mb-10 flex items-center"
            v-for="(item, index) in totalRecords"
            :key="index"
          >
            <Image
              preview
              :src="item.posterUrl[0].httpUrl"
              class="p-image-custom w-[140px] h-[130px] object-cover rounded-lg mr-5 bg-surface-100"
            />
            <div class="text-area">
              <div class="activityName">
                <span>{{ item.activityName }}</span>
                <Tag severity="info" class="ml-2">{{ item.activityStateDesc }}</Tag>
                <Tag
                  class="ml-2"
                  severity="danger"
                  v-if="
                    item.isCommunityDesc.indexOf('德育') > -1 ||
                    item.title.indexOf('德育') > -1
                  "
                  >德育</Tag
                >
                <Tag
                  class="ml-2"
                  severity="info"
                  v-else-if="
                    item.isCommunityDesc.indexOf('劳育') > -1 ||
                    item.title.indexOf('劳育') > -1
                  "
                  >劳育</Tag
                >
                <Tag
                  class="ml-2"
                  severity="secondary"
                  v-else-if="
                    item.isCommunityDesc.indexOf('美育') > -1 ||
                    item.title.indexOf('美育') > -1
                  "
                  >美育</Tag
                >
                <Tag
                  class="ml-2"
                  severity="success"
                  v-else-if="
                    item.isCommunityDesc.indexOf('智育') > -1 ||
                    item.title.indexOf('智育') > -1
                  "
                  >智育</Tag
                >
                <Tag class="ml-2" severity="secondary" v-else>嗨佬活动</Tag>
              </div>
              <div class="flex items-center mt-2">
                <div class="start-time">报名时间 {{ item.enrollStartTime }}</div>
                <div class="peopleGroupTypeDesc text-surface-500 ml-2 text-sm">
                  限：{{ item.peopleGroupTypeDesc }}
                </div>
                <div class="isCommunityDesc">{{ item.isCommunityDesc.split('-')[1] }}</div>
              </div>
              <div class="flex items-center mt-2">
                <Tag class="contractorName">{{ item.contractorName }}</Tag>
                <Button
                  size="small"
                  severity="warn"
                  outlined
                  class="mr-2 ml-2"
                  @click="openDetail(item)"
                  >详情</Button
                >
                <Button size="small" severity="info" outlined @click="addActivity(item)"
                  >{{ item.limitDesc }} 预报名</Button
                >
              </div>
              <div class="flex items-center mt-2">
                <Tag class="activityAddr">
                  {{ item.activityAddr }}
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <Drawer v-model:visible="visible" header="活动详情" class="lg:!w-[40rem]">
      <div
        class="detail-item flex items-center px-5 py-2"
        v-for="(item, index) in Object.keys(currentItem)"
        :key="index"
        :class="{ 'bg-surface-100 dark:bg-surface-800': index % 2 === 1 }"
      >
        <div class="key w-[32%]">{{ item }}:</div>
        <template v-if="item === 'posterUrl'">
          <div v-for="(img, i) in currentItem['posterUrl']" :key="i">
            <Image :src="img.httpUrl" preview class="h-[74px] bg-surface-100" />
          </div>
        </template>
        <template v-else>
          <div class="value w-[68%]">{{ currentItem[item] }}</div>
        </template>
      </div>
    </Drawer>
    <!-- 
      curl -X 'POST' \
      'http://8.134.93.57:9091/api/login_app?userdata=false' \
      -H 'accept: application/json' \
      -H 'Content-Type: application/x-www-form-urlencoded' \
      -d 'username=2022233203335&password=123456'

      curl -X 'POST' \ 'http://8.134.93.57:9091/api/getpractivitylist' \ -H 'accept: application/json' \ -H'Content-Type: application/x-www-form-urlencoded' \ -d 'token=1111&pageIndex=10&pageSize=1&activityName活动名字&activityState=1'

      curl -X 'POST' \ 'http://8.134.93.57:9091/api/addactivity' \ -H 'accept: application/json' \ -H'Content-Type: application/x-www-form-urlencoded' \ -d 'token=token&time=enrollStartTime&wid=widusername=2022233203335&activityName=%22activityName%22%3A%20&password=123456'
    -->
  </div>
</template>

<script setup lang="ts">
import { getLocalStorage, setLocalStorage } from '@/utils/localStorge'
import {
  eventslogin as eventsloginAPI,
  getActivityList as getActivityListAPI,
  addActivity as addActivityAPI,
} from '@/api/events'

const username = ref(getLocalStorage('events-username') || '')
const password = ref(getLocalStorage('events-password') || '')
const token = ref(getLocalStorage('events-token') || '')

// 登录
const eventslogin = () => {
  eventsloginAPI({ username: username.value, password: password.value }).then((res) => {
    setLocalStorage('events-token', res.token)
    setLocalStorage('events-username', username.value)
    setLocalStorage('events-password', password.value)
    token.value = res.token
  })
}
// 退出登录
const logout = () => {
  setLocalStorage('events-token', '')
  token.value = ''
}
// 获取活动列表
const currentIndex = ref(1)
const totalRecords = ref<any[]>([])
const getActivityList = () => {
  getActivityListAPI({
    token: token.value,
    pageIndex: currentIndex.value,
    pageSize: 100,
    activityState: 1,
  }).then((res) => {
    totalRecords.value = res.map((item) => ({
      ...item,
      posterUrl: JSON.parse(item.posterUrl || [{ httpUrl: '' }]),
    }))
  })
}
watch(
  token,
  (newVal) => {
    if (newVal) {
      getActivityList()
    }
  },
  { immediate: true }
)

// 报名
import toast from '@/utils/primevue-service/toast'
const addActivity = async ({
  activityName,
  wid,
  enrollStartTime,
}: {
  activityName: string
  wid: string
  enrollStartTime: string
}) => {
  const res: { message?: string } = await addActivityAPI({
    token: token.value,
    time: enrollStartTime,
    wid,
    activityName,
    username: username.value,
    password: password.value,
  })
  if (res.message) {
    toast({
      severity: 'success',
      summary: res.message,
      closable: false,
    })
  }
}

// 详情
const currentItem = ref({})
const visible = ref(false)
const openDetail = (item) => {
  currentItem.value = item
  visible.value = true
}
</script>

<style>
.p-image-custom {
  padding: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>
