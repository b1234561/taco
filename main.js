/**
 * Created by Reem on 5/13/2015.
 * based on what is
 * Created by Samuel Gratzl on 15.12.2014.
 */

require(['../caleydo/data', 'd3', 'jquery', './difflog_parser', './diff_heatmap', 'bootstrap', 'font-awesome'],
  function (data, d3, $, difflog_parser, heatmap) {
  'use strict';
  var windows = $('<div>').css('position', 'absolute').appendTo('#main')[0];

    var diff_arrays = difflog_parser.Diff;
    //console.log(heatmap);

    var h_data = [
      {score: 1.5, row: 0, col: 0},
      {score: 0.7, row: 0, col: 1},
      {score: 2.0, row: 0, col: 2},
      {score: -1.2, row: 1, col: 0},
      {score: 0.0, row: 1, col: 1},
      {score: 0.1, row: 3, col: 0},
      {score: 0.4, row: 3, col: 1},
      {score: -1.8, row: 1, col: 2},
      {score: 0.6, row: 3, col: 2}
    ];

    heatmap.DiffHeatmap(h_data);
    heatmap.drawDiffHeatmap();

    var ids1, ids2, dim1 = [9,4], dim2 = [11,3];
    heatmap.createDiffMatrix(ids1, ids2, dim1, dim2, diff_arrays);

  function toType(desc) {
    if (desc.type === 'vector') {
      return desc.value.type === 'categorical' ? 'partition' : 'numerical';
    }
    return desc.type;
  }

  //from caleydo demo app
  function addIt(selectedDataset) {
    console.log("selected dataset", selectedDataset.dim);

    //selectedDataset.rows for ids
    selectedDataset.rows().then(function(data){ console.log("what we got from rows", data)});
    //data.get with the id to access a specific dataset

    selectedDataset.data().then(function(data) {
      console.log(data);
    })
  }
  data.list().then(function (items) {
    items = items.filter(function (d) {
      return d.desc.type === 'matrix';
    });
    var $base = d3.select('#blockbrowser table tbody');
    var $rows = $base.selectAll('tr').data(items);
    $rows.enter().append('tr').html(function (d) {
      return '<th>' + d.desc.name + '</th><td>' + toType(d.desc) + '</td><td>' +
        d.idtypes.map(function (d) {
          return d.name;
        }).join(', ') + '</td><td>' + d.dim.join(' x ') + '</td>';
    }).on('click',function(d){
      addIt(d);
      var ev = d3.event;
    });
  });

});
