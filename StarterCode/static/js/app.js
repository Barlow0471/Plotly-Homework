var data;
var selector = d3.select("#selDataset");
// Use the list of sample names to populate the select options  
function init() {
// Grab a reference to the dropdown select element  
d3.json("samples.json").then((json_data) => {   
     data = json_data;
     console.log("init():", data);
     var sampleNames = data.names;
     sampleNames.forEach((sample) => {     
         selector
         .append("option")        
         .text(sample)        
         .property("value", sample);   
     });

         // Use the first sample from the list to build the initial plots    
         var sampleId = sampleNames[0];   
         buildDemographicInfo(sampleId);
         buildCharts(sampleId);    
     //     buildMetadata(firstSample);
});
}

function optionChanged(sampleId) {
     buildDemographicInfo(sampleId);
     buildCharts(sampleId);    

}

function buildDemographicInfo(sampleId) {
     console.log("buildDemographicInfo():", sampleId);
     var metadata = data.metadata;
     var sample_metadata = d3.select("#sample-metadata");
     sample_metadata.selectAll("p").remove();
     metadata.forEach(row => {
          if (row.id === parseInt(sampleId)) {
               Object.entries(row).forEach(([key, value]) => {
                    sample_metadata.append("p").text(key + ": " + value);
               })
               
          }
     });
}
// Initialize the dashboard
init();

// Build the charts
function buildCharts(sampleId) {
     // Use sample_values as the values for the bar chart
     console.log('buildCharts():', sampleId);
     var samples = data.samples[sampleNames].sample_values;
     var otu_ids = data.samples[sampleNames].otu_ids;
     var otu_labels = data.samples[sampleNames].otu_labels;


     // Slice and reverse data for horizontal bar chart
    var topTenOTUS = sampleSubjectOTUs.slice(0, 10).reverse();
    var topTenFreq = sampleSubjectFreq.slice(0, 10).reverse();
    var topTenToolTips = data.samples[0].otu_labels.slice(0, 10).reverse();
    var topTenLabels = topTenOTUS.map((otu => "OTU " + otu));
    var reversedLabels = topTenLabels.reverse();

     // Set up first trace
     var trace1 = {
          x: topTenFreq,
          y: reversedLabels,
          text: topTenToolTips,
          name: '',
          type: 'bar',
          orientation: 'h'
     };

     // Define trace1 variable
     var barData = [trace1];

     // Apply the layout
     var layout = {
          title: 'Top 10 OTUs',
          margin: {
               l: 75,
               r: 75,
               t: 75,
               b: 50,
          }
     };

     // Place the plot in the div tag
     Plotly.newPlot('bar', barData, layout);
     




}










// function buildCharts(sampleId) {
//      console.log('buildCharts():', sampleId)
//      // d3.json("samples.json").then((json_data) => {   
//           // data = json_data;
//      let samples = data.samples;
//      let filterArray = samples.filter(sampleObject => sampleObject.id == sample);
//      let result = filterArray[0];
//      let sample_values = result.sample_values;
//      let otu_ids = result.otu_ids;
//      let otu_labels = result.otu_labels;

//      let trace1 ={
//                   x: sample_values.slice(0,10).reverse(),
//                   y: otu_ids.slice(0,10).map(outID => `OTU ${otuID}`).reverse(),
//                   text: otu_labels.slice(0,10).reverse(),
//                   name: 'Greek',
//                   type: 'bar',
//                   orientation: 'h'
//               };
//               let data = [trace1];
//               let layout = {
//                   title: 'Top Ten OTUs for Individual ' + sample,
//                   margin: {1: 100, r:100, t: 100, b: 100}
//               };
//               Plotly.newPlot('bar', data, layout);
// };
//         let samples = data.samples;
//         let filterArray = samples.filter(sampleObject => sampleObject.id == sample);
//         let result = filterArray[0];
//         let sample_values = result.sample_values;
//         let otu_ids = result.otu_ids;
//         let otu_labels = result.otu_labels;
//     };
// Bar Chart
//     let trace1 ={
//         x: sample_values.slice(0,10).reverse(),
//         y: otu_ids.slice(0,10).map(outID => `OTU ${otuID}`).reverse(),
//         text: otu_labels.slice(0,10).reverse(),
//         name: 'Greek',
//         type: 'bar',
//         orientation: 'h'
//     };
//     let data = [trace1];
//     let layout = {
//         title: 'Top Ten OTUs for Individual ' + sample,
//         margin: {1: 100, r:100, t: 100, b: 100}
//     };
//     Plotly.newPlot('bar', data, layout);

//     }

// }