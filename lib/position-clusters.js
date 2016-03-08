"use strict";

var util = require("./util"),
    d3 = require("./d3");

module.exports = positionClusters;

function positionClusters(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });
  // The ForeignObject must also be the size of the rectangle
  var fo = created.select("foreignObject");
  var div = created.select("foreignObject > div");
  var header = div.select(".header");
  var addHeight = 0;
  // TODO: This should not be hardcoded to 50
  if(header[0][0]){
    addHeight = 50;
  }

  function translate(v) {
    var node = g.node(v);
    var x = node.x + addHeight;
    console.log(x);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g)
      .style("opacity", 1)
      .attr("transform", translate);

  util.applyTransition(created.selectAll("rect"), g)
      .attr("width", function(v) { return g.node(v).width; })
      .attr("height", function(v) { return g.node(v).height; })
      .attr("x", function(v) {
        var node = g.node(v);
        return -node.width / 2;
      })
      .attr("y", function(v) {
        var node = g.node(v);
        return -node.height / 2;
      });

  if(fo[0][0]) {
      util.applyTransition(fo, g)
          .attr("width", function (v) {
              return g.node(v).width;
          })
          .attr("height", function (v) {
              return g.node(v).height;
          })
          .attr("x", function (v) {
              var parent = d3.select(this.parentNode).node();
              return (-g.node(v).width / 2) - parent.transX;
          });
          //.attr("y", function(){
          //    return -addHeight;
          //});

      //util.applyTransition(div, g)
      div.style("width", "100%")
          .style("height", "100%");
  }
}
