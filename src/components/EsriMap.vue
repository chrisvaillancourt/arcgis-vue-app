<template>
  <div id="map"></div>
</template>

<script>
import { loadModules, setDefaultOptions } from "esri-loader";
import { mapMutations } from "vuex";
setDefaultOptions({
  version: `4.13`,
  css: `https://js.arcgis.com/4.13/esri/themes/dark/main.css`,
});
// TODO remove setDefaultOptions once client side query issue resolved

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
          outline: { width: 0.75, color: [145, 145, 145, 0.15] },
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
                label: `< -5%`,
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
      `esri/widgets/Search`,
      `esri/webmap/Bookmark`,
      `esri/widgets/Bookmarks`,
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
          Search,
          Bookmark,
          Bookmarks,
        ]) => {
          const vectorBaseLayer = new VectorTileLayer({
            url: `https://www.arcgis.com/sharing/rest/content/items/5e9b3685f4c24d8781073dd928ebda50/resources/styles/root.json`,
          });
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
              xmin: -14536650.344461735,
              ymin: 22014.01594614098,
              xmax: -7032368.655538267,
              ymax: 7805137.9840538595,
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

          const searchWidget = new Search({
            view: this.view,
          });

          const searchExpandWidget = new Expand({
            view: this.view,
            content: searchWidget,
            expandIconClass: `esri-icon-search`,
            expanded: false,
            mode: `floating`,
          });

          const nycBookmark = new Bookmark({
            extent: {
              xmin: -8255973,
              ymin: 4941087,
              xmax: -8197346,
              ymax: 5001893,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `New York City, NY`,
            thumbnail: null,
          });

          const chicagoBookmark = new Bookmark({
            extent: {
              xmin: -9782908,
              ymin: 5107405,
              xmax: -9724281,
              ymax: 5168210,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Chicago, IL`,
            thumbnail: null,
          });

          const seattleBoomark = new Bookmark({
            extent: {
              xmin: -13646965,
              ymin: 6010770,
              xmax: -13588338,
              ymax: 6071576,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Seattle, WA`,
            thumbnail: null,
          });

          const austinBookmark = new Bookmark({
            extent: {
              xmin: -10910013,
              ymin: 3507615,
              xmax: -10851386,
              ymax: 3568421,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Austin, TX`,
            thumbnail: null,
          });

          const denverBookmark = new Bookmark({
            extent: {
              xmin: -11716971,
              ymin: 4797872,
              xmax: -11658344,
              ymax: 4858678,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Denver, CO`,
            thumbnail: null,
          });

          const detroitBookmark = new Bookmark({
            extent: {
              xmin: -9274174,
              ymin: 5180415,
              xmax: -9215547,
              ymax: 5241221,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Detroit, MI`,
            thumbnail: null,
          });

          const baltimoreBookmark = new Bookmark({
            extent: {
              xmin: -8542760,
              ymin: 4748187,
              xmax: -8513447,
              ymax: 4778590,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Baltimore, MD`,
            thumbnail: null,
          });

          const buckeyeBookmark = new Bookmark({
            extent: {
              xmin: -12562745,
              ymin: 3914237,
              xmax: -12504117,
              ymax: 3975042,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Buckeye, AZ`,
            thumbnail: null,
          });

          const flintBookmark = new Bookmark({
            extent: {
              xmin: -9330627,
              ymin: 5298518,
              xmax: -9301314,
              ymax: 5328921,
              spatialReference: {
                wkid: 102100,
              },
            },
            name: `Flint, MI`,
            thumbnail: null,
          });

          const bookmarks = new Bookmarks({
            view: this.view,
            bookmarks: [
              austinBookmark,
              baltimoreBookmark,
              buckeyeBookmark,
              chicagoBookmark,
              denverBookmark,
              detroitBookmark,
              flintBookmark,
              nycBookmark,
              seattleBoomark,
            ],
          });

          const bookmarksExpandWidget = new Expand({
            view: this.view,
            content: bookmarks,
            expandIconClass: `esri-icon-bookmark`,
            expanded: false,
            mode: `floating`,
          });

          // use view.when to do functionality after view is loaded
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

              this.view.ui.add([homeButton, legendExpandWidget], `top-left`);
              this.view.ui.add(
                [searchExpandWidget, bookmarksExpandWidget],
                `top-right`
              );
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
