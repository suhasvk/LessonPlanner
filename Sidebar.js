
var i = 0;
var j = 0;
$("#classmaker").keypress(function(e) {
    if (e.which == 13) {
        e.preventDefault();
        var current = $("#classmaker").val()
        $("<div />", { id:"class"+i, class:"class", html: current })
        .appendTo("#areaOne");
          $("#classmaker").val("");

          $(".class").droppable({
              drop: function(event, ui) {
                //ui.draggable.detach().appendTo($(this));

                
                //* THIS IS THE WORDS thingy
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
        i++;

         }
      });