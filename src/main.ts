import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

function operateDate(dateInput: Date | string) {
  const currentDate = new Date()
  let processedDate: Date
  if (typeof dateInput === 'string') {
    processedDate = new Date(dateInput)
  } else {
    processedDate = dateInput
  }
  const timeDifference =
    currentDate.getTime() - processedDate.getTime()
  const daysDifference = Math.floor(
    timeDifference / (1000 * 60 * 60 * 24)
  )
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  )
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  )
  return {
    daysDifference,
    hoursDifference,
    minutesDifference,
    formattedDate: `${processedDate.getFullYear()}-${processedDate.getMonth() + 1}-${processedDate.getDate()} ${processedDate.getHours()}:${processedDate.getMinutes()}:${processedDate.getSeconds()}`,
  }
}

console.log(operateDate('2023-05-01 12:30:00'))
console.log(operateDate(new Date('2023-06-15T08:45:30')))
