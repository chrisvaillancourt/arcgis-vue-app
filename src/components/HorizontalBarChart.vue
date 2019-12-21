<template>
  <div class="small">
    <horizontal-bar-chart
      :chart-data="datacollection"
      :options="chartOptions"
    ></horizontal-bar-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import HorizontalBarChart from "./HorizontalBarChart.js";

export default {
  components: {
    HorizontalBarChart,
  },
  data: function() {
    return {
      datacollection: {},
      chartOptions: {
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        // labels: [this.getRandomInt() * -1, this.getRandomInt() * -1],
        // datasets: [
        //   {
        //     label: `Data One`,
        //     backgroundColor: `#f87979`,
        //     data: [this.getRandomInt(), this.getRandomInt()],
        //   },
        //   {
        //     label: `Data One`,
        //     backgroundColor: `#f87979`,
        //     data: [this.getRandomInt(), this.getRandomInt()],
        //   },
        // ],
        labels: this.getSummaryStats.map(obj => obj.key),
        datasets: [
          {
            label: `data`,
            backgroundColor: `#f87979`,
            data: this.getSummaryStats.map(obj => obj.value),
          },
        ],
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  },
  computed: {
    ...mapState([`mapViewData`, `featureLayerURL`]),
    ...mapGetters([`getSummaryStats`]),
  },
  watch: {
    getSummaryStats: function() {
      this.fillData();
      // console.log(this.getSummaryStats);
      // for (let [key, value] of Object.entries(this.getSummaryStats)) {
      //   console.log(`${key}: ${value}`);
      // }
      // let dataArray = Object.entries(this.getSummaryStats).map(entriesArray => {
      //   return {
      //     key: entriesArray[0],
      //     value: entriesArray[1],
      //   };
      // });
      // console.log(dataArray);
    },
    datacollection: function() {},
  },
};
</script>

<style>
.small {
  max-width: 600px;
  margin: 150px auto;
}
</style>
