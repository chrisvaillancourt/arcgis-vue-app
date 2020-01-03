<template>
  <div class="chart-container">
    <horizontal-bar-chart
      id="bar-chart"
      :chart-data="datacollection"
      :options="chartOptions"
      :styles="chartStyles"
    />
  </div>
</template>

<script>
// TODO explain how numbers are calculated
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
      chartStyles: {
        height: `100%`,
        width: `100%`,
        position: `relative`,
      },
      chartOptions: {
        title: {
          display: true,
          fontFamily: `"Avenir", Helvetica, Arial, sans-serif`,
          fontColor: `#d1d1d1`,
          fontStyle: `normal`,
          fontSize: 18,
          text: [`Total Population Over Time`],
        },
        tooltips: {
          backgroundColor: `#2e2f3e`,
          titleFontFamily: `"Avenir", Helvetica, Arial, sans-serif`,
          bodyFontFamily: `"Avenir", Helvetica, Arial, sans-serif`,
          displayColors: false,
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.value
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1,`);
            },
          },
        },
        devicePixelRatio: 2,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              type: `linear`,
              display: `auto`,
              ticks: {
                beginAtZero: true,
                fontColor: `#d1d1d1`,
                callback: function(value, index, values) {
                  return value
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1,`);
                },
              },
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
                color: `#595959bf`,
              },
              scaleLabel: {
                display: true,
                labelString: `Population in Current Map Extent`,
                fontColor: `#7f7f7f`,
                fontFamily: `"Avenir", Helvetica, Arial, sans-serif`,
              },
            },
          ],
          yAxes: [
            {
              display: `auto`,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: `#d1d1d1`,
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
            backgroundColor: `#595959`,
            data: this.getSummaryStats.map(obj => obj.value),
          },
        ],
      };
    },

    getFieldAliases: async function() {
      let fields;
      const response = await fetch(`${this.dataAliasesURL}?f=pjson`);
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
    ...mapState([`mapViewData`, `mapViewSummaryData`, `dataAliasesURL`]),
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
            .slice(0, 4)
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
.chart-container {
  background-color: #1a1a1a;
}
</style>
