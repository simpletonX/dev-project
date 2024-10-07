<template>
  <div class="login">
    <div class="login-container flex justify-center items-center">
      <div
        class="bg-surface-0 dark:bg-surface-900 w-[500px] shadow px-10 pt-14 pb-10 rounded-lg"
      >
        <header>
          <div class="text-xl font-bold mb-2">{{ $t('loginPage.title') }}</div>
          <div class="text-base text-gray-500">{{ $t('loginPage.description') }}</div>
        </header>

        <main class="mt-12">
          <form @submit="onSubmit">
            <div class="field">
              <label for="username" class="font-bold text-base mb-2">{{
                $t('loginPage.username')
              }}</label>
              <InputText
                id="username"
                v-model="username"
                aria-describedby="username-help"
                :placeholder="$t('loginPage.usernamePlaceholder')"
                :invalid="!!errors.username"
                class="w-full mt-1"
              />
              <small class="text-red-400" id="username-help">{{ errors.username }}</small>
            </div>
            <div class="field mt-5">
              <label for="password" class="font-bold text-base mb-2">{{
                $t('loginPage.password')
              }}</label>
              <InputText
                id="password"
                v-model="password"
                aria-describedby="password-help"
                :placeholder="$t('loginPage.passwordPlaceholder')"
                :invalid="!!errors.password"
                class="w-full mt-1"
              />
              <small class="text-red-400" id="password-help">{{ errors.password }}</small>
            </div>
            <Button class="w-full mt-6" type="submit" :loading="loading">{{
              $t('loginPage.login')
            }}</Button>
          </form>
        </main>

        <footer class="mt-6 flex justify-center items-center">
          <SelectButton
            v-model="currentTheme"
            :options="themeOptions"
            option-label="label"
            option-value="value"
            @change="toggleTheme"
          />
          <Select
            v-model="currentLocale"
            :options="availableLocales"
            option-label="label"
            option-value="code"
            class="ml-2"
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
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { useUserStore } from '@/stores/modules/user'
import { useLanguage } from '@/modules/i18n'
import { useTheme } from '@/modules/theme'
import type { LoginBody } from '@/service/user/types'
const { currentLocale, availableLocales, t } = useLanguage()

// 表单校验逻辑 -> vee-validate
// username: 用户名[字符串, 必填, 最小长度6]
// password: 密码[字符串, 必填, 最小长度6]
// i18n-国际化校验错误消息
const schema = yup.object({
  username: yup
    .string()
    .required(() => t('loginPage.formValidate.usernameRequired'))
    .min(5, () => t('loginPage.formValidate.usernameMinAndMax'))
    .max(10, () => t('loginPage.formValidate.usernameMinAndMax')),
  password: yup
    .string()
    .required(() => t('loginPage.formValidate.passwordRequired'))
    .min(5, () => t('loginPage.formValidate.passwordMinAndMax'))
    .max(15, () => t('loginPage.formValidate.passwordMinAndMax')),
})

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
})

const [username] = defineField('username')
const [password] = defineField('password')

// 表单校验通过后，提交登录
// loginAction 登录接口调用[stores-actions]
// loading 当前登录按钮加载状态
// requestTimer 延迟400ms请求登录（防止loading闪烁）
const { loginAction } = useUserStore()
const router = useRouter()
const loading = ref(false)
const requestTimer = ref<number | undefined>(undefined)
const onSubmit = handleSubmit((values) => {
  loading.value = true

  clearTimeout(requestTimer.value)
  requestTimer.value = setTimeout(async () => {
    const res = await loginAction(values as LoginBody, t('loginPage.loginSuccess'))

    if (res?.code === 200) router.replace('/')
    loading.value = false
  }, 400)
})

// 国际化切换逻辑
// currentLocale -> 当前语言 ref('us'|'ru'|'zh'|'de')
// availableLocales -> 可选语言列表 Array<{ code: string; label: string }>
// currentLocaleLabel -> 当前语言描述 string 'English'|'Русский'|'中文简体'|'Deutsch'
const currentLocaleLabel = computed(() => {
  return availableLocales.find(
    (locale: { code: string; label: string }) => locale.code === currentLocale.value
  )?.label
})

// 浅/暗主题切换逻辑
// toggleTheme 切换主题 true:表示暗主题，为html添加dark类
// themeOptions 主题列表 [{ label: 'Light', value: false }, { label: 'Dark', value: true }]
// currentTheme 当前主题 ref(false|true) true:表示暗主题
const { toggleTheme, themeOptions, currentTheme } = useTheme()
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/pattern.png') no-repeat center center;
  background-size: cover;

  .login-container {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(50px);
  }
}
</style>
