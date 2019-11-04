/* Class parameters to spawn the class */
function ClassParam (Param) {
/** the property name *************** the values passed inc********** Default values ***/
    this.className                  = Param.className               || "NewClass",
    this.propertyNumbers            = Param.propertyNumbers         || 1,
    this.propertyNames              = Param.propertyNames           || ["NewProperty"],
    this.classColor                 = Param.classColor              || "#007291",
    this.classBlockHeight           = Param.classBlockHeight        || 50,
    this.classBlockWidth            = Param.classBlockWidth         || 130,
    this.classBlockStartPosition    = Param.classBlockStartPosition || 10,
    this.classNameFrontSize         = Param.classNameFrontSize      || 25,
    this.propertyNameFrontSize      = Param.propertyNameFrontSize   || 22
/**************************************************************************************/
}

/* Update the max name width function */
function GetMaxNameWidth(currentWidth)
{
    if(currentWidth > maxNameWidth){
        return currentWidth;
    }
    else{
        return maxNameWidth;
    }
}

/* Align the test to the middle point */
function GetMiddlePoint(originalLocation,targetWidth,maxWidth)
{
    if(targetWidth >= maxWidth){
        return originalLocation;
    }
    else{
        return ((maxWidth - targetWidth)/2 + originalLocation);
    }
}

/* Initialize the class group */
function NewClassInit(ClassParam)
{
    /* Group Settings */
    var group = new Konva.Group({
        // Make the group darggable
        draggable: true
      });

    group.on('mouseover', function() {
        document.body.style.cursor = 'pointer';
    });
    group.on('mouseout', function() {
        document.body.style.cursor = 'default';
    });
    group.on('dragmove', function() {
        group.position({
            x: Math.round(group.x() / blockSnapSize) * blockSnapSize,
            y: Math.round(group.y() / blockSnapSize) * blockSnapSize
        });
    });

    /* Background rect setting */
    var backgroundRect = new Konva.Rect({

        x: ClassParam.classBlockStartPosition - 4,
        y: ClassParam.classBlockStartPosition - 4,
        fill: ClassParam.classColor,
        zIndex : 4,
        strokeWidth: 0,
        width: ClassParam.classBlockWidth + 8,
        name: 'object',
        //Height = h + h*count + 2*count + 4*2 => h + (h+2)*count + 8 =>
        height: 6 + (ClassParam.propertyNumbers + 1) * (ClassParam.classBlockHeight + 2)
    });
    // add the background to the group 
    group.add(backgroundRect);

    /* Text settings */
     var classNameText = new Konva.Text({
         x: ClassParam.classBlockStartPosition + 20,
         y: ClassParam.classBlockStartPosition + 15,
         text: ClassParam.className,
         fontSize: ClassParam.classNameFrontSize,
         fontFamily: 'Calibri',
         fill:'white',
         zIndex : 1
     });
    // Update the maxNameWidth by class name text 
    maxNameWidth = GetMaxNameWidth(classNameText.width());
    // Add the class name text to group
    group.add(classNameText);

    /* Properties names */
    for (var i = 0; i < ClassParam.propertyNumbers; i++){
        var propertyText = new Konva.Text({
            x: ClassParam.classBlockStartPosition + 20,
            y: (i + 1) * (ClassParam.classBlockHeight + 2) + ClassParam.classBlockStartPosition + 15,
            text: ClassParam.propertyNames[i],
            fontSize: ClassParam.propertyNameFrontSize,
            fontFamily: 'Calibri',
            fill:'#f0f0f0',
            zIndex : 2
        });
        // Update the maxNameWidth by property name text 
        maxNameWidth = GetMaxNameWidth(propertyText.width());
        // Add the property name text to group
        group.add(propertyText);
    }

    /* Properties rects */
    for (var i = 0; i < ClassParam.propertyNumbers; i++){
        var propertyRect = new Konva.Rect({
            x: ClassParam.classBlockStartPosition,
            y: (i + 1) * (ClassParam.classBlockHeight + 2) + ClassParam.classBlockStartPosition,
            fill: "#ffffff",
            zIndex : 3,
            opacity: 0.2,
            strokeWidth: 0,
            width: maxNameWidth + 40 ,//ClassParam.classBlockWidth,
            height: ClassParam.classBlockHeight
        });
        // Add the property background rect to group
        group.add(propertyRect);
    }
    
    // Update the backgrounds width with maxNameWidth
    backgroundRect.width(maxNameWidth + 48);
    // Update the Class name to the middle point
    classNameText.x(GetMiddlePoint(classNameText.x(),classNameText.width(),maxNameWidth));

    return group;
} 

/* Initializing the Class with input */
function NewClassSpawner(){
    /* Set the class header name from input */
    var cName = $("#className").val();

    var cColor = $("#colorPicker").val();
    /* Set the class properties name from input */
    var pNames = new Array();
    for(var i = 1; i <= propertyCount; i++){
        pNames.push($("#property"+i).val());
    }
    /* Initializing the class parameters */
    var classParameter = new ClassParam({
        className       : cName,
        classColor      : cColor,
        propertyNames   : pNames,
        propertyNumbers : propertyCount
    })
    /* Initializing the class graph */
    var newClass = NewClassInit(classParameter)

    return newClass;
}

/* clean the scene */
function Cleaner(){
    //Remove the previous header inputs
    $("#className").val("")
    // Remove the previous property inputs
    for(var i = 2; i <= propertyCount; i++){
        $("#property"+i+"group").remove();
        $("#property1").val("");
    }
    // Reset the propertyCount
    propertyCount = 1;
    // Reset the maxNameWidth
    maxNameWidth = 130;
}