<template>
  <div>
    <p>Chart!!</p>

    <h2>Summary Stats</h2>
    <div>
      <ul>
        <li v-for="(value, key, index) in getSummaryStats" :key="index">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Chart",
  computed: {
    ...mapState(["mapViewData"]),
    // other computed properties
    ...mapGetters(["getSummaryStats"]),
  },
  methods: {},
};
</script>

<style scoped></style>
