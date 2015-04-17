var i = 0;
var j = 0;


$(document).ready(
  function(){
    $("#classmaker").keypress(function(e) {
        if (e.which == 13) {
            var current = $("#classmaker").val()
            $("<div />", { id:"l"+i, class:"class", html: current })
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
            i++;

           }
        });
});