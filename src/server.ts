import { app } from './app';

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  try {
    console.log(`server running on port ${port}`);
  } catch (error) {
    console.error(error);
  }
});
