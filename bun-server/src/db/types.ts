import type { ColumnType, Generated, Insertable, Selectable } from 'kysely'

export interface Database {
  users: UsersTable
}

export interface UsersTable {
  id: Generated<number>
  email: string
  name: string
  created_at: ColumnType<Date, never, never>
}

export type User = Selectable<UsersTable>
export type NewUser = Insertable<UsersTable>
