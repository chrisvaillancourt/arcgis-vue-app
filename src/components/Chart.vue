<template>
  <div>
    <h2>Summary Stats</h2>
    <div>
      <ul>
        <li v-for="(value, key, index) in getSummaryStats" :key="index">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div>
    <div id="chartDiv">
      <svg id="chartSVG" :width="width" :height="height"></svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";

const width = 600;
const height = 600;

export default {
  name: `Chart`,
  props: [``],
  data: function() {
    return {
      width,
      height,
    };
  },
  computed: {
    ...mapState([`mapViewData`]),
    // other computed properties
    ...mapGetters([`getSummaryStats`]),

    // renderChart: function() {
    //   const chartData = this.getSummaryStats;
    //   const svg = select("svg")
    //     .attr("width", 300)
    //     .attr("height", 600); // TODO make size reactive
    //   svg
    //     .selectAll("rect")
    //     .data(chartData)
    //     .enter()
    //     .append("rect")
    //     .attr("width", 100)
    //     .attr("height", 100)
    //     .attr("fill", "#c2c2c2");
    // },
  },
  watch: {
    // watch will watch the specific property and run whenever it changes
    getSummaryStats: function() {
      this.renderChart();
    },
  },
  methods: {
    renderChart: function() {
      const dataDomainLength = Object.keys(this.getSummaryStats).length;

      if (dataDomainLength == 0) return; // no data in map view
      /*
      this.getSummaryStats data object:
      {
        TOTPOP00: 22087961,
        TOTPOP_CY: 26618778,
        TSPOP10_CY: 24845614,
        TSPOP11_CY: 25017590,
        TSPOP12_CY: 25167806,
        TSPOP13_CY: 25316876,
        TSPOP14_CY: 25471298,
        TSPOP15_CY: 25664045,
        TSPOP16_CY: 25966911,
        TSPOP17_CY: 26248770,
        TSPOP18_CY: 26491904,
      }
      */

      const dataArray = Object.entries(this.getSummaryStats).map(
        entriesArray => {
          return {
            key: entriesArray[0],
            value: entriesArray[1],
          };
        }
      );

      /*

      dataArray:
      [
        { key: "TOTPOP00", value: 19586821 },
        { key: "TOTPOP_CY", value: 22791014 },
        { key: "TSPOP10_CY", value: 21416513 },
        { key: "TSPOP11_CY", value: 21546621 },
        { key: "TSPOP12_CY", value: 21658726 },
        { key: "TSPOP13_CY", value: 21774620 },
        { key: "TSPOP14_CY", value: 21896343 },
        { key: "TSPOP15_CY", value: 22047858 },
        { key: "TSPOP16_CY", value: 22296069 },
        { key: "TSPOP17_CY", value: 22534595 },
        { key: "TSPOP18_CY", value: 22722031 }
      ]
      */
      const xValue = d => d.value;
      const yValue = d => d.key;
      const margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 85,
      };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const maxXValue = dataArray.map(xValue).reduce((a, b) => Math.max(a, b));

      const xScale = scaleLinear()
        .domain([0, maxXValue])
        .range([0, innerWidth]);

      const xAxis = axisBottom(xScale);

      const yScale = scaleBand()
        .domain(dataArray.map(yValue))
        .range([0, innerHeight])
        .padding(0.1);

      const yAxis = axisLeft(yScale);

      const svg = select(`#chartSVG`);
      const g = svg
        .append(`g`)
        .attr(`transform`, `translate(${margin.left}, ${margin.right})`);

      // calling yAxis function and passing in a selection: yAxis(g.append(`g`));
      // we can use call method to call a function on a selection instead

      // add yAxis to chart
      g.append(`g`).call(yAxis);

      // add xAxis to chart
      g.append(`g`)
        .call(xAxis)
        .attr(`transform`, `translate(0, ${innerHeight})`);

      g.selectAll(`rect`)
        .data(dataArray)
        .enter()
        .append(`rect`)
        .attr(`y`, d => yScale(yValue(d)))
        .attr(`width`, d => xScale(xValue(d)))
        .attr(`height`, yScale.bandwidth());
    },
  },
  mounted() {},
  updated() {},
};
</script>

<style scoped>
rect {
  fill: steelblue;
}
text {
  font-size: 1.5rem;
}
</style>

// TODO flexible chart sizing
