// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200
let hChart = wChart * 0.5;
let dataChart = [];
let $step;

// initialize the scrollama
let scroller = scrollama();

function init() {
  // 1. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 2. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly article .step",
      offset: 0.33,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress);
}
// fetch data
d3.csv("./data/bjork.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }

  $step.style("background", "#ff00002e");

  // create new chart
  const key = $step.attr("data-step");

  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);

  createChart(key);
}

function handleStepProgress(response) {
  // console.log(response);
  // $figure.style("opacity", response.progress);
  // $step = d3.select(response.element);
  // console.log($step.attr("data-step"));
  $step.select(".progress").text(d3.format(".1%")(response.progress));
}



/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    grid: true,
    marginTop: 50,
    marginBottom: 100,
    marginLeft: 50,
    marginRight: 50,
    x: {
      ticks: 10,
      nice: true,
    },
    y : {
      domain: getDefaultDomain(key),
    },
    //y: {domain: [0,250],},
    marks: [
      Plot.line(
        dataChart, Plot.groupX({y: "mean"},{ 
       // Plot.groupY({x: 'mean'}, { 
          
          x: "year",
          y: key,
          //r: 8,
          anchor: "middle",
          //curve: "natural",
        })
      ),],
  });


  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").append(() => chart);
}

function getDefaultDomain(key) {
  if (key === "loudness") {
    return [-60, 0];
  } else if (key === "popularity"){
    // Define the default domain for other keys
    return [0, 100];
  } else {
    return [0, 1];
  }
}