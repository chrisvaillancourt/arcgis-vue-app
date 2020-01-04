<template>
  <div id="map"></div>
</template>

<script>
// TODO Update map extent -- it's too small on mobile
// TODO popup template expanded on mobile
import { loadModules, setDefaultOptions } from "esri-loader";
import { mapMutations } from "vuex";
setDefaultOptions({
  version: `4.13`,
  css: `https://js.arcgis.com/4.13/esri/themes/dark/main.css`,
});
// TODO remove setDefaultOptions once bug is resolved

export default {
  name: `EsriMap`,
  props: [`featureLayerURL`],
  data: function() {
    return {
      view: {},
      featureLayers: [
        {
          title: `County`,
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/1`,
          visible: true,
          popupTemplate: {
            title: `{NAME}`,
            content: [
              {
                type: `text`,
                text: `From 2010 - 2019, the population of this area <span style="font-weight: bold;">{expression/check-change-sign}</span> by <span style="font-weight: bold;">{expression/pop-change}%</span>. For comparison, the entire US population increased by 7.5% during this time period.<br>
              <ul>
                <li>2010 population: {TSPOP10_CY}</li>
                <li>2019 population: {TOTPOP_CY}</li>
              </ul>`,
              },
            ],
            expressionInfos: [
              {
                name: `pop-change`,
                expression: `round(abs((($feature.TOTPOP_CY - $feature.TSPOP10_CY)/$feature.TSPOP10_CY)*100))`,
              },
              {
                name: `check-change-sign`,
                expression: `
                    if ($feature.TOTPOP_CY - $feature.TSPOP10_CY > 0) {
                      return 'increased'
                    } else if ($feature.TOTPOP_CY - $feature.TSPOP10_CY < 0) {
                      return 'decreased'
                    } else {
                      return 'changed'
                    }
                  `,
              },
            ],
            fieldInfos: [
              {
                fieldName: `pop-change`,
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        },
        {
          title: `ZIP Code`,
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/2`,
          visible: false,
          popupTemplate: {
            title: `ZIP Code: {ID} | {NAME}`,
            content: [
              {
                type: `text`,
                text: `From 2010 - 2019, the population of this area <span style="font-weight: bold;">{expression/check-change-sign}</span> by <span style="font-weight: bold;">{expression/pop-change}%</span>. For comparison, the entire US population increased by 7.5% during this time period.<br>
              <ul>
                <li>2010 population: {TSPOP10_CY}</li>
                <li>2019 population: {TOTPOP_CY}</li>
              </ul>`,
              },
            ],
            expressionInfos: [
              {
                name: `pop-change`,
                expression: `round(abs((($feature.TOTPOP_CY - $feature.TSPOP10_CY)/$feature.TSPOP10_CY)*100))`,
              },
              {
                name: `check-change-sign`,
                expression: `
                    if ($feature.TOTPOP_CY - $feature.TSPOP10_CY > 0) {
                      return 'increased'
                    } else if ($feature.TOTPOP_CY - $feature.TSPOP10_CY < 0) {
                      return 'decreased'
                    } else {
                      return 'changed'
                    }
                  `,
              },
            ],
            fieldInfos: [
              {
                fieldName: `pop-change`,
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        },
        {
          title: `Census Tract`,
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/3`,
          visible: false,
          popupTemplate: {
            title: `Census Tract {ID}`,
            content: [
              {
                type: `text`,
                text: `From 2010 - 2019, the population of this area <span style="font-weight: bold;">{expression/check-change-sign}</span> by <span style="font-weight: bold;">{expression/pop-change}%</span>. For comparison, the entire US population increased by 7.5% during this time period.<br>
              <ul>
                <li>2010 population: {TSPOP10_CY}</li>
                <li>2019 population: {TOTPOP_CY}</li>
              </ul>`,
              },
            ],
            expressionInfos: [
              {
                name: `pop-change`,
                expression: `round(abs((($feature.TOTPOP_CY - $feature.TSPOP10_CY)/$feature.TSPOP10_CY)*100))`,
              },
              {
                name: `check-change-sign`,
                expression: `
                    if ($feature.TOTPOP_CY - $feature.TSPOP10_CY > 0) {
                      return 'increased'
                    } else if ($feature.TOTPOP_CY - $feature.TSPOP10_CY < 0) {
                      return 'decreased'
                    } else {
                      return 'changed'
                    }
                  `,
              },
            ],
            fieldInfos: [
              {
                fieldName: `pop-change`,
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        },
        {
          title: `Census Block Group`,
          url: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/4`,
          visible: false,
          popupTemplate: {
            title: `Census Block Group {ID}`,
            content: [
              {
                type: `text`,
                text: `From 2010 - 2019, the population of this area <span style="font-weight: bold;">{expression/check-change-sign}</span> by <span style="font-weight: bold;">{expression/pop-change}%</span>. For comparison, the entire US population increased by 7.5% during this time period.<br>
              <ul>
                <li>2010 population: {TSPOP10_CY}</li>
                <li>2019 population: {TOTPOP_CY}</li>
              </ul>`,
              },
            ],
            expressionInfos: [
              {
                name: `pop-change`,
                expression: `round(abs((($feature.TOTPOP_CY - $feature.TSPOP10_CY)/$feature.TSPOP10_CY)*100))`,
              },
              {
                name: `check-change-sign`,
                expression: `
                    if ($feature.TOTPOP_CY - $feature.TSPOP10_CY > 0) {
                      return 'increased'
                    } else if ($feature.TOTPOP_CY - $feature.TSPOP10_CY < 0) {
                      return 'decreased'
                    } else {
                      return 'changed'
                    }
                  `,
              },
            ],
            fieldInfos: [
              {
                fieldName: `pop-change`,
                format: {
                  places: 0,
                  digitSeparator: true,
                },
              },
            ],
          },
        },
      ],
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
      ],
      colorRenderer: {
        type: `simple`,
        symbol: {
          type: `simple-fill`,
          style: `none`,
          outline: { width: 0.75, color: [128, 128, 128, 0.15] },
        },
        visualVariables: [
          {
            type: `color`,
            valueExpression: `round((($feature.TOTPOP_CY - $feature.TSPOP10_CY)/$feature.TSPOP10_CY)*100)`,
            valueExpressionTitle: `2010 - 2019 Change in Pop (%)`,
            stops: [
              {
                value: -5,
                color: `#e27c7c`,
                label: `< -7%`,
              },
              // {
              //   value: 0,
              //   color: `#5e4338`,
              //   label: null,
              // },
              // {
              //   value: 3,
              //   color: `#5e4338`,
              //   label: null,
              // },
              {
                value: 7.5,
                color: `#333333`,
                label: `7.5% (US average)`,
              },
              // {
              //   value: 10,
              //   color: `#475785`,
              //   label: null,
              // },
              // {
              //   value: 15,
              //   color: `#526aad`,
              //   label: null,
              // },
              {
                value: 25,
                color: `#6cd4c5`,
                label: `> 25%`,
              },
            ],
          },
        ],
      },
      popupTemplate: {
        title: `{NAME}`,
        content: `this is the popup.`,
      },
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
      `esri/widgets/Legend`,
      `esri/widgets/Expand`,
    ])
      .then(
        ([
          Map,
          MapView,
          Home,
          VectorTileLayer,
          Basemap,
          FeatureLayer,
          Legend,
          Expand,
        ]) => {
          const vectorBaseLayer = new VectorTileLayer({
            url: `https://www.arcgis.com/sharing/rest/content/items/5e9b3685f4c24d8781073dd928ebda50/resources/styles/root.json`,
          });
          // TODO add local vector style reference
          const vectorBaseReference = new VectorTileLayer({
            url: `https://www.arcgis.com/sharing/rest/content/items/747cb7a5329c478cbe6981076cc879c5/resources/styles/root.json`,
            opacity: 0.7,
          });

          const generateFeatureLayerCollection = () => {
            return this.featureLayers.map(layerInfo => {
              return new FeatureLayer({
                url: layerInfo.url,
                renderer: this.colorRenderer,
                popupEnabled: true,
                popupTemplate: layerInfo.popupTemplate,
                visible: layerInfo.visible,
                title: layerInfo.title,
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
            });
          };

          const basemap = new Basemap({
            baseLayers: [vectorBaseLayer],
            referenceLayers: [vectorBaseReference],
          });

          const map = new Map({
            basemap,
            layers: generateFeatureLayerCollection(),
          });

          this.view = new MapView({
            container: this.$el,
            map,
            extent: {
              xmin: -13915371,
              ymin: -185352,
              xmax: -8045007,
              ymax: 7641798,
              spatialReference: {
                wkid: 102100,
              },
            },
            popup: {
              dockOptions: {
                breakpoint: {
                  width: 600,
                  height: 600,
                },
                position: `top-right`,
              },
            },
          });

          const legend = new Legend({
            view: this.view,
            container: document.createElement(`div`),
            id: `legendID`,
          });

          const legendExpandWidget = new Expand({
            view: this.view,
            content: legend,
            expandIconClass: `esri-icon-key`,
            expanded: false,
            mode: `floating`,
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
          function getMapLayerByTitle(layerTitle) {
            return map.layers.items.filter(
              layer => layer.title == layerTitle
            )[0];
          }
          this.view.when(
            () => {
              // All the resources in the MapView and the map have loaded. Now execute additional processes

              const homeButton = new Home({
                view: this.view,
              });
              this.view.ui.add(homeButton, `top-left`);
              this.view.ui.add(legendExpandWidget, `top-left`);

              let targetLayer = getMapLayerByTitle(`County`); //targetLayer will be used for layer visibility and setting up the layerView for the chart

              this.view.watch(`zoom`, newZoomVal => {
                if (newZoomVal > 7 && newZoomVal <= 10) {
                  targetLayer = getMapLayerByTitle(`ZIP Code`);
                } else if (newZoomVal > 10 && newZoomVal <= 12) {
                  targetLayer = getMapLayerByTitle(`Census Tract`);
                } else if (newZoomVal > 12) {
                  targetLayer = getMapLayerByTitle(`Census Block Group`);
                } else {
                  targetLayer = getMapLayerByTitle(`County`);
                }
                setActiveLayer({
                  layerCollection: map.layers,
                  visibleLayer: targetLayer,
                });
              });
              // set up a view layer fore each layer in the map and create client side query on each view
              map.layers.forEach(async layer => {
                const layerView = await this.view
                  .whenLayerView(layer)
                  .catch(console.error);
                layerView.watch(`updating`, async isUpdating => {
                  if (!isUpdating) {
                    let results = await layerView
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
              });
            },
            error => {
              // Use the errback function to handle when the view doesn't load properly
              console.error(`The view's resources failed to load: `, error);
            }
          );
        }
      )
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

.esri-legend__layer-table.esri-legend__layer-table--size-ramp {
  display: none !important;
}
</style>
