import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    protected async register({request, response}: HttpContextContract){

        return response.json({
            data : request
        })
    }
}
