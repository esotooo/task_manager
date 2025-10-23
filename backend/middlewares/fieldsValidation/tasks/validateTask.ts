import { Request, Response, NextFunction } from 'express';
import {body, validationResult} from 'express-validator';

export const validateTasks = [
    body('task_title')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese un título para la tarea.')
        .bail()
        .isLength({min: 2, max: 50})
        .withMessage('El título debe contener entre 2 y 50 caracteres.'),

    body('task_description')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese una breve descripción para la tarea.'),

    body('id_priority')
        .trim()
        .notEmpty()
        .withMessage('Por favor, seleccione una prioridad.')
        .bail()
        .matches(/^[1-3]+$/)
        .withMessage('La prioridad de una tarea es de 0 a 3'),

    body('id_state')
        .trim()
        .notEmpty()
        .withMessage('Por favor, seleccione un estado.')
        .matches(/^[1-4]+$/)
        .withMessage('El estado de una tarea es de 0 a 3'),

    body('due_date')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese una fecha de vencimiento.'),

    body('id_user')
        .trim()
        .notEmpty()
        .withMessage('Por favor, ingrese el usuario.')
    ]

export const handleTasksErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const errorsByField: Record<string, string> = {};
        
        errors.array().forEach((error) => {
        const field = (error as any).param || (error as any).path || "general";
        errorsByField[field] = error.msg;
        });

        return(res.status(400).json({
            success: false,
            fields: errorsByField
        }));
    }

    next();
}