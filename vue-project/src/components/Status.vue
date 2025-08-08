<!-- <template>
  <div>
    <h2>Status em tempo real</h2>

    <label>Selecionar caça:</label>
    <select v-model="selectedFlight">
      <option value="flight-1">Flight 1</option>
      <option value="flight-2">Flight 2</option>
    </select>

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
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const selectedFlight = ref('flight-1')
const connected = ref(false)

const data = reactive({
  altitude: 0,
  speed: 0,
  heading: 0,
  temperature: 0,
})


onMounted(() => {
  const token = localStorage.getItem('token')
  console.log('Token atual:', token)

  if (!token) {
    console.warn('⚠️ Token não encontrado no localStorage')
    return
  }

  socket = io('http://localhost:3000', {
    auth: { token },
  })

  socket.on('connect', () => {
    connected.value = true
    console.log('🟢 Conectado ao servidor')
    listenToFlight(selectedFlight.value)
  })

  socket.on('disconnect', () => {
    connected.value = false
    console.log('🔴 Desconectado')
  })
})

watch(selectedFlight, (newFlightId) => {
  if (connected.value) {
    listenToFlight(newFlightId)
  }
})

onUnmounted(() => {
  if (socket) {
    socket.disconnect()
  }
})
</script> -->
