$(function() {
	$("#tabs").tabs();
	$("#CourseInfo").load("CourseInfo.html");
	$("#Brainstorming").load("Brainstorming.html");
	$("#LessonPlanning").load("LessonPlanning.html");
	$("#sortable").sortable();
	
	// show the given page, hide the rest
	function show(elementID) {
		// try to find the requested page and alert if it's not found
		var pageName;

		switch (elementID){
			case 'courseInfo':
				pageName = 'CourseInfo.html';
				break;

			case 'lessonPlanning':
				pageName = 'LessonPlanning.html';
				break;

			case 'brainstorming':
				pageName = 'Brainstorming.html';
				break;
		}

		$('#CurrentPage').load(pageName)
		

	}		
});