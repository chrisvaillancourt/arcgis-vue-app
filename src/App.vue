<template>
  <div id="app">
    <EsriMap id="map" :featureLayerURL="this.dataAliasesURL" />
    <HorizontalBarChart id="chart" v-show="this.$store.getters.getSummaryStats.length > 0" />
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
    ...mapState([`dataAliasesURL`]),
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
  grid-template-rows: repeat(4, 1fr);
  align-items: end;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#map {
  height: 100%;
  width: 100%;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}
#chart {
  grid-column: 1 / -1;
  grid-row: 3 / -1;
  z-index: 10;
  width: 99vw;
  /* max-height: 265px; */
  max-height: 35vh;
  border-radius: 2%;
  padding: 2px;
  bottom: 16px;
}

/* #chart {
  grid-column: 12 / 19;
  grid-row: 10 / 20;
  z-index: 10;
} */
.esri-legend__layer-table.esri-legend__layer-table--size-ramp:first-child {
  /* removes unnecessary legend element */
  display: none;
}
@media (min-width: 830px) {
  #chart {
    grid-column: 13 / -1;
    grid-row: 6 / 10;
    max-width: 35vw;
    bottom: 0;
    top: 20px;
  }
  #app {
    grid-template-rows: repeat(10, 1fr);
  }
}
</style>
