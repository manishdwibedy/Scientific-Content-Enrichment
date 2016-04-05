/**
 * Created by manishdwibedy on 4/5/16.
 */


$(function(){

    $(".dropdown-menu li a").click(function(){

        $(".btn:first-child").text('Selected MIME : '+$(this).text());
        $(".btn:first-child").val($(this).text());

        var mime = $(this).text();

        if(mime=='GIF')
        {
            render('image_gif');
        }
        if(mime=='TIFF')
        {
            render('image_tiff');
        }


    });

});

function render(mime)
{
    $('.chart').html('');
    d3.json("data/" + mime +".json", function(data){
        var bardata = [];

        for (var i=0; i < 50; i++) {
            bardata.push(Math.random())
        }

        var colors = d3.scale.linear()
            .domain([0, bardata.length*.25, bardata.length*.23, bardata.length])
            .range(['#C61C6F', '#268BD2', '#85992C', '#B58929'])


        var margin = {top: 30, right: 30, bottom: 30, left: 30},
            width = 650 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .domain(data.map(function(d) { return d.name; }))
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            /* .domain([0, d3.max(data, function(d) { return d.value; })]) */
            .domain([0, 100])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var chart = d3.select(".chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add data
        chart.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .style('fill', function(d,i) {
                return colors(i);
            })
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("y", function(d) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); })
            .attr("width", x.rangeBand());

// y axis and label
        chart.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height/2)
            .attr("y", -margin.bottom)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("% of Files");
// x axis and label
        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width / 2)
            .attr("y", margin.bottom - 10)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Bin Center - Normalized Metadata Score");
// chart title
        chart.append("text")
            .text("5 Bins Histogram for Metada Score Diversity - Image GIF")
            .attr("x", width/4)
            .attr("class","title");
    });
}