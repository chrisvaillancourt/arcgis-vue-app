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
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  /* display: grid; */
  /* grid-template-columns: 70fr 20fr 10fr; */
  /* grid-template-areas: "Map Chart"; */
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#map {
  /* grid-area: Map; */
  height: 100%;
  width: 100%;
}
#chart {
  /* grid-area: Chart; */
  z-index: 10;
  position: absolute;
  width: 500px;
  height: 500px;
  bottom: 6%;
  left: 55%;
}
</style>
