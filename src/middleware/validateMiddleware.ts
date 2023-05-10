import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  schema.parse({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  next();
}

export default validate;