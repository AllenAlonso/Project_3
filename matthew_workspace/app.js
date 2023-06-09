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
let baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
let date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
let complaint = "&complaint_type=Rodent";
let limit = "&$limit=10000";

// Assemble the API query URL.
let url = baseURL + date + complaint + limit;

// Get the data with d3.
d3.json(url).then(function (response) {

  // Create a new marker cluster group.
  let markers = L.markerClusterGroup();

  // Loop through the data.
  response.forEach(complaint => {
    if (complaint.location) {
      let loc = [complaint.location.coordinates[1], complaint.location.coordinates[0]]
      markers.addLayer(L.marker(loc).bindPopup(complaint.descriptor))
    }
  })

  // Add our marker cluster layer to the map.
  myMap.addLayer(markers);

  // Create an array of each country's numbers
  let australia = Object.values(data.australia);
  let brazil = Object.values(data.brazil);
  let uk = Object.values(data.uk);
  let mexico = Object.values(data.mexico);
  let singapore = Object.values(data.singapore);
  let southAfrica = Object.values(data.southAfrica);

  // Create an array of category labels
  let labels = Object.keys(data.australia);

  // Display the default plot
  function init() {
    let data = [{
      values: australia,
      labels: labels,
      type: "pie"
    }];

    let layout = {
      height: 500,
      width: 700
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

    if (dataset == 'australia') {
      data = australia;
    }
    else if (dataset == 'brazil') {
      data = brazil;
    }
    else if (dataset == 'uk') {
      data = uk;
    }
    else if (dataset == 'mexico') {
      data = mexico;
    }
    else if (dataset == 'singapore') {
      data = singapore;
    }
    else if (dataset == 'southAfrica') {
      data = southAfrica;
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
  let labels2 = Object.keys(data.australia);

  // Display the default plot
  function init2() {
    let data = [{
      values: australia,
      labels: labels2,
      type: "pie"
    }];

    let layout = {
      height: 500,
      width: 700
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

    if (dataset == 'australia') {
      data = australia;
    }
    else if (dataset == 'brazil') {
      data = brazil;
    }
    else if (dataset == 'uk') {
      data = uk;
    }
    else if (dataset == 'mexico') {
      data = mexico;
    }
    else if (dataset == 'singapore') {
      data = singapore;
    }
    else if (dataset == 'southAfrica') {
      data = southAfrica;
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
  
    let personMetadata = data['australia']
    
    metaDiv.append('p').text('Domestic Health: ' + personMetadata["Domestic Health"]);
    metaDiv.append('p').text('Education: ' + personMetadata["Education"]);
    metaDiv.append('p').text('Final Consumption: ' + personMetadata["Final Consumption"]);
    metaDiv.append('p').text('Research and Development: ' + personMetadata["Research and Development"]);


    // Add meta-data
    let metaDiv2 = d3.select(".panel-body2");
  
    let personMetadata2 = data['australia']
    
    metaDiv2.append('p').text('Domestic Health: ' + personMetadata2["Domestic Health"]);
    metaDiv2.append('p').text('Education: ' + personMetadata2["Education"]);
    metaDiv2.append('p').text('Final Consumption: ' + personMetadata2["Final Consumption"]);
    metaDiv2.append('p').text('Research and Development: ' + personMetadata2["Research and Development"]);
});
