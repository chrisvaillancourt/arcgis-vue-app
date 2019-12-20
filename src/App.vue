<template>
  <div id="app">
    <Map id="map" :featureLayerURL="this.featureLayerURL"></Map>
    <Chart id="chart" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Map from "./components/Map.vue";
import Chart from "./components/Chart.vue";

export default {
  name: `app`,
  components: {
    Map,
    Chart,
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "Map Chart";
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#map {
  grid-area: Map;
}
#chart {
  grid-area: Chart;
}
</style>
