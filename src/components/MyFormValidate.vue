<template>
  <slot
    :form-fields="formFields"
    :errors="errors"
    :values="values"
    :on-validate="onValidate"
  ></slot>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { computed, defineEmits } from 'vue'

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
