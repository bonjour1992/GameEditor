export enum Access {
  None = 0,
  Read,
  Write,
  Total,
}

export class User {
  id: Number;
  name: string;
  access: Access;
  constructor() {
    this.id = 0
    this.name = ""
    this.access = Access.None
  }
}



export async function checkLogin(token: string): Promise<User> {
  const u = new User()
  u.id = 1
  u.name = 'test'
  u.access = Access.Total
  return u
}
export function checkGrant(u: User, level: Access): boolean {
  return true
}