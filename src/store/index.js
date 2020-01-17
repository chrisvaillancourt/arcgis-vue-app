import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapViewData: [{}],
    mapViewSummaryData:[{}],
    dataAliasesURL: `https://services.arcgis.com/AgwDJMQH12AGieWa/ArcGIS/rest/services/Population_Households_Housing_Units_Time_Series_2019_Simplified/FeatureServer/1`,
  },
  mutations: {
    UPDATE_MAP_VIEW_DATA: (state, data) => state.mapViewData = [...data],
  }, 
  actions: {
  },
  strict: process.env.NODE_ENV !== `production`
});