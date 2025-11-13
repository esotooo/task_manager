const obtainByDueDate = `
SELECT 
    id_task,
	task_title, 
    due_date,
    id_state
FROM user_tasks WHERE id_user = ?;
`

const obtainByCreateDate = `
SELECT 
    id_task,
    task_title, 
    create_date,
    id_state
FROM user_tasks WHERE id_user = ?;
`

export const calendarQueries = {
    obtainByCreateDate, 
    obtainByDueDate
}