// LessonItem.js

LessonItem = function(text, duration){

	this.text = text;
	this.duration = duration;
	this.color = 'blue';

	this.getDuration = function(){
		return this.duration;
	}

	this.getDescription = function(){
		return this.text;
	}

	this.setText = function(text){
		this.text = text;
	}

	this.setDuration = function(duration){
		this.duration = duration;
	}

	this.setColor = function(color){
		this.color = color;
	}

	////////////////////////////////////////////////
    // Events listening interface
    //

	this.allHandlers = new Array();
	
	/**
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchItemEvent = function(type, details){
		var newEvent = new ItemEvent(type, details);

		if (this.allHandlers[type]){
			for (var i in this.allHandlers[type]){
				this.allHandlers[type][i](newEvent);
			}
		}
	}

	/**
	 * Add a new event listener for a given event type
	 * the parameter 'handler' has to be a function with one parameter which is an event object
	 */
	this.addEventListener = function(eventType, handler){
		if (!this.allHandlers[eventType])
			this.allHandlers[eventType] = [];
		this.allHandlers[eventType].push(handler);
	}
}



