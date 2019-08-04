// Package file data.
const packageJson = (name) => (
    {
        "name": `${name.charAt(0).toUpperCase() + name.slice(1)}`,
        "version": "1.0.0",
        "main": "index.js",
        "scripts": {
            "start": "babel-node src/index.js",
            "test": "nyc --reporter=text mocha --require @babel/register --exit"
        }
    }
);

const gitIgnore =
    `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# next.js build output
.next

# dist file ignored
dist/`

const readMe = (name) => (
    `# ${name.charAt(0).toUpperCase() + name.slice(1)}
This is my first app generated using kemboijs-cli

# Project setup
npm install

# Compile and Run
npm start

# Build application
npm build

# Run your tests
npm test
`
);

const babel = `{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}`

const appJs =
    `import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';

const port = 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use('/', routes);
app.use('*', (req, res) => {
    res.status(404).send({
        message: "Url not found"
    });
});

app.listen(port, () => {
    console.log("Server connected successfully")
});

export default app;
`

const homeBaseMiddleware =
    `export default function homeBaseMiddleware(req, res, next) {
    next();
}
`

const middleware = `export {default as HomeBaseMiddleware} from './homebase';`

const homeBaseControllers =
    `export default class HomebaseControllers{
    static async getItems(req, res) {
        return res.status(200).send({
            message: "Welcome to first base endpoint"
        });
    }
}
`

const controllers = `export { default as HomebaseControllers } from './homebase';`

const homeBaseRouter =
    `import { Router } from 'express';
import { HomebaseControllers } from '../controllers';
import { HomeBaseMiddleware } from '../middlewares';

const router = new Router();

// Router for homebase url
router.route('/').get(
    HomeBaseMiddleware,
    HomebaseControllers.getItems
);

router.use((err, req, res, next) => {
    if (err) throw err;
});

export default router;
`

const routes =
    `import { Router } from 'express';
import homeBaseRouters from './homebase';

const router = new Router();

// / url
router.get('/', (req, res) => {
    res.status(200).send({
        message: "Welcome to my first app"
    });
});

router.use('/homebase', homeBaseRouters);

export default router;
`

const appJsTest =
    `import chai from 'chai';
import chaHttp from 'chai-http';
import app from '../src';

chai.should();
chai.use(chaHttp);

describe('Testing app', () => {
    it('return base url', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should return true for homebase url', (done) => {
        chai.request(app)
            .get('/homebase')
            .then(res => {
                res.should.have.status(200);
                done();
            })
            .catch(function (err) {
                setTimeout(function () {
                    throw new err;
                });
            });
    });
    it('should return 404 when route not available', (done) => {
        chai.request(app)
            .get('/notfound')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});
`

const sequelizeInstanceData =
    `import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

export default sequelize;
`

const userModelData =
    `import { Model } from 'sequelize';
import sequelize from './sequelizeinstance';

export default class User extends Model { }
User.init({
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // Calling instance of sequelize created in file sequelizeinstance.js
    sequelize,
    modelName: 'user'
    // options
    });
`

module.exports = {
    packageJson,
    gitIgnore,
    readMe,
    babel,
    appJs,
    appJsTest,
    homeBaseMiddleware,
    middleware,
    homeBaseControllers,
    controllers,
    homeBaseRouter,
    routes,
    sequelizeInstanceData,
    userModelData
}
