/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Page d'accueil (login)
router.on('/').render('pages/home')

// API Routes pour AJAX
router.group(() => {
  router.post('/login', '#controllers/auth_controller.apiLogin')
  router.post('/register', '#controllers/auth_controller.apiRegister')
}).prefix('/api/auth')

// Route de déconnexion
router.post('/logout', '#controllers/auth_controller.logout').as('logout')

// Pages protégées
router.group(() => {
  router.get('/home', async ({ view }) => {
    return view.render('pages/dashboard')
  })
}).middleware(middleware.auth())
