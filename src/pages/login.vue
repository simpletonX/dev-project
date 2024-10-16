<template>
  <div class="login">
    <div class="login-container flex justify-center items-center">
      <div
        class="bg-surface-0 dark:bg-surface-900 w-[500px] shadow px-10 pt-12 pb-6 rounded-lg"
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

        <footer class="mt-6">
          <div class="flex justify-center mt-10">
            <Logo showTitle size="xl" />
          </div>
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
import type { LoginBody } from '@/service/user/types'
const { t } = useLanguage()

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
