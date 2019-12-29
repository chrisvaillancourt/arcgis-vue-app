<template>
  <div id="map"></div>
</template>

<script>
import { loadModules, setDefaultOptions } from "esri-loader";
import { mapMutations } from "vuex";
setDefaultOptions({
  version: `4.13`,
  css: true,
});
// TODO remove setDefaultOptions once CDN switches
// TODO rename component to multi word
// TODO add legend
//TODO Add pop-ups
// TODO overwrite boundary data to match field names
export default {
  name: `EsriMap`,
  props: [`featureLayerURL`],
  data: function() {
    return {
      view: {},
    };
  },
  methods: {
    ...mapMutations([`UPDATE_MAP_VIEW_DATA`]),
    setlayerViewForChart: async function(layerForChartData) {
      const layerView = await this.view
        .whenLayerView(layerForChartData)
        .catch(console.error);

      layerView.watch(`updating`, async isUpdating => {
        if (!isUpdating) {
          let results = await layerView
            .queryFeatures({
              geometry: this.view.extent,
              returnGeometry: false,
            })
            .catch(console.error);

          // results.features is the array of features
          // results.features.attributes is the actual data

          // this updates the data for the chart
          this.UPDATE_MAP_VIEW_DATA(
            results.features.map(feature => feature.attributes)
          );
        }
      });
    },
  },

  created() {},
  mounted() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules([
      `esri/Map`,
      `esri/views/MapView`,
      `esri/widgets/Home`,
      `esri/layers/VectorTileLayer`,
      `esri/Basemap`,
      `esri/layers/FeatureLayer`,
    ])
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
          title: `{NAME_1} {NAME}`,
          content: `this is the popup.`,
        };
        // TODO add zoom level dependency and generalized features
        // TODO make outFields a component prop
        const countyLayer = new FeatureLayer({
          url: this.featureLayerURL,
          renderer: colorRenderer,
          // maxScale: 1155581,
          popupEnabled: true,
          popupTemplate,
          visible: true,
          title: `countyLayer`,
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
          // minScale: 847773,
          // maxScale: 241293,
          popupEnabled: true,
          popupTemplate,
          visible: false,
          title: `zipCodeLayer`,
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
          // minScale: 144448,
          // maxScale: 0,
          visible: false,
          popupEnabled: true,
          popupTemplate,
          title: `tractLayer`,
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
          // minScale: 52642,
          // maxScale: 0,
          visible: false,
          popupEnabled: true,
          popupTemplate,
          title: `blockGroupLayer`,
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
        this.view = new MapView({
          container: this.$el,
          map,
          zoom: 8,
          center: [-118, 34],
        });
        // use view.when to do functionality after view is loaded
        // view.watch(`scale`, function(newValue) {
        //   console.log(`scale property changed: `, newValue);
        // });
        // TODO move to component method
        function setActiveLayer({ layerCollection, visibleLayer }) {
          layerCollection.forEach(layer => {
            if (layer == visibleLayer) {
              layer.visible = true;
            } else {
              layer.visible = false;
            }
          });
        }

        this.view.when(
          async () => {
            //TODO check if async is needed
            // All the resources in the MapView and the map have loaded. Now execute additional processes

            const homeButton = new Home({
              view: this.view,
            });
            this.view.ui.add(homeButton, `top-left`);

            let targetLayer = countyLayer; //targetLayer will be used for layer visibility and setting up the layerView for the chart

            this.view.watch(`zoom`, newZoomVal => {
              if (newZoomVal > 8 && newZoomVal <= 10) {
                targetLayer = zipCodeLayer;
              } else if (newZoomVal > 10 && newZoomVal <= 12) {
                targetLayer = tractLayer;
              } else if (newZoomVal > 12) {
                targetLayer = blockGroupLayer;
              } else {
                targetLayer = countyLayer;
              }
              setActiveLayer({
                layerCollection: map.layers,
                visibleLayer: targetLayer,
              });
            });
            // TODO refactor and make less DRY
            const countylayerView = await this.view
              .whenLayerView(countyLayer)
              .catch(console.error);
            const zipCodelayerView = await this.view
              .whenLayerView(zipCodeLayer)
              .catch(console.error);
            const tractLayerView = await this.view
              .whenLayerView(tractLayer)
              .catch(console.error);
            const blockGroupLayerView = await this.view
              .whenLayerView(blockGroupLayer)
              .catch(console.error);

            countylayerView.watch(`updating`, async isUpdating => {
              if (!isUpdating) {
                let results = await countylayerView
                  .queryFeatures({
                    geometry: this.view.extent,
                    returnGeometry: false,
                  })
                  .catch(console.error);
                this.UPDATE_MAP_VIEW_DATA(
                  results.features.map(feature => feature.attributes)
                );
              }
            });
            zipCodelayerView.watch(`updating`, async isUpdating => {
              if (!isUpdating) {
                let results = await countylayerView.queryFeatures({
                  geometry: this.view.extent,
                  returnGeometry: false,
                });
                this.UPDATE_MAP_VIEW_DATA(
                  results.features.map(feature => feature.attributes)
                );
              }
            });
            tractLayerView.watch(`updating`, async isUpdating => {
              if (!isUpdating) {
                let results = await tractLayerView.queryFeatures({
                  geometry: this.view.extent,
                  returnGeometry: false,
                });
                this.UPDATE_MAP_VIEW_DATA(
                  results.features.map(feature => feature.attributes)
                );
              }
            });
            blockGroupLayerView.watch(`updating`, async isUpdating => {
              if (!isUpdating) {
                let results = await blockGroupLayerView.queryFeatures({
                  geometry: this.view.extent,
                  returnGeometry: false,
                });
                this.UPDATE_MAP_VIEW_DATA(
                  results.features.map(feature => feature.attributes)
                );
              }
            });
          },
          error => {
            // Use the errback function to handle when the view doesn't load properly
            console.error(`The view's resources failed to load: `, error);
          }
        );
      })
      .catch(console.error);
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
/* div {
  padding: 0;
  margin: 0;
} */
#map {
  width: 100%;
  height: 100%;
}
</style>
