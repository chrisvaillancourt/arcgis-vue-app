<template>
  <div id="map"></div>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "web-map",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(["esri/Map", "esri/views/MapView", "esri/widgets/Home"], {
      css: true,
    }).then(([Map, MapView, Home]) => {
      const map = new Map({
        basemap: "streets",
      });
      const view = new MapView({
        container: this.$el,
        map,
        zoom: 8,
        center: [-118, 34],
      });
      const homeButton = new Home({
        view,
      });
      view.ui.add(homeButton, "top-left");
    });
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  },
};
</script>

<style scoped>
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>