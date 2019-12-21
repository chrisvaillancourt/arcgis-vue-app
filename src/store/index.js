import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapViewData: [{}],
    mapViewSummaryData:[{}],
    featureLayerURL: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/1`,
  },
  // getters are like computed properties for stores
  getters: {
    getSummaryStats: state => {
     
      const summaryObject = state.mapViewData.reduce((accumulator, currentObject) => {

        for (let [key, value] of Object.entries(currentObject)) {
          // Remove unnecessary field summary
          if(key == `OBJECTID` || key == `AREA_GEO`) {
            continue;
          }
          if (accumulator[key] == undefined) {
            accumulator[key] = value;
            } else {
            accumulator[key] = accumulator[key] + value;
            }
          }
        return accumulator;
        
      },{});
    
      const summaryArray = Object.entries(summaryObject).map(entriesArray => {
        return {
          key: entriesArray[0],
          value: entriesArray[1],
        };
      });
      
      // summaryArray.sort((a, b) => a.alias.slice(0, 4) - b.alias.slice(0, 4));
      return summaryArray;
    },
    // getFieldAliases: async state => {
    //   let fields;
    //   const response = await fetch(`${state.featureLayerURL}?f=pjson`);
    //   if (response.ok) {
    //     ({ fields } = await response.json());
    //   } else {
    //     fields = null;
    //     console.error(`request error: ${response.status}`);
    //   }
    //   return fields;
    // }
    
  },
  mutations: {
    UPDATE_MAP_VIEW_DATA: (state, data) => state.mapViewData = [...data],
    UPDATE_MAP_SUMMARY_DATA: (state, data) => state.mapViewSummaryData = [...data],
  }, 
  actions: {
  },
  strict: process.env.NODE_ENV !== `production`
});