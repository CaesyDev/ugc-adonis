import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('phone_number')
      table.text('password')
      table.dateTime('created_at', { useTz: true }).defaultTo(this.now())
      table.dateTime('updated_at', { useTz: true }).defaultTo(this.now())
      table.string('remember_me_token').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}



