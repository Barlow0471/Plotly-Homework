// Use the list of sample names to populate the select options  
function init() {
// Grab a reference to the dropdown select element  
var selector = d3.select("#selDataset");
d3.json("samples.json").then((data) => {   
     var sampleNames = data.names;
    sampleNames.forEach((sample) => {     
         selector
         .append("option")        
         .text(sample)        
         .property("value", sample);   
         });

         // Use the first sample from the list to build the initial plots    
         var firstSample = sampleNames[0];    
         buildCharts(firstSample);    
         buildMetadata(firstSample);  });}
// Initialize the dashboard
init();