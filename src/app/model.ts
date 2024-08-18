
export interface User {
  email: string,
  name: string,
  surname: string,
  password: string,
  permissions: Array<Permission>
}

export interface Permission {
  permission: string
}
