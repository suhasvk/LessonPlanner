
      $(document).ready(function(){
	  
      		//This function exists for current cards
      		$(".brainstormCard").hover(function(evt){
				  $(this).addClass("card-hover");
            }, function(evt){
				  $(this).removeClass("card-hover");
            });

            $(".brainstormCard").click(function(evt){
			
				  $(".brainstormCard").removeClass("card-selected");
				  $(this).addClass("card-selected");
            })

            
			$( ".brainstormCard" ).draggable({stack: ".brainstormCard"});

			//This function set creates the cards
            var i = 4;
			$("#cardmaker").keypress(function(e) {
				if (e.which == 13) {
                  e.preventDefault();
                  var current = $("#cardmaker").val()
                    $("<div />", { id:"l"+i, class:"brainstormCard", html: current })
                       .appendTo("#secondary");
                    $("#cardmaker").val("");

                    /* CANNOT GET COLORS TO WORK

                    //create the color buttons
                    $("<button />", { id:"color-changers-l" + i + "red", class:"red",  html: "-"})

                    .appendTo("#l"+i);

                    //color
                    $("color-changers-l" + i + "red").click( function() { $('#l'+i).css('color','red'); } );

                    */
					$( "#l"+i ).draggable({stack: ".brainstormCard"});


                }
			  

			  $("#l"+i).hover(function(evt){
				  $(this).addClass("card-hover");
            }, function(evt){
				  $(this).removeClass("card-hover");
            });

            $("#l"+i).click(function(evt){
				  $(".brainstormCard").removeClass("card-selected");
                  $(this).addClass("card-selected");
            })

            //trash deletion, only works here for main page
            $("#trash").droppable({
        drop: function(event, ui) {
          ui.draggable.remove();
        }
      })

            i++;
			  
			});

      /*
			$("#trash").droppable({
        drop: function(event, ui) {
          ui.draggable.remove();
        }
      })
      */

      

			
      });