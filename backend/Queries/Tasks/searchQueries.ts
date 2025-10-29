const baseQuery = `
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
WHERE u.id_user = ?`;

const searchByTitle = `u.task_title LIKE ?`;

const searchByDateRange = `u.create_date BETWEEN ? AND ?`;

const searchByDateStart = `u.create_date >= ?`;

const searchByPriority = `u.id_priority = ?`;

const searchByState = `u.id_state = ?`;

export const searchQueries = {
    baseQuery,
    searchByTitle,
    searchByDateRange,
    searchByDateStart,
    searchByPriority,
    searchByState,
};
