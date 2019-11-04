var width = window.innerWidth;
var height = window.innerHeight;
/* Count the total properties (NEED refresh) */
var propertyCount = 1;
/* Set the moving snap size */
var blockSnapSize = 50;
/* Set the max text width (NEED refresh) */
var maxNameWidth = 130;

/* Create a stage */
var stage = new Konva.Stage({
  container: 'container2',
  width: width,
  height: height
});

/* create a layer */
var layer = new Konva.Layer();


  