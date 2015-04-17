var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent; 
var mouseDown = false;
    
//When clickong on control list items
$(".controls").on("click", "li", function(){
  //Deselect Sibling elements
  $(this).siblings().removeClass("selected");
  //Select clicked elements
  $(this).addClass("selected");
  //Cache current color
  color = $(this).css("background-color");
})


//When New color is clicked
$("#revealColorSelect").click(function(){
  //Show color select or hide the color select 
  changeColor();
  $("#colorSelect").toggle();
});

  //Update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")")
}

//When color sliders change
$("input[type=range]").change(changeColor);


//When "Add Color" is clicked
$("#addNewColor").click(function(){
  //Append the color to the controls ol
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
})

//When Clear Canvas is selected
$('#clearCanvas').click(function(){
  context.clearRect ( 0 , 0 , 600 , 400 );
})

//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //Draw lines
    if(mouseDown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
  }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});
