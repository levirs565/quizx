import CoreContainer from './Core.vue';
import Login from './views/Login';
import Register from './views/Register.vue';

export default [
  {
    path: '/auth',
    component: CoreContainer,
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
