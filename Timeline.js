// Timeline.js

var Timeline = function(num, totalTime){
	this.num = num;
	this.totalTime = totalTime;
	this.itemList = [];


	this.addItemWithName = function(name){
		if (this.itemList.length > 0){
			var scaleFactor = (this.totalTime-10)/totalTime;
			for (var item = 0; item<this.itemList.length; item++) {
				var current_time = this.itemList[item].getDuration()
				var new_time = parseInt(scaleFactor*current_time);
				this.itemList[item].setDuration(new_time);
			}
			this.itemList.push(new LessonItem(name, 10));
		}
		
		else {
			var scaleFactor = 1;
			this.itemList.push(new LessonItem(name, this.totalTime));
		}

		var data = {
			'scaleFactor': scaleFactor,
			'newList': this.itemList,
			'firstAdd': (this.itemList.length == 1),
			'description': name
		};
		console.log('data');
		console.log(data);
		this.dispatchTimelineEvent('newEvent',data);
	}
	

	this.resize = function(percentages){
		var timeList = []
		for (var i = 0; i < percentages.length; i++){
			var thisItem = this.itemList[i];
			var newTime = parseInt(percentages[i]*this.totalTime);
			thisItem.setDuration(newTime);			
			timeList.push(newTime);
		}
		var data = {
			'timeList': timeList
		}
		this.dispatchTimelineEvent('resize', data)
	}

	this.kill = function(index){
		var killedItem = this.itemList.pop(index);
		console.log(killedItem);
		var dur = parseInt(killedItem.getDuration());
		var scaleFactor = parseInt(this.totalTime)/(parseInt(this.totalTime) - dur);
		console.log(this.totalTime);
		console.log(dur);
		for (var item = 0; item < this.itemList.length; item++){
			var current_item = this.itemList.length
		}

		var data = {
			'index':index,
			'scaleFactor':scaleFactor,
			'newList':this.itemList
		};

		this.dispatchTimelineEvent('kill',data);
	}

	this.reorderItems = function(oldIndex, newIndex){
		var data = {
			'oldIndex': oldIndex,
			'newIndex': newIndex
		};

		var movedItem = this.itemList.pop(oldIndex);
		this.itemList.splice(newIndex,0,movedItem);
		this.dispatchTimelineEvent('orderChange', data);
	}

	////////////////////////////////////////////////
    // Events listening interface
    //

	this.allHandlers = new Array();
	
	/**
	 * Dispatch a new event to all the event listeners of a given event type
	 */
	this.dispatchTimelineEvent = function(type, details){
		var newEvent = new TimelineEvent(type, details);
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