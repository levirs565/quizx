const app = require('../app');
const UserController = require('../controllers/user');

app.post('/api/user/signup', UserController.signup);
app.post('/api/user/login', UserController.login);
app.post('/api/user/logout', UserController.logout);
app.get('/api/user/status', UserController.status);
