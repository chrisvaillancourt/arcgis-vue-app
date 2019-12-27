<template>
  <div class="small">
    <horizontal-bar-chart
      :chart-data="datacollection"
      :options="chartOptions"
    ></horizontal-bar-chart>
  </div>
</template>

<script>
// TODO UPDATE CHART LABELS AND REORDER
import { mapState, mapGetters } from "vuex";
import HorizontalBarChart from "./HorizontalBarChart.js";

export default {
  components: {
    HorizontalBarChart,
  },
  data: function() {
    return {
      datacollection: {},
      chartData: {},
      fieldAliases: {},
      chartOptions: {
        legend: {
          display: false,
        },
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
  mounted() {},
  created() {
    /* 
     also can be:
    created: function() {
  }, 
  */
    this.getFieldAliases()
      .then(fieldAliasesObj => {
        this.fieldAliases = fieldAliasesObj;
      })
      .catch(console.error);
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: this.chartData.map(dataArr => dataArr.alias),
        datasets: [
          {
            label: `data`,
            backgroundColor: `#f87979`,
            data: this.getSummaryStats.map(obj => obj.value),
          },
        ],
      };
    },

    getFieldAliases: async function() {
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
  computed: {
    ...mapState([`mapViewData`, `mapViewSummaryData`, `featureLayerURL`]),
    ...mapGetters([`getSummaryStats`]),
    summarizeMapViewData: function() {
      const summaryObject = this.mapViewData.reduce(
        (accumulator, currentObject) => {
          for (let [key, value] of Object.entries(currentObject)) {
            // Remove unnecessary field summary
            if (key == `OBJECTID` || key == `AREA_GEO`) {
              continue;
            }
            if (accumulator[key] == undefined) {
              accumulator[key] = value;
            } else {
              accumulator[key] = accumulator[key] + value;
            }
          }
          return accumulator;
        },
        {}
      );

      const summaryArray = Object.entries(summaryObject).map(entriesArray => {
        return {
          key: entriesArray[0],
          alias: this.fieldAliases
            .filter(aliasArr => aliasArr.name == entriesArray[0])
            .map(subArr => subArr.alias)
            .toString()
            .replace(`(Esri 2019)`, ``)
            .trim(),
          value: entriesArray[1],
        };
      });
      summaryArray.sort((a, b) => a.alias.slice(0, 4) - b.alias.slice(0, 4));
      return summaryArray;
    },
  },
  watch: {
    mapViewData() {
      this.chartData = this.summarizeMapViewData;
      this.fillData();
    },
  },
};
</script>

<style>
.small {
  max-width: 500px;
  /* margin: 150px auto; */
  background-color: #fff;
}
</style>
