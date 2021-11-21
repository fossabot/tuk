<template>
  <span data-bs-toggle="tooltip" :title="condition.id + ' - ' + condition.text">{{ condition.icon }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Conditions: {[index: string]: any} = {
  "G": {id: "G", text: "Good condition",          icon: "😎", html: "&#x1f60e"},
  "S": {id: "S", text: "Slightly damaged",        icon: "🙂", html: "&#x1f642"},
  "D": {id: "D", text: "Damaged",                 icon: "🙁", html: "&#x1f641"},
  "T": {id: "T", text: "Toppled",                 icon: "😡", html: "&#x1f621"},
  "M": {id: "M", text: "Moved",                   icon: "😟", html: "&#x1f61f"},
  "C": {id: "C", text: "Converted",               icon: "😐", html: "&#x1f610"},
  "R": {id: "R", text: "Remains",                 icon: "😢", html: "&#x1f622"},
  "Q": {id: "Q", text: "Possibly missing",        icon: "🤞", html: "&#x1f91e"},
  "X": {id: "X", text: "Destroyed",               icon: "😭", html: "&#x1f62d"},
  "V": {id: "V", text: "Unreachable but visible", icon: "😞", html: "&#x1f61e"},
  "P": {id: "P", text: "Inaccessible",            icon: "🙄", html: "&#x1f644"},
  "N": {id: "N", text: "Couldn't find it",        icon: "😕", html: "&#x1f615"},
  "U": {id: "U", text: "Unknown",                 icon: "🤷", html: "&#x1f937"},
  "Z": {id: "Z", text: "Not Logged",              icon: "🤷", html: "&#x1f937"},
  "-": {id: "-", text: "Unknown",                 icon: "🤷", html: "&#x1f937"},
}

export default defineComponent({
  name: 'Smiley',
  props: {
    status: String,
  },
  computed: {
    condition() : any {
    var condition = Conditions[this.$props.status?this.$props.status:"-"]
      return condition
    }
  }
})
</script>


