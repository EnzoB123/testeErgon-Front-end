import LoginPage from "../components/LoginPage.vue";
import MainPage from "../components/MainPage.vue";
import Favorites from "../components/FavoritesPage.vue";

const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/main",
    component: MainPage,
  },

  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: Favorites
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
