
// using d3 for convenience
let main = d3.select("main");
let scrolly = main.select("#scrolly");
let $figure = scrolly.select("figure");
let wChart = 1200;
let hChart = wChart * 0.4;
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
d3.csv("../datos/bjork.csv", d3.autoType).then(function (data) {
  dataChart = data;
  // kick things off
  init();
});



function handleStepExit(response) {
  // if ($step) {
  console.count("classed");
  d3.select(response.element).classed("is-active", false);
  response.element.style.transform = 'translateY(100px)';
  
  if (key == "entrada") {
    deleteFixedText();
    d3.select("#scrolly figure svg").remove();
  }
  if (key === "danceability") {
    // Remove the plot
    d3.select("#scrolly figure svg").remove();
    
    // Remove the fixed text
    deleteFixedText();
  }
}

// scrollama event handlers
function handleStepEnter(response) {
  response.element.style.transform = 'translateY(0)';
  // console.log(response);
  $step = d3.select(response.element);


  $step.classed("is-active", true);
  console.count("classed");

  const key = $step.attr("data-step");
  updateFixedText($step.attr("data-step"));

  if (key == "salida" || key == "entrada"){ 
    deleteFixedText();
  } else {
    createChart(key);
  }
}


const labelMapping = {
  "danceability": "Bailabilidad",
  "instrumentalness": "Intrumentalidad",
  "energy": "Energía",
  "acousticness" : "Acústica",
  "popularity": "Popularidad"
  // Add more key-label mappings as needed
};

const colorScale = d3.scaleOrdinal()
  .range(["#9DC0A8", "#D58B7C", "#D78840", "#D26227", "#B92530", "#A81152", "#6B1161", "#222764", "#172649"]);

/* DataViz */
function createChart(key) {
  let chart = Plot.plot({
    width: wChart,
    height: hChart,
    grid: true,
    margin: 100,
    insetLeft: 30,
    x: {
      nice: true,
      label: "Año",
      tickFormat: d3.format(".0f"),
      ticks: [1993, 1995, 1997, 2001, 2004, 2007, 2015, 2017, 2022],
    },
    y : {
      nice: true,
      domain: getDefaultDomain(key),
      label: labelMapping[key] || "default",
    },
    marks: [
      Plot.barY(
        dataChart, Plot.groupX({y: "mean"},{ 
          x: "year",
          y: key,
          fill: "color", 
          stroke: "white",
          strokeWidth: 3,
        })
      ),
    ],    
    style: {
      fontFamily: 'sans-serif',
      fontSize: 25,
      padding: '10px',
      background: "transparent",
      color: "white",
    },
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

  } else if (key === "instrumentalness"){
    return [0, 0.35]
  }
  else {
    return [0, 1];
  }
}

function updateFixedText(key) {
  // Remove previous fixed text
  d3.select("#fixedText").selectAll("*").remove();

  if(key == "danceability"){
    d3.select("#fixedText")
    .append("img")
    .attr("src", "../imagenes/DebutInfo.svg")
    .style("max-width", "65%")
    .style("max-height", "65%");
  }
  else if(key == "instrumentalness"){
    d3.select("#fixedText")
    .append("img")
    .attr("src", "../imagenes/PostInfo.svg")
    .style("max-width", "65%")
    .style("max-height", "65%");
  }
  else if(key == "energy"){
    d3.select("#fixedText")
    .append("img")
    .attr("src", "../imagenes/HomoInfo.svg")
    .style("max-width", "65%")
    .style("max-height", "65%");
  }
  else if(key == "acousticness"){
    d3.select("#fixedText")
    .append("img")
    .attr("src", "../imagenes/MedullaInfo.svg")
    .style("max-width", "50%")
    .style("max-height", "50%");

    d3.select("#fixedText")
    .append("img")
    .attr("src", "../imagenes/UtopiaInfo.svg")
    .style("max-width", "50%")
    .style("max-height", "50%");
  }

    

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
  d3.select("#scrolly figure svg").selectAll("*").remove()
  // d3.select("#fixedImage").selectAll("*").remove();
}
