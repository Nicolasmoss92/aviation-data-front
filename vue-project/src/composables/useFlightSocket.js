// src/composables/useFlightSocket.js
import { io } from 'socket.io-client'
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'

export function useFlightSocket(selectedFlightRef) {
  const connected = ref(false)

  const data = reactive({
    altitude: 0,
    speed: 0,
    heading: 0,
    temperature: 0,
  })

  let socket = null
  let currentListener = ''

  const listenToFlight = (flightId) => {
    if (currentListener) socket.off(currentListener)

    const eventName = `flightData:${flightId}`
    currentListener = eventName

    socket.on(eventName, (incoming) => {
      Object.assign(data, incoming)
    })
  }

  onMounted(() => {
    socket = io('http://localhost:3000') // sem token

    socket.on('connect', () => {
      connected.value = true
      listenToFlight(selectedFlightRef.value)
    })

    socket.on('disconnect', () => {
      connected.value = false
    })
  })

  watch(selectedFlightRef, (newFlightId) => {
    if (connected.value) listenToFlight(newFlightId)
  })

  onUnmounted(() => {
    if (socket) socket.disconnect()
  })

  return { connected, data }
}
