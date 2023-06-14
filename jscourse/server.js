// This is the import statement, it is used to import functionalities from external modules. Here, dotenv is a zero-dependency module 
// that loads environment variables from a .env file into process.env. 
import * as dotenv from 'dotenv';

// With dotenv.config(), all the configurations/variables in the .env file are loaded into the process.env object.
dotenv.config();

// This is importing classes or objects from the 'openai' package. 'Configuration' and 'OpenAIApi' are two classes provided by the package.
import { Configuration, OpenAIApi } from 'openai';

// Here we're creating a new instance of the 'Configuration' object with an API key from the environment variables.
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});

// A new instance of 'OpenAIApi' is created here with the previously created configuration object.
const openai = new OpenAIApi(configuration);

// This is the import statement to bring in Express, a fast, unopinionated, and minimalist web framework for Node.js.
import express from 'express';

// Importing CORS, a node.js package for providing a Connect/Express middleware 
// that can be used to enable CORS (Cross-Origin Resource Sharing) with various options.
import cors from 'cors';

// Here we're creating an instance of the express application.
const app = express();

// Using CORS middleware in our application. This will allow or restrict requested resources on a web server 
// depend on where the HTTP request was initiated.
app.use(cors());

// express.json() is a middleware function in Express. It parses incoming requests with JSON payloads 
// and is based on body-parser. It helps to read HTTP POST data.
app.use(express.json());

// Here, we're creating a new post route '/dream'. This route takes a JSON object with a 'prompt' in the request body.
app.post('/dream', async (req, res) => {
  try {
    // main code here
  } catch (error) {
    console.error(error)
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

// This line starts the server on port 8080 and logs a message to the console once the server is ready.
app.listen(8080, () => console.log('make art on http://localhost:8080/dream'));