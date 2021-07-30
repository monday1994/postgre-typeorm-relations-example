// here imports of all routes
import { Express, Request, Response } from 'express';

//only for example
import relationsExample from '../components/relationsExamples/relationsExample';

const healthCheckHandler = (req: Request, res: Response) => {
    res.json({status: 200, message: 'Health check - status ok!'})
};

export const mountRoutes = (app: Express, prefix: string): Express => {
    //only for example purposes
    // route => /example/one-to-one or one-to-many or many-to-many
    app.use('/example', relationsExample)

    //health check
    app.get(`${prefix}/`, healthCheckHandler);

    return app;
};

