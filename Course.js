// Course.js
Course = function(name, lessonDuration){
	this.name = name;
	this.lessonDuration = lessonDuration;

	////////////////////////////////////////////////
    // Events listening interface
    //

	this.allHandlers = new Array();
	this.timelineHandlers = new Array();
	this.timelineHandlerTypes = []

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
		if (!this.timelineHandlers[type]);
			this.timelineHandlers[type] = [];
			this.timelineHandlerTypes.push(type);
		this.timelineHandlers[type].push(handler);

		//Adds new listener to current timelines
		for (tl in this.timelineList){
			tl.addEventListener(type, listener);
		}

		console.log(this.timelineHandlers);
	}

	//---------------------------------


	this.timelineList = {};
	this.currentTimeline = null;
	//NOTE: Doesn't represent number of active lessons, just the number of lessons created so far
	this.lessonCounter = 0;
	this.currentIndex = null;
	// this.activeTimelines = [];

	this.addLesson = function(name){
		console.log(name);
		var newLesson = new Timeline(this.lessonCounter, this.lessonDuration);

		for (type in this.timelineHandlers){
			// var type = this.timelineHandlers[i];
			console.log(type);
			for (var j = 0; j < this.timelineHandlers[type].length; j++){
				newLesson.addEventListener(type, this.timelineHandlers[type][j])
			}
			console.log('flag')
		}

		this.timelineList[this.lessonCounter.toString()] = newLesson;
		if (this.lessonCounter == 0){
				this.currentTimeline = newLesson;
				this.currentIndex = newLesson.num;
			}
		this.lessonCounter++;
		console.log(newLesson);
		var data = {
			index: newLesson.num,
			name: name,
			timeline: newLesson
		};

		this.dispatchCourseEvent('add', data);

	}

	this.removeLesson = function(index){
		var removed = lessonList[index.toString()];
		delete lessonList[index.toString()];
		var data = {
			toRemove: removed.num
		};
		this.dispatchCourseEvent('kill', data);
	}

	this.showLesson = function(index){
		var oldIndex = this.currentTimeline.num;
		this.currentTimeline = this.timelineList[index.toString()];
		this.currentIndex = parseInt(index);
		var data = {
			oldIndex: oldIndex,
			newIndex: index
		};
		this.dispatchCourseEvent('show', data);
	}

}