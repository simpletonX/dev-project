<template>
  <!-- layout -> 面包屑顶栏 -->
  <div class="breadcrumb-topbar h-full px-6 h-full flex items-center">
    <div class="breadcrumb-container w-full h-full border-b border-surface-200 dark:border-surface-800">
      <div class="h-full flex justify-between items-center relative">
        <Breadcrumb class="dark:bg-surface-950" :home="{ icon: 'pi pi-home', route: '/' }" :model="breadcrumbItems">
          <template #item="{ item, props }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a :href="href" v-bind="props.action" @click="navigate" class="truncate">
                <span :class="[item.icon, 'text-color']" />
                <span class="dark:text-surface-0 hover:opacity-70">{{ item.label }}</span>
              </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action" class="truncate">
              <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
            </a>
          </template>
        </Breadcrumb>

        <div class="absolute right-0 flex items-center">
          <Select
            v-model="currentLocale_"
            :options="availableLocales"
            option-label="label"
            option-value="code"
            @change="changeLocaleReload"
          >
            <template #option="{ option }">
              <span class="fi mr-3 text-base" :class="`fi-${option.code}`"></span>
              <div class="text-base">{{ option.label }}</div>
            </template>
            <template #value="{ value }">
              <span class="fi mr-3" :class="`fi-${value}`"></span>
              <span>{{ currentLocaleLabel }}</span>
            </template>
          </Select>

          <SelectButton
            class="ml-3"
            v-model="currentTheme"
            :options="themeOptions"
            optionLabel="label"
            optionValue="key"
            @change="toggleTheme"
          />

          <div class="user-info flex items-center ml-4 cursor-pointer">
            <img :src="userInfo?.avatar" class="w-[34px] h-[34px] rounded-full object-cover" @click="togglePopover" />
            <Popover ref="op" class="w-[180px] p-2">
              <div class="header text-center">
                <div class="flex justify-center">
                  <img :src="userInfo?.avatar" class="rounded-full object-cover mb-2 w-[80px] h-[80px]" />
                </div>
                <div>{{ userInfo?.name }}</div>
                <Button :label="t('loginPage.logout')" class="w-full mt-2" size="small" @click="logout" />
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { logoutAction } = userStore

const router = useRouter()
const logout = () => {
  router.push('/login')
  logoutAction()
}

// 浅/暗主题切换逻辑
// toggleTheme 切换主题 true:表示暗主题，为html添加dark类
// themeOptions 主题列表 [{ label: 'Light', value: false }, { label: 'Dark', value: true }]
// currentTheme 当前主题 ref(false|true) true:表示暗主题
import { useTheme } from '@/utils/theme'
const { toggleTheme, currentTheme, themeOptions } = useTheme()

// 国际化切换逻辑
// currentLocale -> 当前语言 ref('us'|'ru'|'zh'|'de')
// availableLocales -> 可选语言列表 Array<{ code: string; label: string }>
// currentLocaleLabel -> 当前语言描述 string 'English'|'Русский'|'中文简体'|'Deutsch'
import { useLanguage } from '@/utils/i18n'
const { currentLocale, availableLocales, changeLocale } = useLanguage()
const currentLocaleLabel = computed(() => {
  return availableLocales.find((locale: { code: string; label: string }) => locale.code === currentLocale_.value)?.label
})
const currentLocale_ = ref(currentLocale.value)
function changeLocaleReload() {
  changeLocale(currentLocale_.value, () => window.location.reload())
}

// 面包屑导航数据
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const route = useRoute()
const breadcrumbItems = computed(() => {
  return route.matched
    .filter((item) => item.meta.preset)
    .map((item) => ({
      label: t(`routerLabels.${item.meta.preset as string}`),
      route: item.path,
    }))
})
// const breadcrumbItems = ref([
//   { label: 'Home', route: '/' },
//   { label: 'Dashboard' },
//   { label: 'Analytics' },
// ])

const op = ref()
const togglePopover = (event) => {
  op.value.toggle(event)
}
</script>

<style scoped lang="scss"></style>
