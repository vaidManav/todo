const Schema = require('../models/task_schema');
const CompleteTask = require('../models/complete_task');

// home page
module.exports.home = async function (req, res) {
    try {
        let allTasks = await Schema.find({});
        return res.render('home', {
            task_list: allTasks,
        })
    } catch (err) {
        console.log("error in finding the tasks");
        return;
    }
}

// create tasks
module.exports.createTask = async function (req, res) {
    try {
        await Schema.create(req.body);
        return res.redirect('/');
    } catch (err) {
        console.log("error in creating a task");
        return;
    }
}

// task profile page
module.exports.profile = async function (req, res) {
    try {
        let task = await Schema.findById(req.params.id);
        return res.render('profile', {
            task: task,
        })
    } catch (err) {
        console.log("error in finding the tasks");
        return;
    }
}

// update task
module.exports.update = async function (req, res) {
    try {
        let id = req.params.id;
        await Schema.findByIdAndUpdate(id, req.body);
        return res.redirect('/');
    } catch (err) {
        console.log("error in updating the task");
        return res.redirect('/');
    }
}

// task is completed
module.exports.taskCompleted = async function (req, res) {
    try {
        let id = req.params.id;
        let task = await Schema.findById(id);
        await CompleteTask.create({
            CDescription: task.Description,
            Ccategory1: task.category1,
            CdueDate: task.dueDate,
        })
        await Schema.findByIdAndDelete(id);
        return res.redirect('/');
    } catch (err) {
        console.log("error in updating the task as completed");
        return res.redirect('/');
    }
}

// delete a task
module.exports.deleteTask = async function (req, res) {
    try {
        let id = req.params.id;
        await Schema.findByIdAndDelete(id);
        return res.redirect('/');

    } catch (err) {
        console.log("error in deleting the task");
        return res.redirect('/');
    }
}

// show completed tasks
module.exports.showCompleted = async function (req, res) {
    try {
        let Ctasks = await CompleteTask.find({});
        return res.render('completed', {
            completed_tasks: Ctasks,
        });
    } catch (err) {
        console.log("error in finding completed tasks");
        return res.redirect('/');
    }
}

// delete completed tasks
module.exports.deleteCompletedTask = async function (req, res) {
    try {
        let id = req.params.id;
        await CompleteTask.findByIdAndDelete(id);
        return res.redirect('/completed-task');
    } catch (err) {
            console.log("error in deleting the completed task");
            return res.redirect('/');
    }
}



