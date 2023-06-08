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
  d3.json(url).then(function(response) {
  
    // Create a new marker cluster group.
    let markers = L.markerClusterGroup();
  
    // Loop through the data.
    response.forEach( complaint => 
          {
            if (complaint.location) 
            {
              let loc = [complaint.location.coordinates[1], complaint.location.coordinates[0]]
              markers.addLayer(L.marker(loc).bindPopup(complaint.descriptor))
            }
          })
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);
  
    // Add meta-data
  let metaDiv = d3.select(".panel-body");
  console.log(metaDiv)

  let personMetadata = data['metadata']
  
  metaDiv.append('p').text('id: ' + personMetadata["id"]);
  metaDiv.append('p').text('ethnicity: ' + personMetadata["ethnicity"]);
  metaDiv.append('p').text('gender: ' + personMetadata["gender"]);
  metaDiv.append('p').text('age: ' + personMetadata["age"]);
  metaDiv.append('p').text('location: ' + personMetadata["location"]);
  metaDiv.append('p').text('bbtype: ' + personMetadata["bbtype"]);
  metaDiv.append('p').text('wfreq: ' + personMetadata["wfreq"]);
  });
  