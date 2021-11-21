<template>
  <div class="row" v-if="!loading"><h3 class="col text-center">A list of recent logs</h3></div>

  <table class="table" v-if="!loading">
    <tbody>
      <tr v-for="log in response" :key="log.log_id">
        <td>{{ log.log_timestamp }}</td>
        <td><router-link :to="{ name: 'user', params: { userid: log.user_id }}">{{ log.user_name}}</router-link></td>
        <td><smiley :status="log.log_status" /></td>
        <td><router-link :to="{ name: 'trig', params: { trigid: log.trig_id }}">{{ log.waypoint}}</router-link></td>
        <td>{{ log.trig_name }}</td>
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
import axios from "axios"
import Smiley from "@/components/Smiley.vue";


interface Log {
  log_id: string,
  log_status: string,
  log_text: string,
  user_id: string,
  user_name: string,
  trig_id: string,
  trig_name: string,
  waypoint: string,
  log_timestamp: string,
  upd_timestamp: string
}

export default defineComponent({
  name: "HomeRecentLogs",
  components: {
    Smiley,
  },
  data() {
    return {
      response: [] as Log[],
      loading: true,
    };
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true
      try {
        const response = await axios.get(`${process.env.VUE_APP_TUK_API}/log/recent`)
        this.response = response.data
        console.log(this.response)
      } finally {
        this.loading = false;
      }
    }
  }

})
</script>