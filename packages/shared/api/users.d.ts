export type CurrentUserResponse = {
  id: string
  clerkId: string
  email: string
  name: string
  imageUrl: string | null
}

export type User = {
  id: string
  clerkId: string
  name: string
  email: string
  imageUrl: string | null
}

export type GetAllUsersResponse = {
  users: User[]
}
