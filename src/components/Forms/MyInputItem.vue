<template>
  <div class="field mb-5">
    <label for="" class="block font-500 text-base mb-2">{{ label }}</label>
    <slot>
      <InputText
        id="username"
        :value="modelValue"
        @input="oninput"
        aria-describedby="username-help"
        :placeholder="placeholder"
        :invalid="!!error"
        class="w-full"
      />
    </slot>
    <small class="text-red-400" id="username-help">{{ error }}</small>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string
  modelValue?: string
  error?: string
  placeholder?: string
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: typeof props.modelValue)
}>()

function oninput(e: Event) {
  emits('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>
