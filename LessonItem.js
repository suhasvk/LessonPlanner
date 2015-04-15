// LessonItem.js

LessonItem = function(text, start, end){

	this.text = text;
	this.duration = start-end;
	this.timeRange = [start,end];
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

	this.setColor = function(color){
		this.color = color;
	}

	this.setTimes = function(start, end){
		this.timeRange = [start, end];
	}


	//Attach event handlers
}



