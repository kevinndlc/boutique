import type { RouteRecordRaw } from "vue-router";

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  {
    path: '',
    redirect: '/admin/addproduct'
  },
  {
    path: 'addproduct',
    component: () => import('@/features/admin/views/ProductForm.vue')
  },
  // {
  //   path: 'productlist',
  //   component: ProductList
  // },
];