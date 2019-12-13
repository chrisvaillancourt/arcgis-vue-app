<template>
  <div>
    <p>Chart!!</p>

    <h2>Data:</h2>
    <ul>
      <li v-for="data in mapViewData" :key="data.OBJECTID">
        {{ data }}
      </li>
    </ul>
    <div>TOTPOP_CY: {{ calcTotPopCY }}</div>

    <!-- <button @click="createMutant">Add Element</button> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Chart",
  computed: {
    ...mapState(["mapViewData"]),
    // other computed properties
    ...mapGetters(["calcTotPopCY"]),
  },
  methods: {
    // ...mapMutations(["ADD_ITEM"]),
  },
};
</script>

<style scoped></style>
