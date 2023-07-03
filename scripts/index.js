
// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200;
let hChart = wChart * 0.5;
let dataChart = [];
let $step;

// let colores = {
//   1993 : "hsl(22, 6, 25)",
//   1995 : 
// }

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
d3.csv("../../datos/bjork.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});

function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  response.element.style.transform = 'translateY(100px)';
  if (key == "salida") {

    deleteFixedText($step.attr("data-step"));
  }
  // }
}

// scrollama event handlers
function handleStepEnter(response) {
  response.element.style.transform = 'translateY(0)';
  // console.log(response);
  $step = d3.select(response.element);

  // add color to current step only
  // if ($step) {
  $step.classed("is-active", true);
  console.count("classed");
  // }
  // create new chart
  const key = $step.attr("data-step");
  updateFixedText($step.attr("data-step"));

  // console.log("response.element", response.element);
  // console.log("$step", $step);
  // console.log("key", key);
  if (key != "salida"){ 
  
    createChart(key);
  }else {
    deleteFixedText();
  }
}

/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    grid: true,
    margin:50,
    
    x: {
      nice: true,
    },
    y : {
      nice: true,
      domain: getDefaultDomain(key),
    },
    marks: [
      Plot.barY(
        dataChart, Plot.groupX({y: "mean"},{ 
          x: "year",
          y: key,
          fill: "album"
        })
      ),
    ],
  });
  d3.select("#scrolly figure svg").remove();
  d3.select("#scrolly figure").insert(() => chart, "#fixedText");


  // Update the fixed text
  updateFixedText(key);

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

function updateFixedText(key) {
  // Remove previous fixed text
  d3.select("#fixedText").selectAll("*").remove();

  // Append the new fixed text
  d3.select("#fixedText")
    .append("p")
    .text("Your text for key " + key + " goes here");

  // ...apply any additional styling as needed...
  const fixedTextElement = document.getElementById("fixedText");
  fixedTextElement.style.position = "fixed";
  fixedTextElement.style.left = "0";
  fixedTextElement.style.bottom = "0";

  
}

//para borrar el grafico
function deleteFixedText() {
  //Just remove the fixed text
  d3.select("#fixedText").selectAll("*").remove();

}