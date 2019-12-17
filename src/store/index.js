import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapViewData: [{}],
    
  },
  // getters are like computed properties for stores
  getters: {
    getSummaryStats: state => {
      const summary = state.mapViewData.reduce((accumulator, currentObject) => {
        for (let [key, value] of Object.entries(currentObject)) {
          // Remove unnecessary field summary
          if(key == "OBJECTID" || key == "AREA_GEO") {
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

      return summary;
    }
  },
  mutations: {
    
    UPDATE_MAP_VIEW_DATA: (state, data) => state.mapViewData = [...data],
  }, 
  actions: {

  },
  strict: process.env.NODE_ENV !== 'production'
});