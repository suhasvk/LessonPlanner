var numLessons = 2;
var classLength = 90;
var timeLineList = [];
var timelineObjContainer = []
var currentTimeLine = 0
for (var i = 0; i < numLessons; i++) {
  timeLineList.push(new Timeline(0,classLength)); 
};


//Maybe this should happen on the first time the person clicks the lesson tab?
$(document).ready(function(){
	//--------------------
	//MAKE NECESSARY STUFF
	//--------------------
  for (var i = 0; i < numLessons; i++) {
    var cardBox = document.createElement("tr");
    cardBox.id = "cardBox"+i.toString();
    cardBox.className = "cardBox";

    var timelineObj = document.createElement("tr");
    timelineObj.id = "timelineContents" + i.toString();
    timelineObjContainer.push(timelineObj);

    if (i > 0){
      cardBox.style.display = "none";
      timelineObj.style.display = "none";
    }
    else {
      $('#resizableTimeline').append(timelineObj);
    }
    $('#cardTable').append(cardBox);

  };

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

  var text = document.createElement("p");
  $(text).html("Description: <br>");
  text.appendChild(document.createTextNode(description));
  text.className = "descriptionText";

  var closeButton = document.createElement("button");
  closeButton.appendChild(document.createTextNode("x"));
  closeButton.className = "closeButton";

  //ASSEMBLE!
  console.log(number);
  $(timeInfo).append(number);
  $(timeInfo).append(tag);
  console.log(timeInfo);
  $(newEvent).append(timeInfo);
  $(newEvent).append(text);
  $(newEvent).append(closeButton);

  $(closeButton).click(
    function(evt){
      var index = $(this).closest('.cardContainer').attr('id')[3];
      timeLineList[currentTimeLine].kill(index);
    }
  );
}

	//-------------
	//HANDLE INPUTS
	//-------------


	//Handles event that user permutes cards
  	$('.cardBox').sortable({
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
            timeLineList[currentTimeLine].reorderItems(oldIndex, newIndex);
        }
    });

  	//Handles event that user creates a new card
    $('#newItemInputArea').keypress(
    	function(evt){
			//(If they press enter after a nonempty input)
	        if(evt.which == 13 && $(this).val().length > 0) {

	    	//!!! PASS TO MVC
	        timeLineList[currentTimeLine].addItemWithName($(this).val());
	        $(this).val('');   
	    }
    });

    dragHandler = function(evt){
      // console.log(evt);
      var totalWidth = $('#timelineContents'+currentTimeLine.toString()).width() - 20;
      percentages = [];
      $('#timelineContents'+currentTimeLine.toString()).children().each(
        function(){
          var myWidth = $(this).width();
          percentages.push((myWidth/totalWidth));
        }
      )
      console.log(percentages);
      timeLineList[currentTimeLine].resize(percentages);
    }
    //-----------
    //UPDATE VIEW
    //-----------

    for (var i = timeLineList.length - 1; i >= 0; i--) {
    	timeLineList[i].addEventListener('newEvent',
    		function(evt){
          //Make timeline things
          if (evt.data.firstAdd){
            var newTimelineItem = document.createElement("td");
            newTimelineItem.className = 'timelineDisplayItem';
            newTimelineItem.style.width = "100%";
            $('#timelineContents'+currentTimeLine.toString()).append(newTimelineItem);
            $('#resizableTimeline').colResizable({
              liveDrag:true,
              onResize: dragHandler
            });
          }
          else{
            var newTimelineItem = document.createElement("td");
            $('#resizableTimeline').colResizable({disable:true});
            $('#timelineContents'+currentTimeLine.toString()).children().each(function() {
              var oldWidth = $(this).width();
              var newWidth = parseInt(oldWidth*evt.data.scaleFactor*.9);
              $(this).css('width', newWidth.toString()+"px");
            });
            newTimelineItem.className = 'timelineDisplayItem';
            newTimelineItem.style.width = (10/classLength)*parseInt($('#timelineContents').width()).toString() + 'px';
            $('#timelineContents'+currentTimeLine.toString()).append(newTimelineItem);
            $('#resizableTimeline').colResizable({
              liveDrag:true,
              onResize: dragHandler
            });
          }

          var num = timeLineList[currentTimeLine].itemList.length-1;

          //MAKES NEW EVENT CARD (MORE TO DO)
          var newEvent = document.createElement("div");
          newEvent.id = "evtCard"+currentTimeLine.toString()+":"+num;
          newEvent.className = "evtCard";

          //ADD CARD TO TIMELINE
          var newContainer = document.createElement("td");
          newContainer.id = "con"+num.toString();
          newContainer.className = "cardContainer";
          $(newContainer).append(newEvent);

          
          $(newContainer).css('width',(100/(num+1)).toString()+'%');
          $('.cardContainer').css('width',(100/(num+1)).toString()+'%');
          
          $('#cardBox' + currentTimeLine.toString()).append(newContainer); 
          formatCard(
                  newEvent,
                  timeLineList[currentTimeLine].itemList[num].getDescription(), 
                  evt.data.firstAdd
                );
          dragHandler(evt);
    		}
    	);

    	timeLineList[i].addEventListener('orderChange',
    		function(evt){
    			console.log(evt);
          var oldIndex = parseInt(evt.data.oldIndex);
          var newIndex = parseInt(evt.data.newIndex);
          $('#resizableTimeline').colResizable({disable:true});
          var guy_to_move = $('#timelineContents'+currentTimeLine.toString()).children(':nth-child('+(oldIndex+1).toString()+')').detach();
          $('#timelineContents'+currentTimeLine.toString()).children(':nth-child('+(newIndex+1).toString()+')').before(guy_to_move);
          $('#resizableTimeline').colResizable({
            liveDrag:true,
            onResize: dragHandler
          });
    		}
		);

    	timeLineList[i].addEventListener('kill',
    		function(evt){
          $('#resizableTimeline').colResizable({disable:true});
          console.log(evt.data);
          var index = parseInt(evt.data.index);

          var scaleFactor = evt.data.scaleFactor;
          console.log(index);
          console.log($('#timelineContents'+currentTimeLine.toString()).children(':nth-child('+(index+1).toString()+')'));
          console.log($('#cardBox'+currentTimeLine.toString()).children(':nth-child('+(index+1).toString()+')'));
          $('#timelineContents'+currentTimeLine.toString()).children(':nth-child('+(index+1).toString()+')').detach();
          $('#cardBox'+currentTimeLine.toString()).children(':nth-child('+(index+1).toString()+')').detach();
          $('#timelineContents'+currentTimeLine.toString()).children().each(
            function(){
              var newWidth = parseInt($(this).width())*parseInt(scaleFactor);
              $(this).css('width',newWidth);
            }
            );
          $('#cardBox'+currentTimeLine.toString()).children().each(
            function(){
              var newWidth = 100/(timeLineList[currentTimeLine].itemList.length);
              $(this).css('width', newWidth.toString() + '%');
            }
          );
          $('#resizableTimeline').colResizable({
            liveDrag:true,
            onResize: dragHandler
          });
          dragHandler(evt);
    		}
		);

    	timeLineList[i].addEventListener('resize',
    		function(evt){
    			console.log(evt);
          for(var i = 0; i < evt.data.timeList.length; i++){
            $('#cardBox'+currentTimeLine.toString()).children(':nth-child('+(i+1).toString()+')').find('#numberHolder').html(evt.data.timeList[i]);
          }
    		}
		);
    };
});


