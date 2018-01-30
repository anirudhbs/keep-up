const router = require("express").Router()
const controller = require("./controller")

router.get("/students", controller.getStudents)
router.get("/students/inactive", controller.getInactiveStudents)

router.put("/student/add", controller.addStudent)
router.delete("/student/:sid", controller.deleteStudent)
router.post("/student/:sid", controller.editStudent)
router.get("/student/:sid", controller.getStudentDetails)

router.get("/projects/:sid", controller.getStudentProjects)
router.get("/demos/:sid", controller.getStudentDemos)
router.get("/leaves/:sid", controller.getLeaves)

router.put("/project/add", controller.addProject)
router.get("/project/:pid", controller.getProjectDetails)
router.delete("/project/:pid", controller.deleteProject)
router.post("/project/:pid", controller.editProject)

router.put("/demo/add", controller.addDemo)
router.get("/demo/:did", controller.getDemoDetails)
router.delete("/demo/:did", controller.deleteDemo)

router.get("/demolist/:sid", controller.getStudentProjectsForDemo)

module.exports = router
