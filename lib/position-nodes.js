"use strict";

var util = require("./util");
var d3 = require("./d3");

module.exports = positionNodes;

function positionNodes(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translatePre(v) {
    var node = g.node(v);
    return "translate(0," + node.y + ")";
  }
  function translatePost(v) {
    var node = g.node(v);
    return "translate("+node.x+"," + node.y + ")";
  }
  // created.attr("transform", "translate(0,0)");
  created  //.transition()
           // .duration(1750)
      .attr("transform", translatePre);

  util.applyTransition(selection, g)
    .style("opacity", 1)
    .attr("transform", translatePre);
  util.applyTransition(selection, g)
    .transition()
    .duration(2750)
    .attr("transform", translatePost);
}
