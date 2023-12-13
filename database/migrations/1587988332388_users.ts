import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)


      // table.uuid('id').primary()
      // table.string('firstName')
      // table.string('lastName')
      // table.string('email')
      // table.string('phoneNumber')
      // table.text('password')
      // table.dateTime('createdAt', { useTz: true }).defaultTo(this.now())
      // table.dateTime('updatedAt', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}



