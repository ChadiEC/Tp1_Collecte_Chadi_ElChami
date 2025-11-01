export type Role = "admin" | "user";
export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public nom: string,
    public role: Role,
    public favorites: string[] = [] 
  )
    {}
    
}
