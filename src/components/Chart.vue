<template>
  <div>
    <!-- <h2>Summary Stats</h2>
    <div>
      <ul>
        <li v-for="(value, key, index) in getSummaryStats" :key="index">
          {{ key }}: {{ value }}
        </li>
      </ul>
    </div> -->
    <div id="chartDiv">
      <svg id="chartSVG" :width="width" :height="height">
        <g :transform="`translate(${margin.left}, ${margin.right})`">
          <g class="rects">
            <rect
              v-for="d in dataArray"
              :key="d.key"
              :y="yScale(yValue(d))"
              :height="yScale.bandwidth()"
              :width="xScale(xValue(d))"
            ></rect>
          </g>
          <g class="yAxis"></g>
          <g class="xAxis" :transform="`translate(0, ${this.innerHeight})`"></g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { select, selectAll } from "d3-selection";
import { scaleBand, scaleLinear } from "d3-scale";
import { axisLeft, axisBottom } from "d3-axis";
import { format } from "d3-format";

// TODO make size reactive
const width = 800;
const height = 400;
const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 150,
};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const xValue = d => d.value;
const yValue = d => d.alias;

export default {
  name: `Chart`,
  props: [``],
  data: function() {
    return {
      width,
      height,
      margin,
      innerWidth,
      innerHeight,
      dataArray: [],
      maxXValue: 0,
      xValue,
      yValue,
    };
  },
  computed: {
    ...mapState([`mapViewData`, `featureLayerURL`]),
    // other computed properties
    ...mapGetters([`getSummaryStats`]),
    featureLayerAliases: function() {
      return this.fetchFieldAliases();
    },
  },
  watch: {
    // watch will watch the specific property and run whenever it changes
    getSummaryStats: function() {
      this.calculateData()
        .then(() => this.calculateScales())
        .then(() => this.renderAxis());
      // this.calculateScales();
      // this.renderAxis();
    },
  },
  methods: {
    renderChart: async function() {},
    calculateData: async function() {
      const dataDomainLength = Object.keys(this.getSummaryStats).length;
      if (dataDomainLength == 0) return; // no data in map view

      const aliasesArray = await this.featureLayerAliases;

      this.dataArray = Object.entries(this.getSummaryStats).map(
        entriesArray => {
          return {
            key: entriesArray[0],
            alias: aliasesArray
              .filter(subObj => subObj.name == entriesArray[0])
              .map(obj => obj.alias)
              .toString()
              .replace(`(Esri 2019)`, ``)
              .trim(),
            value: entriesArray[1],
          };
        }
      );
      this.dataArray.sort((a, b) => a.alias.slice(0, 4) - b.alias.slice(0, 4));

      this.maxXValue = this.dataArray
        .map(xValue)
        .reduce((a, b) => Math.max(a, b));
    },
    calculateScales: function() {
      this.xScale = scaleLinear()
        .domain([0, this.maxXValue])
        .range([0, this.innerWidth]);

      this.yScale = scaleBand()
        .domain(this.dataArray.map(yValue))
        .range([0, this.innerHeight])
        .padding(0.1);
    },
    renderAxis: function() {
      const yAxis = axisLeft(this.yScale);
      const xAxis = axisBottom(this.xScale).tickFormat(format(`~s`));

      select(`.yAxis`)
        .call(yAxis)
        .selectAll(`.domain, .tick line`).remove;
      select(`.xAxis`)
        .call(xAxis)
        .select(`.domain`)
        .remove();
    },

    fetchFieldAliases: async function() {
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
};
</script>

<style>
rect {
  fill: steelblue;
  opacity: 0.5;
}
text {
  font-size: 12px;
}
</style>
