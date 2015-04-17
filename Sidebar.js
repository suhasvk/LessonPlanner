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