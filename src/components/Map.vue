<template>
  <div id="map"></div>
</template>

<script>
import { loadModules } from "esri-loader";

export default {
  name: "web-map",
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/Home",
        "esri/layers/VectorTileLayer",
        "esri/Basemap",
      ],
      {
        css: true,
      }
    ).then(([Map, MapView, Home, VectorTileLayer, Basemap]) => {
      const vectorBaseLayer = new VectorTileLayer({
        // item page: https://www.arcgis.com/home/item.html?id=291da5eab3a0412593b66d384379f89f
        url:
          "https://www.arcgis.com/sharing/rest/content/items/291da5eab3a0412593b66d384379f89f/resources/styles/root.json",
      });
      const vectorBaseReference = new VectorTileLayer({
        // item page: https://www.arcgis.com/home/item.html?id=1768e8369a214dfab4e2167d5c5f2454
        url:
          "https://www.arcgis.com/sharing/rest/content/items/1768e8369a214dfab4e2167d5c5f2454/resources/styles/root.json",
      });

      const basemap = new Basemap({
        baseLayers: [vectorBaseLayer],
        referenceLayers: [vectorBaseReference],
      });

      const map = new Map({
        basemap,
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