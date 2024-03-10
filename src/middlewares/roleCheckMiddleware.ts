import { Request, Response, NextFunction } from 'express';

export function checkRole(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || userRole !== role) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        next();
    };
}