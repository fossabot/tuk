<template>
  <div class="trig spinner-border text-success" role="status" v-if="loading">
    <span class="visually-hidden">Loading...</span>
  </div>
  <div class="trig" v-if="!loading">
    <TrigDetails
      :trigid="trigid"
      :name="name"
      :waypoint="waypoint"
      description="Blank"
    />
    <p>API response {{ response }}</p>
  </div>
</template>

<script lang="ts">
import { useAuth } from '@/auth/useAuthService'
import { defineComponent } from 'vue'
import TrigDetails from '@/components/TrigDetails.vue'
import axios from 'axios'

export default defineComponent({
  name: 'trig',

  components: {
    TrigDetails,
  },

  props: {
    trigid: {
      type: Number,
      default: 42,
    },
  },

  data() {
    return {
      name: '',
      response: '',
      loading: true,
    }
  },

  computed: {
    waypoint() {
      var strNum: string = this.trigid?.toString() ?? ''
      while (strNum.length < 4) strNum = '0' + strNum
      return 'WP' + strNum
    },
  },

  created() {
    // fetch the data when the view is created
    this.fetchData()
  },

  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },

  methods: {
    async fetchData() {
      this.name = '<loading>'
      this.loading = true
      const trigid = this.$route.params.trigid
      if (trigid) {
        try {
          // Get the access token from the auth wrapper
          const token = await useAuth().getTokenSilently()
          console.log('token is ' + token)
          const response = await axios.get(
            `${process.env.VUE_APP_TUK_API}/trigs/${trigid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
          this.name = response.data.name
          this.response = JSON.stringify(response)
        } catch (error) {
          this.name = 'Error!'
        } finally {
          this.loading = false
        }
      }
    },
  },
})

// function pad(num: string, size: number) {
//   var strNum = num;
//   while (strNum.length < size) strNum = "0" + strNum;
//   return strNum;
// }
</script>
