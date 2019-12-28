<template>
  <div id="app">
    <EsriMap id="map" :featureLayerURL="this.featureLayerURL" />
    <HorizontalBarChart
      id="chart"
      v-show="this.$store.getters.getSummaryStats.length > 0"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";

import EsriMap from "./components/EsriMap.vue";
import HorizontalBarChart from "./components/HorizontalBarChart.vue";

export default {
  name: `App`,
  components: {
    EsriMap,
    HorizontalBarChart,
  },
  props: [`chartData`],
  computed: {
    ...mapState([`featureLayerURL`]),
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}
* {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  display: grid;
  grid-template-columns: repeat(20, 5fr);
  grid-template-rows: repeat(20, 5fr);

  width: 100%;
  height: 100%;
}
#map {
  height: 100%;
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}
#chart {
  grid-column: 12 / 19;
  grid-row: 10 / 20;
  z-index: 10;
}
</style>
