<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" v-for="flight in flights" :key="flight.id">
        <FlightCard
          :title="flight.title"
          :status="flight.status"
          :altitude="flight.altitude"
          :speed="flight.speed"
          :heading="flight.heading"
          :temperature="flight.temperature"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'
import FlightCard from '@/components/FlightCard.vue'

// Dados reativos dos voos
const flights = ref([
  {
    id: 'flight-1',
    title: 'Flight 1',
    status: 'disconnected',
    altitude: 0,
    speed: 0,
    heading: 0,
    temperature: 0,
  },
  {
    id: 'flight-2',
    title: 'Flight 2',
    status: 'disconnected',
    altitude: 0,
    speed: 0,
    heading: 0,
    temperature: 0,
  },
  {
    id: 'flight-3',
    title: 'Flight 2',
    status: 'disconnected',
    altitude: 0,
    speed: 0,
    heading: 0,
    temperature: 0,
  },
  {
    id: 'flight-4',
    title: 'Flight 2',
    status: 'disconnected',
    altitude: 0,
    speed: 0,
    heading: 0,
    temperature: 0,
  },
])

let socket = null

onMounted(() => {
  // Conectar no servidor
  socket = io('http://localhost:3000') // sem token

  socket.on('connect', () => {
    flights.value.forEach((flight) => {
      flight.status = 'connected'
    })
    console.log('🟢 Conectado ao WebSocket')
  })

  socket.on('disconnect', () => {
    flights.value.forEach((flight) => {
      flight.status = 'disconnected'
    })
    console.log('🔴 Desconectado do WebSocket')
  })

  // Registrar listeners para cada voo
  flights.value.forEach((flight, index) => {
    const eventName = `flightData:${flight.id}`

    socket.on(eventName, (incomingData) => {
      flights.value[index] = {
        ...flights.value[index],
        ...incomingData,
        status: 'connected',
      }
    })
  })
})

onUnmounted(() => {
  if (socket) {
    socket.disconnect()
  }
})
</script>
