import login from './components/login/login';
import home from './components/home/home';

export const routes = [{
    path: '/login',
    name: 'login',
    component: login
},{
    path: '/home',
    name: 'home',
    component: home
},{
    path: '/*',
    component: home
}]
