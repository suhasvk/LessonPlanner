var i = 1;
var j = 0;

/* This function will actually make cards */
function makecard(name, text) {

        var cardname = name;
        var classtext = text;
        //makes the div
        $("<div />", { id:cardname, class:"class", html: classtext })
       .appendTo("#areaOne");

       //the custom switch timeline function
       //This is where I'd load a new timeline
         function Switchtimeline(classid) {
            alert("Hello! I am an alert box!! " + classid);
        }

        //actually load the timeline on click
      document.getElementById(cardname)
      .onclick = function() {Switchtimeline(cardname)};


        //This makes the class droppable, right now this is
        //bad coding practice, but it works, although
        //At this point, we don't have any reason to drop words
        //I'll comment this out later or change as needed
      $(".class").droppable({
          drop: function(event, ui) {
            //ui.draggable.detach().appendTo($(this));

            
            //* THIS IS THE WORDS thingy
            //currently obsolete but harmless
            var currentclass = "#class" + i;
            var draggablewords = ui.draggable.html();
            var currentwords = $(this).html();
            var newdiv = $("<div />", { id:"objective"+i, class:"card", html: draggablewords })
            $(this).append(newdiv);
            /*
            alert(currentwords + "<br>" + draggablewords);
            $(this).html(currentwords+"<br>"+draggablewords);
            */

            ui.draggable.remove();

            j++;
            
            
          }
        });
    }


$(document).ready(
    

    
            

  function(){
    $("#classmaker").keypress(function(e) {
        
        if (e.which == 13) {
             if (i==1) {
                $('#sidebardefault').remove();
            }

            
            
            

            var current = $("#classmaker").val();

            
            //Insert call to cardmaker here
            makecard("l"+i, current);
              


                //I have no idea what this hover does.
                //move it to the cardmaker function if needed
                  $(".class").hover(function(evt){
                          $(this).css('background-color','#B7A8D2');
                    }, function(evt){
                          $(this).css('background-color','#fff');
                    });

                    // $(".class").click(function(evt){
                    //       $('#resizableTimeline').colResizable({disable:true});

                    //       $(".class").css('border-color','#4850B7');
                    //       $(this).css('border-color','#EAE853');
                    //       var lessonNum = $(this).attr('id')[1];
                    //       console.log('#cardBox' + lessonNum);
                    //       $('#cardBox' + lessonNum).show();
                    //       $('#cardBox' + currentTimeLine).hide();
                          
                    //       $('#timelineContents'+currentTimeLine).detach();
                    //       $('#resizableTimeline').append(timelineObjContainer[lessonNum]);
                    //       $(timelineObjContainer[lessonNum]).show();
                    //       currentTimeLine = parseInt(lessonNum);
                    //       $('#resizableTimeline').colResizable({
                    //         liveDrag:true,
                    //         onResize: dragHandler
                    //       });
                    // });

            $("#classmaker").val("");
            i++;

           }
        });
});