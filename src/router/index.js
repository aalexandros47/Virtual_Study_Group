// Manages routing between different views, ensures restricted access to authenticated users.

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StudyGroups from '../views/StudyGroups.vue';
import StudyGroup from '../views/StudyGroup.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CreateStudyGroup from '../components/CreateStudyGroup.vue';
import { auth } from '../firebase';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/study-groups',
    name: 'StudyGroups',
    component: StudyGroups,
    meta: { requiresAuth: true },
  },
  {
    path: '/study-group/:id',
    name: 'StudyGroup',
    component: StudyGroup,
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  {
    path: '/create-study-group',
    name: 'CreateStudyGroup',
    component: CreateStudyGroup,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
