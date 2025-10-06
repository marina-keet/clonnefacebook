import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import vine from '@vinejs/vine'

export default class AuthController {
  // Validation pour la connexion
  static loginValidator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(1),
    })
  )

  // Validation pour l'inscription
  static registerValidator = vine.compile(
    vine.object({
      firstName: vine.string().minLength(2).maxLength(50),
      lastName: vine.string().minLength(2).maxLength(50),
      email: vine.string().email(),
      password: vine.string().minLength(6),
      phone: vine.string().optional(),
      birthDate: vine.date().optional(),
      gender: vine.enum(['male', 'female', 'other']).optional(),
    })
  )

  // API Login pour AJAX
  async apiLogin({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = await request.validateUsing(AuthController.loginValidator)

      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return response.status(401).json({
          success: false,
          message: 'Email ou mot de passe incorrect',
        })
      }

      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Connexion réussie',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          fullName: user.fullName,
        },
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: error.messages || error.message,
      })
    }
  }

  // API Register pour AJAX
  async apiRegister({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(AuthController.registerValidator)

      const user = await User.create(payload)
      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Inscription réussie',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          fullName: user.fullName,
        },
      })
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: "Erreur lors de l'inscription",
        errors: error.messages || error.message,
      })
    }
  }

  // Déconnexion
  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
