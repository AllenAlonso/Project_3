// Creating the map object
let myMap = L.map("map", {
  center: [37.0902, -95.7129],
  zoom: 4
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Store the API query variables.
// For docs, refer to https://dev.socrata.com/docs/queries/where.html.
// And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
let base = "api/v1.0/baseballdata";

// Assemble the API query URL.
let url = base;

// Get the data with d3.
d3.json(url).then(function (response) {

  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  // Loop through the data.
  response.forEach(draft => {
    if (draft.PlayerName) {
      let loc = [draft.Latitude, draft.Longitude]
      markers.addLayer(L.marker(loc).bindPopup(`<h1>${draft.PlayerName}</h1><hr><h3>${draft.School}, ${draft.HighLevel}</h3>`))
    }
  })

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

// Grab defaults
let arkansas = Object.values(data.arkansas);
let img_academy = Object.values(data.img_academy);

// Create an array of category labels
let labels = Object.keys(data.virginia);

// Display the default plot
function init() {
  let data = [{
    values: img_academy,
    labels: labels,
    type: "pie"
  }];

  let layout = {
    title: {
      text:'High Schools',
      font: {
        family: 'Courier New, monospace',
        size: 20
      },
      xref: 'paper',
      x: 0.05,
    },
    height: 500,
    width: 500
  };

  Plotly.newPlot("pie", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);


// Update the restyled plot's values
function updatePlotly(newdata) {
  Plotly.restyle("pie", "values", [newdata]);
}

init();

// Create an array of category labels
let labels2 = Object.keys(data.virginia);

// Display the default plot
function init2() {
  let data = [{
    values: arkansas,
    labels: labels2,
    type: "pie"
  }];

  let layout = {
    title: {
      text:'Colleges',
      font: {
        family: 'Courier New, monospace',
        size: 20
      },
      xref: 'paper',
      x: 0.05,
    },
    height: 500,
    width: 500
  };

  Plotly.newPlot("pie2", data, layout);
}

// On change to the DOM, call getData2()
d3.selectAll("#selDataset2").on("change", getData2);

// Update the restyled plot's values
function updatePlotly2(newdata) {
  Plotly.restyle("pie2", "values", [newdata]);
}

init2();

  // Add initial meta-data 1
  let metaDiv = d3.select("#metaDiv");

  let personMetadata = data['img_academy']
  
  metaDiv.append('p').text('Rookie: ' + personMetadata["Rookie"]);
  metaDiv.append('p').text('A: ' + personMetadata["A"]);
  metaDiv.append('p').text('A+: ' + personMetadata["A+"]);
  metaDiv.append('p').text('AA: ' + personMetadata["AA"]);
  metaDiv.append('p').text('AAA: ' + personMetadata["AAA"]);
  metaDiv.append('p').text('MLB: ' + personMetadata["MLB"]);

  //  Add initial meta-data 2
  let metaDiv2 = d3.select("#metaDiv2");

  let personMetadata2 = data['arkansas']
  
  metaDiv2.append('p').text('Rookie: ' + personMetadata2["Rookie"]);
  metaDiv2.append('p').text('A: ' + personMetadata2["A"]);
  metaDiv2.append('p').text('A+: ' + personMetadata2["A+"]);
  metaDiv2.append('p').text('AA: ' + personMetadata2["AA"]);
  metaDiv2.append('p').text('AAA: ' + personMetadata2["AAA"]);
  metaDiv2.append('p').text('MLB: ' + personMetadata2["MLB"]);
  

  // Handle user selection for meta data 1
  function updateMetadata(highschool) {
    let metaDiv = d3.select("#metaDiv");
    metaDiv.html("");
    let personMetadata = data[highschool];
    metaDiv.append('p').text('Rookie: ' + personMetadata["Rookie"]);
    metaDiv.append('p').text('A: ' + personMetadata["A"]);
    metaDiv.append('p').text('A+: ' + personMetadata["A+"]);
    metaDiv.append('p').text('AA: ' + personMetadata["AA"]);
    metaDiv.append('p').text('AAA: ' + personMetadata["AAA"]);
    metaDiv.append('p').text('MLB: ' + personMetadata["MLB"]);
  }

  // // Get selected option and update metadata
  function getData() {
    let selectedOption = d3.select("#selDataset").property("value");
    updateMetadata(selectedOption);

    let schoolDataArray = Object.values(data[selectedOption]);
    updatePlotly(schoolDataArray);
  }
    
  // Handle user selection for meta data 2
  function updateMetadata2(college) {
    let metaDiv2 = d3.select("#metaDiv2");
    metaDiv2.html("");
    let personMetadata2 = data[college];
    metaDiv2.append('p').text('Rookie: ' + personMetadata2["Rookie"]);
    metaDiv2.append('p').text('A: ' + personMetadata2["A"]);
    metaDiv2.append('p').text('A+: ' + personMetadata2["A+"]);
    metaDiv2.append('p').text('AA: ' + personMetadata2["AA"]);
    metaDiv2.append('p').text('AAA: ' + personMetadata2["AAA"]);
    metaDiv2.append('p').text('MLB: ' + personMetadata2["MLB"]);
  }
    // // Get selected option and update metadata
  function getData2() {
    let selectedOption2 = d3.select("#selDataset2").property("value");
    updateMetadata2(selectedOption2);

    let schoolDataArray2 = Object.values(data[selectedOption2]);
    updatePlotly2(schoolDataArray2);
  }


  fetch('/college')
  .then(response => response.json())
  .then(data => {

    //lodash sorting
    const sortedObj = _.fromPairs(_.sortBy(_.toPairs(data), [(entry) => entry[1]]));


    let trace1 = {
      x: Object.values(sortedObj),
      y: Object.keys(sortedObj),
      text: Object.keys(sortedObj),
      type: 'bar',
      orientation: "h"
    };
      
    let formattedData = [trace1];
      
    let layout = {
        margin: {
          l: 400,
          r: 100,
          t: 100,
          b: 100
        },
        title: {
          text:'Top 10 Colleges',
          font: {
            family: 'Courier New, monospace',
            size: 20
          },
          xref: 'paper',
          x: 0.05,
        },
        xaxis: { title: 'Number of Students Drafted' },
        //yaxis: { title: 'Schools' },
      };
  
    Plotly.newPlot("bar", formattedData, layout);
    // Process the JSON data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  console.log(data)
  fetch('/highschool')
  .then(response => response.json())
  .then(data => {

    //lodash sorting
    const sortedObj = _.fromPairs(_.sortBy(_.toPairs(data), [(entry) => entry[1]]));

    let trace2 = {
      x: Object.values(sortedObj),
      y: Object.keys(sortedObj),
      text: Object.keys(sortedObj),
      type: 'bar',
      orientation: "h"
    };
      
    let formattedData = [trace2];
      
    let layout = {
        margin: {
          l: 400,
          r: 100,
          t: 100,
          b: 100
        },
        title: {
          text:'Top 10 High Schools',
          font: {
            family: 'Courier New, monospace',
            size: 20
          },
          xref: 'paper',
          x: 0.05,
        },
        xaxis: { title: 'Number of Students Drafted' },
        //yaxis: { title: 'Schools' },
      };
  
    Plotly.newPlot("bar2", formattedData, layout);
    // Process the JSON data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  console.log(data)
});

