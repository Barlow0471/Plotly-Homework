const samples = '/../samples.json';

d3.json(samples).then(function(data) {
    console.log(data);
});