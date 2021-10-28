var margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append svg object to the body of the page to house Scatterplot 1
var svg1 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Scatterplot 2
var svg2 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Bar chart 
var svg3 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define color scale
var color = d3
  .scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica"])
  .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Read data and make plots 
d3.csv("data/iris.csv").then((data) => {
  
  //Scatterplot 1
  {
    var xKey1 = "Sepal_Length";
    var yKey1 = "Petal_Length";

    //Add X axis
    var x1 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[xKey1])))
      .range([0, width]);
    svg1
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xKey1)
      );

    //Add Y axis
    var y1 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[yKey1])))
      .range([height, 0]);
    svg1
      .append("g")
      .call(d3.axisLeft(y1))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yKey1)
      );

    // Add dots
    var myCircle1 = svg1
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", function (d) {
        return x1(d[xKey1]);
      })
      .attr("cy", function (d) {
        return y1(d[yKey1]);
      })
      .attr("r", 8)
      .style("fill", function (d) {
        return color(d.Species);
      })
      .style("opacity", 0.5);

    //TODO: Define a brush
    var brush1 = d3.brush()                     
    .extent( [ [0,0], [width,height] ] ) // set brush extent to cover full chart area
    .on('start',clear) // clear chart on brush start
    .on("brush", updateChart1) // update chart on brush end


    //TODO: Add brush to the svg
    svg1
    .call(brush1) // attach the brush to the svg
    .attr('id','brush1'); // give the brush an id
  }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)
  {
    var xKey2 = "Sepal_Width"; // x-axis key
    var yKey2 = "Petal_Width"; // y-axis key

    //Add X axis
    var x2 = d3
      .scaleLinear() // create a linear scale
      .domain(d3.extent(data.map((val) => val[xKey2])))  // extent = highest and lowest values
      .range([0, width]);
    svg2
      .append("g")
      .attr("transform", "translate(0," + height + ")") // move the bottom of the axis to the bottom of the chart
      .call(d3.axisBottom(x2))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "currentColor") // color the label
          .attr("text-anchor", "end")
          .text(xKey2) // set the label
      );

    //Add Y axis
    var y2 = d3 // create a linear scale
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[yKey2]))) // extent = highest and lowest values
      .range([height, 0]);  //  height of the chart
    svg2
      .append("g")
      .call(d3.axisLeft(y2))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yKey2)
      );

    // Add dots
    var myCircle2 = svg2 
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", function (d) {
        return x2(d[xKey2]);
      })
      .attr("cy", function (d) {
        return y2(d[yKey2]); // set the y position of the circle to the petal width
      })
      .attr("r", 8)
      .style("fill", function (d) {
        return color(d.Species); // set the color of the circle to the color of the flower species 
      })
      .style("opacity", 0.5);

   var brush2 = d3.brush() // create a brush      
      .extent( [ [0,0], [width,height] ] )  // set brush extent to cover full chart area
      .on('start',clear)         
      .on("brush", updateChart2) // update chart on brush end
    
    svg2
      .call(brush2) // attach the brush to the svg
      .attr('id','brush2'); // give the brush an id
      
      }

  //TODO: Barchart with counts of different species
  {
    //Add X axis
    var xScale = d3.scaleBand()
                    .range([0, width])
                    .domain(data.map(d => d.Species)) // map the species to the x-axis
                    .padding(.2)
    var xAxis = d3.axisBottom(xScale); 
    svg3.append("g")
      .attr("transform", `translate(0,${height})`) // move the x-axis from the top to the bottom of the chart
      .call(xAxis);


    //Add Y axis
    var yScale = d3.scaleLinear()
                .domain([0,50]) // set the domain to be the max value of the data
                .range([height, 0]);
    var yAxis = d3.axisLeft(yScale);
    svg3.append("g")
      .call(yAxis);

    let options = [...new Set(data.map(d => d.Species))]; // get the unique species 
    let optionsData = []
    for (let i=0; i< options.length; i++) {
      let numOptions = data.filter(d => d.Species===options[i]).length;
      optionsData.push({"Species": options[i], "Quantity": numOptions})
      // https://stackoverflow.com/questions/28572015/how-to-select-unique-values-in-d3-js-from-data/28572315
    }


    var myBar = svg3
      .append("g")
      .selectAll("rect")
      .data(optionsData)
      .enter()
      .append("rect")
      .attr("id", d => d.Species)
      .attr("x", d => xScale(d.Species))
      .attr("y", d => yScale(d.Quantity))
      .attr("height", d => yScale(0) - yScale(d.Quantity))
      .attr("width", xScale.bandwidth())
      .style("fill", d => color(d.Species));
  }

 

  //Brushing Code---------------------------------------------------------------------------------------------
    
  //Removes existing brushes from svg
    function clear() {
        svg1.call(brush1.move, null);
        svg2.call(brush2.move, null);
    }

    //Is called when we brush on scatterplot #1
    function updateChart1(brushEvent) {
        extent = brushEvent.selection;
    
        //TODO: Check all the circles that are within the brush region in Scatterplot 1
        myCircle1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } ) // check if the circle is within the brush region
        // https://www.d3-graph-gallery.com/graph/interactivity_brush.html
    
        //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
        var selectedIDs = svg1.selectAll(".selected").nodes().map((circle) => circle['id']); // get the id of the selected circles
        myCircle2.classed("selected", (d) => selectedIDs.includes(d.id) )
        // https://www.d3-graph-gallery.com/graph/interactivity_brush.html

      
    }


    
    //Is called when we brush on scatterplot #2
    function updateChart2(brushEvent) {
      extent = brushEvent.selection;
      var selectedSpecies = new Set();

      //TODO: Check all the circles that are within the brush region in Scatterplot 2
      myCircle2.classed("selected", function(d){ return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]) )}) ; // check if the circle is within the brush region

      //TODO: Select all the data points in Scatterplot 1 which have the same id as those selected in Scatterplot 2
      var selectedIDs = svg2.selectAll(".selected").nodes().map((circle) => circle['id']); // get the ids of the circles that are selected
      myCircle1.classed("selected", (d) => selectedIDs.includes(d.id) ); // select all the circles in Scatterplot 1 which have the same id as those selected in Scatterplot 2

      //TODO: Select bars in bar chart based on species selected in Scatterplot 2
      var selectedSpecies = [... new Set(data.filter(d => selectedIDs.includes(d.id)).map(d => d.Species))];
      myBar.classed("selected", d => selectedSpecies.includes(d.Species)) // select all the bars with the selected species
    }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});

