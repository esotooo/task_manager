const createTask = `INSERT INTO user_tasks (id_task, task_title, task_description, id_priority, id_state, due_date, id_user, create_date)
VALUES (?, ?, ?, ?, ?, ?, ?, ?);`

const obtainTaskID = `SELECT id_task
    FROM user_tasks
    WHERE id_user = ?
    ORDER BY id_task DESC LIMIT 1;`

export const createTaskQueries = {
    createTask: createTask,
    obtainTaskID: obtainTaskID
};