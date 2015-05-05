// Course.js
Course = function(name, lessonDuration){
	this.name = name;
	this.lessonDuration = lessonDuration;

	////////////////////////////////////////////////
    // Events listening interface
    //

	this.allHandlers = new Array();
	
	/**
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchCourseEvent = function(type, details){
		var newEvent = new CourseEvent(type, details);
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


	/*
	 * Add event listeners that are active on all timelines in the course
	 */

	this.addTimelineListener = function(type, handler){

		//Stores new listener to add to future timelines
		if (!this.timelineHandlers[eventType])
			this.timelineHandlers[eventType] = [];
		this.timelineHandlers[eventType].push(handler);

		//Adds new listener to current timelines
		for (tl in timelineList){
			tl.addEventListener(type, listener);
		}
	}

	//---------------------------------


	this.timelineList = {};
	this.currentTimeline = null;
	//NOTE: Doesn't represent number of active lessons, just the number of lessons created so far
	this.lessonCounter = 0;


	this.addLesson = function(name){
		var newLesson = Timeline(lessonCounter, this.lessonDuration);

		for (var i = 0; i < this.timelineHandlers.length; i++){
			var type = this.timelineHandlers[i];
			for (var j = 0; j < this.timelineHandlers.length; j++){
				newLesson.addEventListener(type, this.timelineHandlers[type][j])
			}
		}

		timelineList[lessonCounter.toString()] = newLesson;
		lessonCounter++;

		data = {
			index: newLesson.num,
			name: name
		};

		this.dispatchCourseEvent('add', data);

	}

	this.removeLesson = function(index){
		var removed = lessonList[index.toString()];
		delete lessonList[index.toString()];
		data{
			toRemove: removed.num
		};
		this.dispatchCourseEvent('kill', data);
	}

	this.showLesson = function(index){
		var oldIndex = this.currentTimeline.num;
		this.currentTimeline = timelineList[index.toString()];
		data = {
			oldIndex: oldIndex,
			newIndex: index
		};
		this.dispatchCourseEvent('show', data);
	}

}