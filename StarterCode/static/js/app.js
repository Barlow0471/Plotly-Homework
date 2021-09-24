var data;
var selector = d3.select("#selDataset");
var sampleNames;

// Use the list of sample names to populate the select options  
function init() {
// Grab a reference to the dropdown select element  
d3.json("samples.json").then((json_data) => {   
     data = json_data;
     console.log("init():", data);
     sampleNames = data.names;
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
};

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
     console.log('buildCharts():', sampleId);
     var sample = data.samples.filter(sample => sample.id === sampleId)[0];
     var cut_point = sample.sample_values.length;
     if (cut_point > 10) {
          cut_point = 10;
     }
     var bar_plot = [{
          x: sample.sample_values.slice(0, cut_point).reverse(),
          y: sample.otu_ids.slice(0, cut_point).map(id => "otu " + id).reverse(),
          text: sample.otu_labels.slice(0, cut_point).reverse(),
          type: "bar", 
          orientation: "h"
     }];

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

//      // Place the plot in the div tag
     Plotly.newPlot('bar', bar_plot, layout);
  
//      // Build the bubble plot
     var bubble_plot = [{
          y: sample.otu_ids,
          x: sample.sample_values,
          text:sample.otu_labels.slice(0, cut_point).reverse(),
          mode: 'markers',
          marker: {
               color: sample.otu_ids,
               opacity: [1, .8, .6, .4],
               size: sample.sample_values,
          }
     }]

     var layout = {
          title: 'OTU Frequency',
          showlegend: false,
          height: 600,
          width: 930
     }

     Plotly.newPlot('bubble', bubble_plot, layout);
};