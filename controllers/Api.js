const HomeRouter = require('./HomeRouter');
const SignUpRouter = require('./SignUpRouter');
const SignInRouter = require('./SignInRouter');
const DashboardRouter = require('./DashboardRouter');

class Api {
  constructor() {

  }

  initializeApp(app){
    app.use('/', HomeRouter);
    app.use('/signup', SignUpRouter);
    app.use('/signin', SignInRouter);
    app.use('/dashboard', DashboardRouter);

    app.use('/test', (req, res) => {
      res.send('All is ok');
    });
  }
}

module.exports = new Api();
