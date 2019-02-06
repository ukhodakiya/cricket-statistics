/**
 * Created by Aakash on 4/15/2017.
 */

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



function functionName(errors, mapdata, t1, t2, t3, t4, t5, t6, t7, t8, t9, t10,
                      t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21,
                      t22, t23, t24, t25, t26) {

    var allData = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10,
        t11, t12, t13, t14, t15, t16, t17, t18, t19, t20, t21,
        t22, t23, t24, t25, t26];

    project(errors,mapdata,"#southAfrica");
    groupChart(errors, allData[0],"#thirdChart" );
    LineChart(errors,allData[0],"#TrendLine");

       $(".sidemenu").on("click",function () {

        var item= this.id;
        groupChart(errors,allData[item],"#thirdChart");
        LineChart(errors,allData[item],"#TrendLine");
    });

    function groupChart(errors, group, id) {
        var matchdata = d3.entries(group);
        //console.log(matchdata);
        var runs = 0;
        var truns = 0;
        var j = 0;
        var team1=[0,0,0,0,0];
        var team2=[0,0,0,0,0];
        var team1_name = matchdata[0].value.overs;
        var team2_name = matchdata[1].value.overs;

        matchdata.forEach(function (d,i) {
                if (d.value.overs > 0 && d.value.overs < 4) {
                    if(d.value.country == team2_name){
                        team2[0] += +(d.value.runs) + +(d.value.extra)
                    }
                    else if(d.value.country == team1_name) {
                        team1[0] += +(d.value.runs) + +(d.value.extra)
                    }
                }
                else if (d.value.overs < 8) {
                    if (d.value.country == team2_name) {
                        team2[1] += +(d.value.runs) + +(d.value.extra)
                }
                else if (d.value.country == team1_name){
                        team1[1] += +(d.value.runs) + +(d.value.extra)
                    }

                }
                else if (d.value.overs < 12) {
                    if (d.value.country == team2_name) {
                        team2[2] += +(d.value.runs) + +(d.value.extra)
                    }
                    else if (d.value.country == team1_name){
                        team1[2] += +(d.value.runs) + +(d.value.extra)
                    }

                }
                else if (d.value.overs < 16) {
                    if (d.value.country == team2_name) {
                        team2[3] += +(d.value.runs) + +(d.value.extra)
                    }
                    else if (d.value.country == team1_name){
                        team1[3] += +(d.value.runs) + +(d.value.extra)
                    }

                }
                else if (d.value.overs < 20) {
                    if (d.value.country == team2_name) {
                        team2[4] += +(d.value.runs) + +(d.value.extra)
                    }
                    else if (d.value.country == team1_name){
                        team1[4] += +(d.value.runs) + +(d.value.extra)
                    }

                }
        });


        var team_names =  [matchdata[1].value.overs,matchdata[0].value.overs];
        var state = ["1-4 Overs", "5-8 Overs", "9-12 Overs", "13-16 Overs", "17-20 Overs"];
        var data = [];
        for(i = 0; i < 5; i++){
            data.push({'team1':team1[i], 'team2':team2[i], 'State':state[i]});
        }

        d3.select("#thirdChart").select('svg').remove();
        var svg = d3.select("#thirdChart").append('svg').attr("height",560).attr("width",800),
            margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + 20 + "," + margin.top + ")");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d) {
                return "<strong>Total Runs:</strong><span style='color:red'>" + d.value + "</span>"
            });

        var x0 = d3.scaleBand()
            .rangeRound([0, width-20])
            .paddingInner(0.1);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#1919B9", "#008000"]);

        var keys = ['team1','team2'];
        x0.domain(data.map(function(d) { return d.State; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .call(tip);

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Runs");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(20," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width + 5)
            .attr("width", 25)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 10)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d, i) { return team_names[i]; });

    }




    function LineChart(errors, t, id) {
       // alert("Bhopu");
        matchdata = d3.entries(t);
        //console.log(matchdata);
        //console.log(matchdata["19"].overs);
        var runs = 0;
        var truns = 0;

        matchdata.forEach(function(d,i)
        {
            if (d.value.overs < 20) {
                if (d.value.country == "Pakistan") {
                    runs = runs + +(matchdata[i].value.runs) + +(matchdata[i].value.extra)
                    //console.log(runs)
                }
                else if (d.value.country == "India") {
                    truns = truns + +(matchdata[i].value.runs) + +(matchdata[i].value.extra)
                }
            }
        });

        var team1=[], team2 = [];
        //console.log(matchdata["19"].value.col1);
        var runs1 = 0, runs2 = 0;
        matchdata.forEach(function(d){
            if(d.value.col2=="1"){
                runs1+= +d.value.runs;
                team1.push({"over":d.value.overs, "runs" : runs1, "wicket": d.value.wicket});
            }
            else if(d.value.col2=="2"){
                runs2+= +d.value.runs;
                team2.push({"over":d.value.overs, "runs" : runs2,"wicket": d.value.wicket});
            }
        });
       // console.log(team1);

        var x = d3.scaleLinear().domain([0,20])
            .rangeRound([10, 700]);

        var y = d3.scaleLinear().domain([0,200])
            .rangeRound([450, 0]);
        x.domain(d3.extent(team1, function(d) { return +d.over; }));
        y.domain(d3.extent(team1, function(d) { return +d.runs; }));

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
        /* var x = d3.scaleLinear().range([0,960]); /// X AXIS RANGE

         var y = d3.scaleLinear().range([0,580]); /// Y AXIS RANGE
         x.domain(d3.extent(team1, function(d) { return d.over; }));
         y.domain(d3.extent(team1, function(d) { return d.runs; }));*/
        var xAxis = d3.axisBottom(x).ticks(10);

        var yAxis = d3.axisLeft(y).ticks(12);
        d3.select("#TrendLine").select("svg").remove();
        var svg = d3.select("#TrendLine").append("svg").attr("height",600).attr("width",1200).append("g");
        svg.append("text")

        var ln = d3.line().x(function (d) { return (x((d.over)/1.0)+30);}).y(function (d) {return (y((d.runs)/1.0)+30);});

        svg.selectAll("circle")
            .data(team1)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) { if(d.wicket == 1){return x(d.over)+30;} })
            .attr("cy", function(d) { if(d.wicket == 1) {return y(d.runs) + 30;} })
            .on("mouseover", function(d) {
                if(d.wicket == 1){

                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html("over:"+d.over + "<br/>"  + "runs:"+d.runs)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                }

            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        svg.selectAll(".dot")
            .data(team2)
            .enter().append("circle")
            .attr("r", 5)
            .attr("cx", function(d) {  if(d.wicket == 1){return x(d.over)+30;} })
            .attr("cy", function(d) { if(d.wicket == 1) {return y(d.runs) + 30;} })
            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html("over:"+d.over + "<br/>"  + "runs:"+d.runs)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        //
        svg.append("path").data([team1]).attr("stroke","blue").attr("stroke-width", 2.0).attr("fill","none").attr("d",ln);
        svg.append("g").attr("class","x-axis").attr("transform","translate(25,485)").call(xAxis);
        svg.append("text").attr("transform","translate(350,520)").style("text-anchor","middle").text("Number of overs");
        svg.append("path").data([team2]).attr("stroke","green").attr("stroke-width", 2.0).attr("fill","none").attr("d",ln);
        svg.append("g").attr("class","y-axis").attr("transform","translate(35,30)").call(yAxis);
        svg.append("text").attr("transform","translate("+50+","+20+")").style("text-anchor","middle").text("Total Runs");


    }

    function project(errors,country,id){

        var w = 400, h = 380;

        var projection = d3.geoEquirectangular().fitExtent([[10,10],[w - 800, h - 800]],country).scale(900);

        var mapSvg = d3.select(id).append("svg").attr("width",w).attr("height",h);

        var mdata = d3.entries(mapdata);

        var path = d3.geoPath().projection(projection);
        var john = [28.0473051, -26.2041028];
        var cape = [18.424055299999964,-33.9248685];
        var dur = [31.0218404,-29.8586804];
        var places = [john,cape,dur];

        var duplaces = ["Johannesburg","Capetown","Durban"];


        country.features.map(function(d) {
            if(d.properties.name == "South Africa"){
                mapSvg.append("path")
                    .datum(d).attr("d", path)

                    .style("stroke", function (d) {
                        var name = d.properties["name"];
                        if (d.properties.name == "South Africa")
                            return "black";
                        else
                            return "none";
                    })
                    .style("fill", "steelblue");
            }

        });

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        mapSvg.selectAll("circle")
            .data(places)
            .enter().append("circle")
            .attr("cx", function(d) { return projection(d)[0]})
            .attr("cy", function(d) { return projection(d)[1]})
            .attr("r", 10)
            .on("mouseover", function(d,i) {
                div.transition()
                    .text(duplaces[i])
                    .duration(200)
                    .style("opacity", 1);
                div.html(d[i])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            .style("fill", "red");

    }


}

d3.queue()
    .defer(d3.json, "https://cdn.rawgit.com/johan/world.geo.json/master/countries.geo.json")
.defer(d3.csv,"data_set/287879.csv")
    .defer(d3.csv,"data_set/287878.csv")
    .defer(d3.csv,"data_set/287877.csv")
    .defer(d3.csv,"data_set/287876.csv")
    .defer(d3.csv,"data_set/287875.csv")
    .defer(d3.csv,"data_set/287874.csv")
    .defer(d3.csv,"data_set/287873.csv")
    .defer(d3.csv,"data_set/287872.csv")
    .defer(d3.csv,"data_set/287871.csv")
    .defer(d3.csv,"data_set/287870.csv")
    .defer(d3.csv,"data_set/287869.csv")
    .defer(d3.csv,"data_set/287868.csv")
    .defer(d3.csv,"data_set/287867.csv")
    .defer(d3.csv,"data_set/287866.csv")
    .defer(d3.csv,"data_set/287865.csv")
    .defer(d3.csv,"data_set/287864.csv")
    .defer(d3.csv,"data_set/287863.csv")
    .defer(d3.csv,"data_set/287862.csv")
    .defer(d3.csv,"data_set/287861.csv")
    .defer(d3.csv,"data_set/287860.csv")
    .defer(d3.csv,"data_set/287858.csv")
    .defer(d3.csv,"data_set/287857.csv")
    .defer(d3.csv,"data_set/287856.csv")
    .defer(d3.csv,"data_set/287855.csv")
    .defer(d3.csv,"data_set/287854.csv")
    .defer(d3.csv,"data_set/287853.csv")

.await(functionName);