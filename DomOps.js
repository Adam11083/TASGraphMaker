

$("#addToCanava").click(function(){
    /* Add the new class graph to layer */
    layer.add(NewClassSpawner());
    /* Do the cleaner job */
    Cleaner();
    /* Add the layer to the stage */ 
    stage.add(layer);
});

/* Adding the properties by Clicking */
$("#addProperty").click(function(){
    propertyCount += 1;
    $("#addProperty").before('<div id="property'+propertyCount+'group"class="input-group"><span class="input-group-addon">'+ propertyCount +'</span><input id="property'+propertyCount+'"type="text" class="form-control" placeholder="Property Name"></div>');
});

// initialize on single element with jQuery
var elem = $('.color-input')[0];
var hueb = new Huebee( elem, {
  // options
  notation: 'hex'
});

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

document.getElementById('save').addEventListener(
  'click',
  function() {
    var dataURL = stage.toDataURL({ pixelRatio: 3 });
    downloadURI(dataURL, 'ClassGraph.png');
  },
  false
);