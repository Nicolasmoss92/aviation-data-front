<template>
    <v-container class="d-flex justify-center">
        <v-card class="mx-auto" color="surface-variant">
            <v-card-title>{{ title }}</v-card-title>
            <v-card-subtitle v-if="status">
                <v-icon left :color="status === 'connected' ? 'green' : 'red'">
                    {{ status === 'connected' ? 'mdi-wifi' : 'mdi-wifi-off' }}
                </v-icon>
                {{ status === 'connected' ? 'Conectado' : 'Desconectado' }}
            </v-card-subtitle>

            <v-card-text>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Altitude: {{ altitude }} m</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Velocidade: {{ speed }} km/h</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Direção: {{ heading }}°</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Temperatura: {{ temperature }} °C</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
defineProps({
    title: String,
    status: {
        type: String,
        default: 'disconnected',
    },
    altitude: Number,
    speed: Number,
    heading: Number,
    temperature: Number,
})
</script>
