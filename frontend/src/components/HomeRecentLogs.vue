<template>
  <div class="row" v-if="!loading">
    <h3 class="col text-center">A list of recent logs</h3>
  </div>

  <table class="table" v-if="!loading">
    <tbody>
      <tr v-for="log in logs" :key="log.log_id">
        <td>{{ log.log_timestamp }}</td>
        <!-- <td>
          <router-link :to="{ name: 'user', params: { userid: log.user_id } }">
            {{ log.user_name }}
          </router-link>
        </td> -->
        <td><smiley :status="log.log_status" /></td>
        <td>
          <router-link :to="{ name: 'trig', params: { trigid: log.trig.id } }">
            {{ log.trig.waypoint }}
          </router-link>
        </td>
        <td>{{ log.trig.name }}</td>
      </tr>
    </tbody>
  </table>

  <div class="row mt-3">
    <router-link to="/about">All logs for the last four days...</router-link>
  </div>
  <div class="row my-4">
    <router-link to="/about">All recently entered logs...</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import Smiley from '@/components/Smiley.vue'

interface Log {
  id: string
  text: string
  wgs_lat: string
  wgs_lon: string
  trig: {
    id: string
    waypoint: string
    name: string
  }
}

export default defineComponent({
  name: 'HomeRecentLogs',
  components: {
    Smiley,
  },
  data() {
    return {
      logs: [] as Log[],
      loading: true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_TUK_API}/logs/recent`,
        )
        this.logs = response.data
        console.log(this.logs)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>
