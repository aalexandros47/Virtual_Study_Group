// Manages routing between different views, ensures restricted access to authenticated users.
import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import GroupList from '../views/GroupList.vue';
import GroupDetails from '../views/GroupDetails.vue';
import UserLogin from '../views/UserLogin.vue';
import UserSignup from '../views/UserSignup.vue';
import CreateGroup from '../views/CreateGroup.vue';
import { auth } from '../firebase';

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  {
    path: '/groups',
    name: 'Groups',
    component: GroupList,
    meta: { requiresAuth: true },
  },
  {
    path: '/group/:id',
    name: 'Group',
    component: GroupDetails,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: UserLogin },
  { path: '/signup', name: 'Signup', component: UserSignup },
  {
    path: '/create-group',
    name: 'CreateGroup',
    component: CreateGroup,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const userAuthenticated = auth.currentUser;

  if (requiresAuth && !userAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
