import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
// import swaggerJSDoc from "swagger-jsdoc";
import YAML from "yamljs"
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __dirname = path.resolve();

// ...

// Get the directory name of the current module
const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const currentModuleDir = dirname(currentModulePath);

// Initiliza express app
const app = express();

// middleware to parse data coming from frontend
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger option
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job portal API documentation",
            version: "1.0.0",
            description: `
            This is the documentation for Job Portal API.
            The main goal of this project is to provide a platform where users can post their job offers and
            other users can apply for those jobs.
            Users must register first in order to create or edit posts, but they don't need to
            be logged in to view them.
                `,
            contact: {
                name: "Muhammad Zain-ul-Abdin Ansari",
                email: "info@email.com"
            }
        },
        servers: [
            {
                url: "http://localhost:8000/"
            }
        ],
    },
    schemes: ["http", "https"],

    apis: ["./routes/user.routes.js"]
};

// swagger connection middleware
const swaggerJSDoc = YAML.load(currentModuleDir + '/api.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

// routes imports
import userRoutes from "./routes/user.routes.mjs";
import authRoutes from "./routes/auth.routes.mjs"
import jobRoutes from "./routes/job.routes.mjs"


//Frotend for job-application

app.get('/', express.static(path.join(__dirname, "public")))
app.use('/', express.static(path.join(__dirname, "public")))

// other Api Routes

app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", jobRoutes)

export { app };
