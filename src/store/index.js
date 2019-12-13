import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mapViewData: [],
    arr: [1,2,3,4]
  },
  // getters are like computed properties for stores
  getters: {
    calcTotPopCY: state => {
      const popNums = state.mapViewData.map(data => data.TOTPOP_CY);
      return popNums.reduce((accumulator, currentValue) => accumulator + currentValue ,0)
      
    }
  },
  mutations: {
    ADD_ITEM: (state, payload) => {
      state.arr = [...state.arr, payload.amount]
    },
    UPDATE_MAP_VIEW_DATA: (state, data) => state.mapViewData = [...data],
  }, 
  actions: {

  }
});