import {createRouter, createWebHistory} from 'vue-router'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {  path: '/', component: () => import('../views/Home.vue') },
        {  path: '/sign-in', component: () => import('../views/SignIn.vue') },
        {  
            path: '/todo',
            component: () => import('../views/Todo.vue'),
            meta: { requiresAuth: true },
        },
        {  
            path: '/edit',
            component: () => import('../views/Edit.vue'),
            meta: { requiresAuth: true },
        },
        {  
            path: '/edit/:id',
            component: () => import('../views/Edit.vue'),
            meta: { requiresAuth: true },
        },
        {  
            path: '/aaaa',
            component: () => import('../components/Props.vue'),
            meta: { requiresAuth: true },
        },
        
    ],
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(getAuth(), user => {
            removeListener()
            resolve(user)
        }, reject)
    })
}

router.beforeEach(async(to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next()
        } else {
            alert('You must be logged in to see this page')
            next({ path: '/sign-in' })
        }
    } else {   
        next()
    }
})

export default router