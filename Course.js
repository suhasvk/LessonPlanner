// Course.js
Course = function(name, numberOfLessons, lessonDuration){
	this.name = name;
	this.lessonDuration = lessonDuration;
	this.numberOfLessons = numberOfLessons;
	this.lessonList = [];

	for (var i = 0; i < this.numberOfLessons; i++){
		this.addLesson('Lesson #'+i.toString())
	}

	this.addLesson = function(name){
		var newLesson = Lesson(name, this.lessonDuration)
		lessonList.push(newLesson);
	}

	this.removeLesson = function(index){

	}

	this.changeLessonOrder = function(oldIndex, newIndex){

	}

	this.editLessonName = function(index, newName){

	}

	this.changeAllLessonDurations = function(newDuration){
		for (var i = 0; i < lessonList.length; i++) {
			lessonList[i].changeDuration(newDuration);
		};
	}

	this.changeSingleLessonDuration = function(index, newDuration){
		
	}


}