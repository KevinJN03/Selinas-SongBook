const app = require('./');

const { PORT = 4300 } = process.env;

app.listen(PORT, async  () => {
  console.log(`Server running @ http://localhost:${PORT}`);
});
