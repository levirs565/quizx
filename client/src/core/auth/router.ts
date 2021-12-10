import AuthContainer from './Auth.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

export default [
  {
    path: '/auth',
    component: AuthContainer,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  }
];
