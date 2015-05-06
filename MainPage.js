
exampleCourse = new Course('Biology', 60);
timelineObjectContainer = {};

dragHandler = function(evt){
  var totalWidth = $('#timelineContents'+exampleCourse.currentIndex.toString()).width() - 20;
  percentages = [];
  $('#timelineContents'+exampleCourse.currentIndex.toString()).children().each(
    function(){
      var myWidth = $(this).width();
      percentages.push((myWidth/totalWidth));
    }
  )
  console.log(percentages);
  exampleCourse.currentTimeline.resize(percentages);
}

formatCard = function(newEvent, description, first){
  var timeInfo = document.createElement("div");
  var number = document.createElement("a");
  number.id = "numberHolder";
  if (first) {
    number.appendChild(document.createTextNode('100'));
  }
  else {
    number.appendChild(document.createTextNode('10'));
  }
  number.className = "cardTimeInfo";
  var tag = document.createElement("a");
  tag.appendChild(document.createTextNode('minutes'));
  tag.className = "numberTag";

  var text = document.createElement("div");
  $(text).html("Description: <br>");
  var inputArea = document.createElement("textarea");
  $(inputArea).val(description);
  $(text).append(inputArea);
  text.className = "descriptionText";

  var closeButton = document.createElement("div");
  closeButton.className = "closeButton";

  var editButton = document.createElement("div");
  editButton.className = "editButton";
  //ASSEMBLE!
  console.log(number);
  $(timeInfo).append(number);
  $(timeInfo).append(tag);
  console.log(timeInfo);
  $(newEvent).append(timeInfo);
  $(newEvent).append(text);
  $(newEvent).append(closeButton);
  $(newEvent).append(editButton);

  $(closeButton).click(
    function(evt){
      var index = $(this).closest('.cardContainer').attr('id')[3];
      exampleCourse.currentTimeline.kill(index);
    }
  );
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
function makecard(idx, text) {

        var item = document.createElement('div');
        item.id = 'l'+idx;
        item.appendChild(document.createTextNode(text))
        $("<div />", { id:'l'+idx, class:"class", html: text })
       .appendTo("#areaOne");

       //makes default card
       $("<div />", { id:"card", class:"card",
        html: "Create more cards near the timeline while this class is selected" })
       .appendTo("#l"+idx);

        //make the card renameable
      $("#l"+idx).click(function(evt){
  		var newIndex = parseInt($(this).attr('id').slice(1));
  		exampleCourse.showLesson(newIndex);
      });

      // $('#l'+idx).dblclick(function(evt){
      // 	    var divHtml = $(this).clone().children().remove().end().text();
		    // var divID = $(this).attr('id');
		    // var editableText = $("<textarea id=" + divID + " />");
		    // editableText.val(divHtml);
		    // var cards = $(this).children();
		    // $(cards).detach();
		    // $(this).replaceWith(editableText);
		    // editableText.focus();
		    // // setup the blur event for this new textarea
		    // editableText.blur(editableTextBlurred);
		    // $(this).append(cards);
      // })
    }



$(function() {
    $('#newItemInputArea').keypress(
    	function(evt){
			//(If they press enter after a nonempty input)
	        if(evt.which == 13 && $(this).val().length > 0) {

	    	//!!! PASS TO MVC
	    	console.log(exampleCourse.currentTimeline);
	        exampleCourse.currentTimeline.addItemWithName($(this).val());
	        $(this).val('');   
	    }
    });

	$("#classmaker").keypress(function(e) {
        
        if (e.which == 13) {
             
            var current = $("#classmaker").val();
            
            exampleCourse.addLesson(current);

            $("#classmaker").val("");


       }
    });

	exampleCourse.addEventListener('add', function(evt){
		var index = evt.data.index;
		var cardBox = document.createElement("tr");

		cardBox.id = "cardBox"+index.toString();
		cardBox.className = "cardBox";
	  	$(cardBox).sortable({
	        axis: 'x',
	        helper: 'clone',

	        //Keeps track of current order
	        start: function(e, ui) {
	            $(this).attr('data-previndex', ui.item.index());
	        },

	        //Infers new order
	        update: function(e, ui) {
	            var newIndex = ui.item.index();
	            var oldIndex = $(this).attr('data-previndex');
	            $(this).removeAttr('data-previndex');

	            //!!! PASS TO MVC
	            evt.data.timeline.reorderItems(oldIndex, newIndex);
	        }
	    });

		var timelineObj = document.createElement("tr");
		timelineObj.id = "timelineContents" + index.toString();
		timelineObjectContainer[index.toString()] = timelineObj;

		if (parseInt(index) != 0){
		  cardBox.style.display = "none";
		  // timelineObj.style.display = "none";
		}

		else {
		  $('#resizableTimeline').append(timelineObj);
		}

		$('#cardTable').append(cardBox);
		// console.log('dat');
		// console.log(evt.data.name);
		makecard(evt.data.index, evt.data.name);
	});

	exampleCourse.addEventListener('kill', function(evt){
		var idx = evt.data.toRemove;
		$('#cardBox'+idx.toString()).detach()
		$('#timelineContents'+idx.toString()).detach();
		delete timelineObjectContainer[idx.toString()];
		$('#l'+idx.toString()).detach();
	});

	exampleCourse.addEventListener('show', function(evt){
		console.log(evt);
        $('#resizableTimeline').colResizable({disable:true});
		$('#timelineContents'+evt.data.oldIndex.toString()).detach();
		$('#cardBox'+evt.data.oldIndex.toString()).hide();
		$('#resizableTimeline').append( timelineObjectContainer[evt.data.newIndex.toString()] );
		// $('#timelineContents'+evt.data.newIndex.toString()).show();
		$('#cardBox'+evt.data.newIndex.toString()).show();
        $('#resizableTimeline').colResizable({
          liveDrag:true,
          gripInnerHtml:"<div class='grip2'></div>",
          onResize: dragHandler
        });


	});
	
	exampleCourse.addTimelineListener('newEvent',
		function(evt){
			console.log(evt);
			console.log(evt.data.firstAdd);
      //Make timeline things
      if (evt.data.firstAdd){
        var newTimelineItem = document.createElement("td");
        newTimelineItem.className = 'timelineDisplayItem';
        newTimelineItem.style.width = "100%";
        $('#timelineContents'+exampleCourse.currentIndex.toString()).append(newTimelineItem);
        $('#resizableTimeline').colResizable({
          liveDrag:true,
          gripInnerHtml:"<div class='grip2'></div>",
          onResize: dragHandler
        });

        $('#l'+exampleCourse.currentIndex.toString()).children().detach();
      }
      else{
        var newTimelineItem = document.createElement("td");
        $('#resizableTimeline').colResizable({disable:true});
        $('#timelineContents'+exampleCourse.currentIndex.toString()).children().each(function() {
          var oldWidth = $(this).width();
          var newWidth = parseInt(oldWidth*evt.data.scaleFactor*.9);
          $(this).css('width', newWidth.toString()+"px");
        });
        newTimelineItem.className = 'timelineDisplayItem';
        newTimelineItem.style.width = (10/exampleCourse.lessonDuration)*parseInt($('#timelineContents').width()).toString() + 'px';
        $('#timelineContents'+exampleCourse.currentIndex.toString()).append(newTimelineItem);
        $('#resizableTimeline').colResizable({
        	gripInnerHtml:"<div class='grip2'></div>",
          liveDrag:true,
          onResize: dragHandler
        });
      }

      var num = exampleCourse.currentTimeline.itemList.length-1;

      //MAKES NEW EVENT CARD (MORE TO DO)
      var newEvent = document.createElement("div");
      newEvent.id = "evtCard"+exampleCourse.currentIndex.toString()+":"+num;
      newEvent.className = "evtCard";

      //ADD CARD TO TIMELINE
      var newContainer = document.createElement("td");
      newContainer.id = "con"+num.toString();
      newContainer.className = "cardContainer";
      $(newContainer).append(newEvent);

      
      $(newContainer).css('width',(100/(num+1)).toString()+'%');
      $('.cardContainer').css('width',(100/(num+1)).toString()+'%');
      
      $('#cardBox' + exampleCourse.currentIndex.toString()).append(newContainer); 
      formatCard(
              newEvent,
              exampleCourse.currentTimeline.itemList[num].getDescription(), 
              evt.data.firstAdd
            );
      dragHandler(evt);
		

	$("<div />", { 
		id:"card", 
		class:"card", 
		html: evt.data.description}).appendTo("#l"+exampleCourse.currentIndex.toString());
	});

	exampleCourse.addTimelineListener('orderChange',
		function(evt){
			console.log(evt);
      var oldIndex = parseInt(evt.data.oldIndex);
      var newIndex = parseInt(evt.data.newIndex);
      $('#resizableTimeline').colResizable({disable:true});
      var guy_to_move = $($('#timelineContents'+exampleCourse.currentIndex.toString()).children()[oldIndex]).detach();
      if (newIndex >= ($('#timelineContents'+exampleCourse.currentIndex.toString()).children()).length){
        $('#timelineContents'+exampleCourse.currentIndex.toString()).append(guy_to_move);
      }
      else{
        $($('#timelineContents'+exampleCourse.currentIndex.toString()).children()[newIndex]).before(guy_to_move);
      }
      $('#resizableTimeline').colResizable({
      	gripInnerHtml:"<div class='grip2'></div>",
        liveDrag:true,
        onResize: dragHandler
      });
		}
	);

	exampleCourse.addTimelineListener('kill',
		function(evt){
      $('#resizableTimeline').colResizable({disable:true});
      console.log(evt.data);
      var index = parseInt(evt.data.index);

      var scaleFactor = evt.data.scaleFactor;
      $('#timelineContents'+exampleCourse.currentIndex.toString()).children(':nth-child('+(index+1).toString()+')').detach();
      $('#cardBox'+exampleCourse.currentIndex.toString()).children(':nth-child('+(index+1).toString()+')').detach();
      $('#timelineContents'+exampleCourse.currentIndex.toString()).children().each(
        function(){
          var newWidth = parseInt($(this).width())*parseInt(scaleFactor);
          $(this).css('width',newWidth);
        }
        );
      $('#cardBox'+exampleCourse.currentIndex.toString()).children().each(
        function(){
          var newWidth = 100/(exampleCourse.currentTimeline.itemList.length);
          $(this).css('width', newWidth.toString() + '%');
        }
      );
      $('#resizableTimeline').colResizable({
      	gripInnerHtml:"<div class='grip2'></div>",
        liveDrag:true,
        onResize: dragHandler
      });
      dragHandler(evt);
		}
	);

	exampleCourse.addTimelineListener('resize',
		function(evt){
			console.log(evt);
		    for(var i = 0; i < evt.data.timeList.length; i++){
		    	console.log($('#cardBox'+exampleCourse.currentIndex.toString()).children(':nth-child('+(i+1).toString()+')'));
		    	console.log('himmyf');
		        $('#cardBox'+exampleCourse.currentIndex.toString()).children(':nth-child('+(i+1).toString()+')').find('#numberHolder').html(evt.data.timeList[i]);
		    }
		}
	);
	exampleCourse.addLesson('Class 1');
});