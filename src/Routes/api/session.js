import BaseRouter from '../../routes/router.js';
import { loginUser, logoutUser, recoveryPassword, registerUser } from '../../controllers/session.controller.js';
import { showProfile } from '../../controllers/user.controller.js';
import passport from 'passport';

export default class SessionRouter extends BaseRouter {
  init() {

    // Envía la solicitud a GitHub para iniciar sesión
    this.router.get(
      '/github',
      passport.authenticate('github', { scope: ['user:email'] }),
      async (req, res) => {}
    );

    // Recibe la respuesta de GitHub
    this.router.get(
      '/githubcallback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      async (req, res) => {
        req.session.user = req.user;
        res.redirect('/products');
      }
    );

    this.router.post(
      '/register',
      passport.authenticate('register', { failureRedirect: '/failRegister' }),
      registerUser
    );

    this.router.post(
      '/login',
      passport.authenticate('login', { failureRedirect: '/failLogin' }),
      loginUser
    );

    this.router.get('/logout', logoutUser);

    this.router.post('/profile', showProfile);

    this.router.post('/recovery', recoveryPassword);

  }
}
