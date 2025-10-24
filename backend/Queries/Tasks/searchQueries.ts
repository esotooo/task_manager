const searchByTitle = `
SELECT 	
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
WHERE id_user = ? AND task_title LIKE ?`;

const searchByDateRange = `
   SELECT 	
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
WHERE id_user = ? AND create_date BETWEEN ? AND ?`;

const searchByDateStart = `
   SELECT 	
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
WHERE id_user = ? AND create_date >= ?`;

export const searchQueries = {
    searchByTitle: searchByTitle,
    searchByDateRange: searchByDateRange,
    searchByDateStart: searchByDateStart
}