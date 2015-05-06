var i = 1;
var j = 1;

/* This function makes clicked divs editable, and then back to divs
once done. It's a pair with editableTextBlurred. */
function divClicked() {
    var divHtml = $(this).html();
    var divID = $(this).attr('id');
    var editableText = $("<textarea id=" + divID + " />");
    editableText.val(divHtml);
    $(this).replaceWith(editableText);
    editableText.focus();
    // setup the blur event for this new textarea
    editableText.blur(editableTextBlurred);
}

function editableTextBlurred() {
    var html = $(this).val();
    var divID = $(this).attr('id');
    var viewableText = $("<div id=" + divID + " class='class'>");
    viewableText.html(html);
    $(this).replaceWith(viewableText);
    // setup the click event for this new div
    viewableText.click(divClicked);
}

/* This function will actually make cards */
function makecard(name, text) {

        var cardname = name;
        var classtext = text;
        //makes the div
        $("<div />", { id:cardname, class:"class", html: classtext })
       .appendTo("#areaOne");

       //makes default card
       $("<div />", { id:"card"+j, class:"card",
        html: "Create more cards near the timeline while this class is selected" })
       .appendTo("#"+cardname);


       //the custom switch timeline function
       //This is where I'd load a new timeline
         function Switchtimeline(classid) {
            //alert("Hello! I am an alert box!! " + classid);
        }

        //make the card renameable
      $("#"+cardname).click(divClicked);
      j++;

      

        //This makes the class droppable, right now this is
        //bad coding practice, but it works, although
        //At this point, we don't have any reason to drop words
        //I'll comment this out later or change as needed
      // $(".class").droppable({
      //     drop: function(event, ui) {
      //       //ui.draggable.detach().appendTo($(this));

            
      //       //* THIS IS THE WORDS thingy
      //       //currently obsolete but harmless
      //       var currentclass = "#class" + i;
      //       var draggablewords = ui.draggable.html();
      //       var currentwords = $(this).html();
      //       var newdiv = $("<div />", { id:"objective"+i, class:"card", html: draggablewords })
      //       $(this).append(newdiv);
      //       /*
      //       alert(currentwords + "<br>" + draggablewords);
      //       $(this).html(currentwords+"<br>"+draggablewords);
      //       */

      //       ui.draggable.remove();

      //       j++;
            
            
      //     }
      //   });
    }


$(document).ready(
  function(){

    $("#l0").click(divClicked);
    $("#classmaker").keypress(function(e) {
        
        if (e.which == 13  && $(this).val().length > 0) {
             if (i==1) {
                $('#sidebardefault').remove();
            }

            var current = $("#classmaker").val();
            
            //Insert call to cardmaker here
            makecard("l"+i, current);

            $("#classmaker").val("");
            i++;

           }
        });
});