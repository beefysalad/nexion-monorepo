export type User = {
  id: string
  name: string
  email: string
  imageUrl: string | null
}

export type GetAllUsersResponse = {
  users: User[]
}
