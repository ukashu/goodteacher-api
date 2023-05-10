//@route GET /api/classes/:classId/students/:studentId/tasks
//@desc get all tasks for a student in a class
//@access private/teacher || private/student

//if student didin't accept invite, return 404

//@route POST /api/classes/:classId/students/:studentId/tasks
//@desc create a new task for a student in a class
//@access private/teacher

//if student didin't accept invite, return 404

//@route PUT /api/classes/:classId/students/:studentId/tasks/:taskId
//@desc change tasks status to completed
//@access private/student

//@route DELETE /api/classes/:classId/students/:studentId/tasks/:taskId
//@desc delete a task for a student in a class
//@access private/teacher