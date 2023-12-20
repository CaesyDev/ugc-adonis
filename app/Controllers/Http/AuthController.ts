import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from '../../Models/User';
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  protected async register({ request, response }: HttpContextContract) {
    const registrationValidationSchema = schema.create({
      firstName: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
      lastName: schema.string({ trim: true }, [rules.required(), rules.maxLength(255)]),
      email: schema.string({ trim: true }, [
        rules.required(),
        rules.email(),
        rules.unique({
          table: 'users',
          column: 'email',
        }),
      ]),
      phone: schema.string({ trim: true }, [
        rules.required(),
        rules.unique({
          table: 'users',
          column: 'phone_number',
        }),
        rules.mobile(),
      ]),
      password: schema.string({ trim: true }, [
        rules.required(),
        rules.confirmed(),
        rules.minLength(8),
        rules.alphaNum(),
      ]),
    })

    const validatedData = await request.validate({
      schema: registrationValidationSchema,
      messages: {
        'firstName.required': 'First Name is required',
        'firstName.maxLength': 'First Name max length is 255',
      },
    })

    const user = await User.create({
      first_name: validatedData.firstName,
      last_name: validatedData.lastName,
      phone_number: validatedData.phone,
      email: validatedData.email,
      password: validatedData.password,
    })

    return response.json({
      data: user,
    })
  }

  protected async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '120 mins'
      });

      return response.json({
        data: token,
        userID : auth.user?.id
      });

    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }


  protected async logout({ auth }: HttpContextContract) {
    await Database.rawQuery(`DELETE FROM api_tokens WHERE user_id = ?`, [auth.user?.id as string]);
    await auth.use('api').logout();
    return {
      revoked: true,
    }
  }


  protected async dashboard ({ auth } : HttpContextContract) {
    await auth.use('api').authenticate()
    return auth.use('api').isLoggedIn
  }
}
