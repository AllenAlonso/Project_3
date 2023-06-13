// Creating the map object
let myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
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
      markers.addLayer(L.marker(loc).bindPopup(draft.School))
    }
  })

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

// Create an array of each country's numbers
let virginia = Object.values(data.virginia);
let arizona = Object.values(data.arizona);
let kentucky = Object.values(data.kentucky);
let vanderbilt = Object.values(data.vanderbilt);
let oregon_state = Object.values(data.oregon_state);
let tennessee = Object.values(data.tennessee);
let texas_tech = Object.values(data.texas_tech);
let florida = Object.values(data.florida);
let louisville = Object.values(data.louisville);
let img_academy = Object.values(data.img_academy);
let carlos_beltran_baseball_academy = Object.values(data.carlos_beltran_baseball_academy);
let leadership_christian_academy = Object.values(data.leadership_christian_academy);
let pj_education_school = Object.values(data.pj_education_school);
let puerto_rico_baseball_academy = Object.values(data.puerto_rico_baseball_academy);
let jserra_catholic = Object.values(data.jserra_catholic);
let calvary_christian_academy = Object.values(data.calvary_christian_academy);
let american_heritage = Object.values(data.american_heritage);
let tnxl_academy = Object.values(data.tnxl_academy);
let orange_lutheran = Object.values(data.orange_lutheran);

// Create an array of category labels
let labels = Object.keys(data.virginia);

// Display the default plot
function init() {
  let data = [{
    values: virginia,
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

// Function called by DOM changes
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'img_academy') {
    data = img_academy;
  }
  else if (dataset == 'carlos_beltran_baseball_academy') {
    data = carlos_beltran_baseball_academy;
  }
  else if (dataset == 'leadership_christian_academy') {
    data = leadership_christian_academy;
  }
  else if (dataset == 'pj_education_school') {
    data = pj_education_school;
  }
  else if (dataset == 'puerto_rico_baseball_academy') {
    data = puerto_rico_baseball_academy;
  }
  else if (dataset == 'jserra_catholic') {
    data = jserra_catholic;
  }
  else if (dataset == 'calvary_christian_academy') {
    data = calvary_christian_academy;
  }
  else if (dataset == 'american_heritage') {
    data = american_heritage;
  }
  else if (dataset == 'tnxl_academy') {
    data = tnxl_academy;
  }
  else if (dataset == 'orange_lutheran') {
    data = orange_lutheran;
  }
  // Call function to update the chart
  updatePlotly(data);
}

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
    values: virginia,
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

// Function called by DOM changes
function getData2() {
  let dropdownMenu = d3.select("#selDataset2");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // Initialize an empty array for the country's data
  let data = [];

  if (dataset == 'virginia') {
    data = virginia;
  }
  else if (dataset == 'arizona') {
    data = arizona;
  }
  else if (dataset == 'kentucky') {
    data = kentucky;
  }
  else if (dataset == 'vanderbilt') {
    data = vanderbilt;
  }
  else if (dataset == 'oregon_state') {
    data = oregon_state;
  }
  else if (dataset == 'tennessee') {
    data = tennessee;
  }
  else if (dataset == 'texas_tech') {
    data = texas_tech;
  }
  else if (dataset == 'florida') {
    data = florida;
  }
  else if (dataset == 'louisville') {
    data = louisville;
  }
  else if (dataset == 'arkansas') {
    data = arkansas;
  }
  // Call function to update the chart
  updatePlotly2(data);
}

// Update the restyled plot's values
function updatePlotly2(newdata) {
  Plotly.restyle("pie2", "values", [newdata]);
}

init2();

  // Add meta-data
  let metaDiv = d3.select(".panel-body");

  let personMetadata = data['virginia']
  
  metaDiv.append('p').text('Domestic Health: ' + personMetadata["Domestic Health"]);
  metaDiv.append('p').text('Education: ' + personMetadata["Education"]);
  metaDiv.append('p').text('Final Consumption: ' + personMetadata["Final Consumption"]);
  metaDiv.append('p').text('Research and Development: ' + personMetadata["Research and Development"]);


  // Add meta-data
  let metaDiv2 = d3.select(".panel-body2");

  let personMetadata2 = data['virginia']
  
  metaDiv2.append('p').text('Domestic Health: ' + personMetadata2["Domestic Health"]);
  metaDiv2.append('p').text('Education: ' + personMetadata2["Education"]);
  metaDiv2.append('p').text('Final Consumption: ' + personMetadata2["Final Consumption"]);
  metaDiv2.append('p').text('Research and Development: ' + personMetadata2["Research and Development"]);


  fetch('/college')
  .then(response => response.json())
  .then(data => {

    let trace1 = {
      x: Object.values(data),
      y: Object.keys(data),
      text: Object.keys(data),
      type: 'bar',
      orientation: "h"
    };
      
    let formattedData = [trace1];
      
    let layout = {
        margin: {
          l: 100,
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
        yaxis: { title: 'Schools' },
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

    let trace2 = {
      x: Object.values(data),
      y: Object.keys(data),
      text: Object.keys(data),
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
            size: 24
          },
          xref: 'paper',
          x: 0.05,
        },
        xaxis: { title: 'Number of Students Drafted' },
        yaxis: { title: 'Schools' },
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

