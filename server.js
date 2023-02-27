const app = require('./');

const { PORT = 4000 } = process.env;

app.listen(PORT, async  () => {
  console.log(`Users are ready at http://localhost:${PORT}`);
});
