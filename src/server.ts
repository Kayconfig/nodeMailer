import app from './app';
import envConfig from './envConfig';

const port = envConfig.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
