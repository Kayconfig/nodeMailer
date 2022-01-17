import express, { Request, Response, NextFunction } from 'express';
import sendMail from './mailer';
import Joi from 'joi';
import { HttpError } from 'http-errors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message:
      'Welcome, The nodemailer api is available on route, /mail\nFor help visit /help ',
  });
});

app.get('/help', (req, res) => {
  res.send(`
        To use the /mail route you have to send four things (body or urlencoded)
        {
            to: "recipientemail@mail.com",
            subject: "Welcome",
            body: "This is the body of the request."
        } 
        `);
});

app.post('/mail', async (req, res) => {
  try {
    const createMailSchema = Joi.object({
      to: Joi.string().email().required(),
      body: Joi.string().min(1).required(),
      subject: Joi.string().min(1).required(),
    });
    const validation = createMailSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({
        message: '',
        error: validation.error.message,
      });
    }
    const { to, body, subject } = req.body;
    const response = await sendMail(to, subject, body);
    res.json({ response });
  } catch (error) {
    res.status(500).json({
      message: '',
      error,
    });
  }
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).json({
    message: 'Unable to process request. Please try again later',
  });
});

export default app;
