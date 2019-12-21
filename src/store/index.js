import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapViewData: [{}],
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
      console.log(summaryArray);
      return summaryArray;
    },
    
  },
  mutations: {
    
    UPDATE_MAP_VIEW_DATA: (state, data) => state.mapViewData = [...data],
  }, 
  actions: {

  },
  strict: process.env.NODE_ENV !== `production`
});