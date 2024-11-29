<!-- 
    父组件调用示例：
    <template #default="{ formFields, errors, values, onValidate }">
      <MyInputItem ... v-model="formFields.xxx.value" />
    </template>
      - formFields: 表单实际值（仅返回yupRules中存在的表单项值，具有响应性）
      - errors: 表单项校验后的错误信息
      - values: 表单初始值（包含init初始化的表单项值）
      - onValidate: 触发表单校验的emit
  -->
<template>
  <slot :form-fields="formFields" :errors="errors" :values="values" :on-validate="onValidate"></slot>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { computed, defineEmits } from 'vue'

/**
 * yupRules: 表单校验规则
 * import * as yup from 'yup'
 * {
    username: yup.string().required(),
    password: yup.string().required(),
  }

 * init: 表单初始值
 * {
 *   username: 'admin',
 *   password: '123456',
 * }
 */
const props = defineProps<{
  yupRules: Record<string, any>
  init: Record<string, any>
}>()
const emit = defineEmits(['submit'])

const schema = computed(() => yup.object(props.yupRules))
const defaultValues = computed(() => {
  const defaults: Record<string, any> = {}
  Object.entries(props.yupRules).forEach(([key, rule]) => {
    if (rule.spec && rule.spec.default !== undefined) {
      defaults[key] = rule.spec.default
    }
  })
  return defaults
})

const { handleSubmit, errors, values, defineField } = useForm({
  validationSchema: schema,
  initialValues: (Object.keys(props.init).length && props.init) || defaultValues.value,
})

const formFields = computed(() => {
  return Object.keys(props.yupRules).reduce(
    (acc, key) => {
      const [field] = defineField(key)
      acc[key] = field
      return acc
    },
    {} as Record<string, any>
  )
})

const onValidate = handleSubmit((values) => {
  emit('submit', values)
})

defineExpose({
  formFields,
  errors,
  values,
  onValidate,
})
</script>
