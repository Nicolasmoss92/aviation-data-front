<template>
  <div>
    <h2>Status em tempo real</h2>
    <div v-if="!connected">🔴 Desconectado</div>
    <div v-else>🟢 Conectado</div>

    <ul>
      <li>Altitude: {{ data.altitude }} m</li>
      <li>Velocidade: {{ data.speed }} km/h</li>
      <li>Direção: {{ data.heading }}°</li>
      <li>Temperatura: {{ data.temperature }} °C</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'

const data = reactive({
  altitude: 0,
  speed: 0,
  heading: 0,
  temperature: 0,
})

const connected = ref(false)
let socket

onMounted(() => {
  socket = new WebSocket('ws://localhost:3000') // ou wss:// se for seguro

  socket.onopen = () => {
    connected.value = true
    console.log('WebSocket conectado')
  }

  socket.onmessage = (event) => {
    const incoming = JSON.parse(event.data)
    // Exemplo: { altitude: 5000, speed: 800, heading: 270, temperature: 35 }
    Object.assign(data, incoming)
  }

  socket.onclose = () => {
    connected.value = false
    console.log('WebSocket desconectado')
  }
})

onUnmounted(() => {
  if (socket) socket.close()
})
</script>
