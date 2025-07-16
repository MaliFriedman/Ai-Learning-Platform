import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import '../swagger/user.swagger'; 
import '../swagger/category.swagger'; 
import '../swagger/subCategory.swagger'; 
import '../swagger/prompt.swagger';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AI Learning Platform API',
            version: '1.0.0',
            description: 'API documentation for the AI-driven learning platform.',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['src/routes/*.ts', "./src/swagger/*.ts" ,'src/controllers/*.ts', 'src/models/*.ts'], // חשוב!
};

export const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


