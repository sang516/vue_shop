import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Welcome from '@/components/Welcome.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [
                { path: '/welcome', component: Welcome },
                {
                    path: '/users',
                    component: () =>
                        import ("@/components/user/Users.vue"),
                },
                {
                    path: '/rights',
                    component: () =>
                        import ("@/components/power/Rights.vue"),
                },
                {
                    path: '/roles',
                    component: () =>
                        import ("@/components/power/Roles.vue"),
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next();

    const tokenStr = sessionStorage.getItem('token');
    if (!tokenStr) return next('/login');
    next();
})

export default router;