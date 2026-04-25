import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export { apiClient, API_BASE_URL }
