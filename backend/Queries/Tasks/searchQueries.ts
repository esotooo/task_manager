// Parte común: SELECT + FROM + JOINs
const baseSelect = `
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

const searchByTitle = `
${baseSelect} AND u.task_title LIKE ?`;

const searchByDateRange = `
${baseSelect} AND u.create_date BETWEEN ? AND ?`;

const searchByDateStart = `
${baseSelect} AND u.create_date >= ?`;

const searchByPriority = `
${baseSelect} AND u.id_priority = ?`;

const searchByState = `
${baseSelect} AND u.id_state = ?`;

const searchByTitleAndPriority = `
${baseSelect} AND u.id_priority = ? AND u.task_title LIKE ?`;

// Exportar
export const searchQueries = {
    searchByTitle,
    searchByDateRange,
    searchByDateStart,
    searchByPriority,
    searchByState,
    searchByTitleAndPriority,
    
};
