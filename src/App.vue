<template>
  <div id="app">
    <EsriMap id="map" :featureLayerURL="this.dataAliasesURL" />
    <HorizontalBarChart id="chart" />
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
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
html,
body {
  height: 100%;
  width: 100%;
  background-color: #1d2224;
}
* {
  padding: 0;
  margin: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#map {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
}
#chart {
  flex-grow: 1;
  flex-shrink: 1;
  height: 50vh;
}
.esri-legend__layer-table.esri-legend__layer-table--size-ramp:first-child {
  /* removes unnecessary legend element */
  display: none;
}
@media (min-width: 830px) {
  #app {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-template-rows: repeat(20, 1fr);
  }

  #map {
    height: 100%;
    width: 100%;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
  }

  #chart {
    grid-column: 12 / 20;
    grid-row: 12 / 20;
    height: 100%;
    width: 100%;
    bottom: 0;
    top: 20px;
    z-index: 10;
    padding: 15px;
  }
}

@media (min-width: 1600px) {
  #chart {
    grid-column: 13 / 20;
    grid-row: 14 / 20;
    height: 100%;
    width: 100%;
    bottom: 0;
    top: 20px;
    z-index: 10;
    padding: 15px;
  }
}
</style>
