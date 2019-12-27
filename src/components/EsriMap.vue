<template>
  <div id="map"></div>
</template>

<script>
import { loadModules } from "esri-loader";
import { mapMutations, mapState } from "vuex";
// TODO remove setDefaultOptions once CDN switches
// TODO rename component to multi word
export default {
  name: `EsriMap`,
  props: [`featureLayerURL`],
  methods: {
    ...mapMutations([`UPDATE_MAP_VIEW_DATA`]),
    async getFieldAliases() {
      let fields;
      const response = await fetch(`${this.featureLayerURL}?f=pjson`);
      if (response.ok) {
        ({ fields } = await response.json());
      } else {
        fields = null;
        console.error(`request error: ${response.status}`);
      }
      return fields;
    },
  },

  created() {
    // fetch field aliases
    // this.getFieldAliases().then(console.log);
  },
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    //TODO update JS API to version 4.14
    loadModules(
      [
        `esri/Map`,
        `esri/views/MapView`,
        `esri/widgets/Home`,
        `esri/layers/VectorTileLayer`,
        `esri/Basemap`,
        `esri/layers/FeatureLayer`,
      ],
      {
        css: true,
      }
    )
      .then(([Map, MapView, Home, VectorTileLayer, Basemap, FeatureLayer]) => {
        const vectorBaseLayer = new VectorTileLayer({
          // item page: https://www.arcgis.com/home/item.html?id=291da5eab3a0412593b66d384379f89f
          url: `https://www.arcgis.com/sharing/rest/content/items/291da5eab3a0412593b66d384379f89f/resources/styles/root.json`,
        });
        // TODO add local vector style reference
        const vectorBaseReference = new VectorTileLayer({
          // item page: https://www.arcgis.com/home/item.html?id=1768e8369a214dfab4e2167d5c5f2454
          url: `https://www.arcgis.com/sharing/rest/content/items/1768e8369a214dfab4e2167d5c5f2454/resources/styles/root.json`,
        });

        const colorRenderer = {
          type: `simple`,
          symbol: {
            type: `simple-fill`,
            style: `none`,
            outline: { width: 1, color: [194, 194, 194, 0.15] },
          },
          visualVariables: [
            {
              type: `color`,
              field: `TOTPOP_CY`,
              normalizationField: `TOTPOP00`,
              legendOptions: {
                title: `Ratio of 2019 Pop. to 2000 Pop.`,
              },
              stops: [
                {
                  value: 0.75,
                  color: [190, 48, 39, 255],
                  label: `< 0.75`,
                },
                {
                  value: 0.875,
                  color: [213, 133, 127, 255],
                  label: null,
                },
                {
                  value: 1,
                  color: [235, 217, 216, 255],
                  label: `1`,
                },
                {
                  value: 1.25,
                  color: [151, 162, 179, 255],
                  label: null,
                },
                {
                  value: 1.5,
                  color: [102, 113, 129, 255],
                  label: `> 1.5`,
                },
              ],
            },
          ],
        };
        const popupTemplate = {
          title: `{NAME}`,
          content: `this is the popup.`,
        };
        // TODO add zoom level dependency and generalized features
        // TODO make outFields a component prop
        const countyLayer = new FeatureLayer({
          url: this.featureLayerURL,
          renderer: colorRenderer,
          maxScale: 1155581,
          popupEnabled: true,
          popupTemplate,
          outFields: [
            `OBJECTID`,
            `TOTPOP00`,
            `TSPOP10_CY`,
            `TSPOP11_CY`,
            `TSPOP12_CY`,
            `TSPOP13_CY`,
            `TSPOP14_CY`,
            `TSPOP15_CY`,
            `TSPOP16_CY`,
            `TSPOP17_CY`,
            `TSPOP18_CY`,
            `TOTPOP_CY`,
            `AREA_GEO`,
          ], // we need to specify any additional fields
        });
        const zipCodeLayer = new FeatureLayer({
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/2`,
          renderer: colorRenderer,
          minScale: 847773,
          maxScale: 241293,
          outFields: [
            `OBJECTID`,
            `TOTPOP00`,
            `TSPOP10_CY`,
            `TSPOP11_CY`,
            `TSPOP12_CY`,
            `TSPOP13_CY`,
            `TSPOP14_CY`,
            `TSPOP15_CY`,
            `TSPOP16_CY`,
            `TSPOP17_CY`,
            `TSPOP18_CY`,
            `TOTPOP_CY`,
            `AREA_GEO`,
          ], // we need to specify any additional fields
        });
        const tractLayer = new FeatureLayer({
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/3`,
          renderer: colorRenderer,
          minScale: 144448,
          maxScale: 0,
          outFields: [
            `OBJECTID`,
            `TOTPOP00`,
            `TSPOP10_CY`,
            `TSPOP11_CY`,
            `TSPOP12_CY`,
            `TSPOP13_CY`,
            `TSPOP14_CY`,
            `TSPOP15_CY`,
            `TSPOP16_CY`,
            `TSPOP17_CY`,
            `TSPOP18_CY`,
            `TOTPOP_CY`,
            `AREA_GEO`,
          ], // we need to specify any additional fields
        });
        const blockGroupLayer = new FeatureLayer({
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/4`,
          renderer: colorRenderer,
          minScale: 52642,
          maxScale: 0,
          outFields: [
            `OBJECTID`,
            `TOTPOP00`,
            `TSPOP10_CY`,
            `TSPOP11_CY`,
            `TSPOP12_CY`,
            `TSPOP13_CY`,
            `TSPOP14_CY`,
            `TSPOP15_CY`,
            `TSPOP16_CY`,
            `TSPOP17_CY`,
            `TSPOP18_CY`,
            `TOTPOP_CY`,
            `AREA_GEO`,
          ], // we need to specify any additional fields
        });

        const basemap = new Basemap({
          baseLayers: [vectorBaseLayer],
          referenceLayers: [vectorBaseReference],
        });

        const map = new Map({
          basemap,
          layers: [countyLayer, zipCodeLayer, tractLayer, blockGroupLayer],
        });
        const view = new MapView({
          container: this.$el,
          map,
          zoom: 8,
          center: [-118, 34],
        });
        // use view.when to do functionality after view is loaded
        // view.watch(`scale`, function(newValue) {
        //   console.log(`scale property changed: `, newValue);
        // });

        view.when(
          async () => {
            // All the resources in the MapView and the map have loaded. Now execute additional processes
            const homeButton = new Home({
              view,
            });
            view.ui.add(homeButton, `top-left`);
            view.watch(`scale`, newValue =>
              console.log(`scale changed: `, newValue)
            );

            // TODO Refactor to make more sense
            const layerView = await view
              .whenLayerView(zipCodeLayer)
              .catch(console.error);
            // TODO try changing feature layer URL based on scale value?
            // what can  be made into a promise?

            layerView.watch(`updating`, async value => {
              if (!value) {
                let results = await layerView.queryFeatures({
                  geometry: view.extent,
                  returnGeometry: false,
                });
                console.log(
                  results.features.map(feature => feature.attributes)
                );
                // results.features is the array of features
                // results.features.attributes is the actual data
                // the below is the same as:
                /*
              let data = results.features.map(feature => feature.attributes);
              this.UPDATE_MAP_VIEW_DATA(data)

              */
                // this updates the data for the chart
                this.UPDATE_MAP_VIEW_DATA(
                  results.features.map(feature => feature.attributes)
                );
              }
            });
          },
          error => {
            // Use the errback function to handle when the view doesn't load properly
            console.log(`The view's resources failed to load: `, error);
          }
        );
      })
      .catch(err => console.log);
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
