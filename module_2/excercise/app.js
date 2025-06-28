const express = require('express');
const app = express();
const config = require('./config');
const userRouter = require('./User');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./api-docs/swagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

const LoggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method}`);
    next();
}

app.use(LoggerMiddleware);

app.use(express.json());


app.use('/api/v1/users', userRouter);

app.use((req, res, next)=>{
    res.status(404).send("Resource not found");
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
});

