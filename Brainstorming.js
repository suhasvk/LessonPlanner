
      $(document).ready(function(){

      		//This function exists for current cards
      		$(".brainstormCard").hover(function(evt){
                  $(this).css('background-color','#B7A8D2');
            }, function(evt){
                  $(this).css('background-color','#fff');
            });

            $(".brainstormCard").click(function(evt){
                  $(".brainstormCard").css('border-color','#4850B7');
                  $(this).css('border-color','#CBD271');
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
                  $(this).css('background-color','#B7A8D2');
            }, function(evt){
                  $(this).css('background-color','#fff');
            });

            $("#l"+i).click(function(evt){
                  $(".brainstormCard").css('border-color','#4850B7');
                  $(this).css('border-color','#CBD271');

            })

            i++;
			  
			});

			//Trash deletion
			$("#trash").droppable({
				drop: function(event, ui) {
					ui.draggable.remove();
				}
			})

      $(".class").droppable({
        drop: function(event, ui) {
          //ui.draggable.detach().appendTo($(this));

          
          //* THIS IS THE WORDS thingy
          var draggablewords = ui.draggable.html();
          var currentwords = $(this).html();
          alert(currentwords + "<br>" + draggablewords);
          $(this).html(currentwords+"<br>"+draggablewords);
          //ui.draggable.remove();
          
          
        }
      });

			
      });