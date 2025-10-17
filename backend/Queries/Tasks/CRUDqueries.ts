const createTask = `INSERT INTO user_tasks (id_task, task_title, task_description, id_priority, id_state, due_date, id_user, create_date)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

const obtainTaskID = `SELECT id_task
    FROM user_tasks
    WHERE id_user = ?
    ORDER BY id_task DESC LIMIT 1;`;

const getTasks = `SELECT 	
	u.id_task,
    u.task_title,
    u.task_description, 
    p.priority,
    s.state,
    u.due_date,
    u.create_date,
    u.end_date,
    p.id_priority,
    s.id_state
FROM user_tasks u
INNER JOIN task_priority p
ON p.id_priority = u.id_priority
INNER JOIN task_state s
ON s.id_state = u.id_state
WHERE id_user = ?`;

const updateTask = `UPDATE user_tasks
SET task_title = ?,
	task_description = ?,
    id_priority = ?,
    id_state = ?,
    due_date = ?,
    end_date = ?
WHERE id_task = ? AND id_user = ?;`;

const deleteTask = `DELETE FROM user_tasks WHERE id_task = ? AND id_user = ?;`;

export const CRUDqueries = {
    createTask: createTask,
    obtainTaskID: obtainTaskID,
    getTasks: getTasks,
    updateTask: updateTask,
    deleteTask: deleteTask
};