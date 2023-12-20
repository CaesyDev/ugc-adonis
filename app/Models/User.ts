import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id?: string

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public phone_number: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public remember_me_token?: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
    user.id = uuidv4();
  }
}
