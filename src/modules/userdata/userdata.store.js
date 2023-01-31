/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getUsers, postUser } from "../../api/users"
import getVideos from "../../api/videos"

const initialState = {
  allUsers: {},
  videos: {},
  currentUser: {
    userId: "",
  },
  loading: false,
}

function getToken() {
  const { cookie } = document
  const token = cookie.split("=")[1]
  return token
}

const axiosConfig = {
  headers: {
    Authorization: `${getToken()}`,
  },
}

export const fetchUsers = createAsyncThunk("data/fetchUsers", async () => {
  const users = await getUsers()
  return users
})

export const fetchVideos = createAsyncThunk("data/fetchVideos", async () => {
  const videos = await getVideos()
  return videos
})

export const registerUser = createAsyncThunk("data/register", async (data) => {
  const user = postUser(data)
  return user
})

export const loginUser = createAsyncThunk("data/login", async (data) => {
  const user = axios.post(
    "https://wonderful-app-lmk4d.cloud.serverless.com/auth",
    data
  )
  console.log(user)
  return (await user).data
})

export const addVideo = createAsyncThunk("data/addVideo", async (data) => {
  const videoInfo = {
    url: data.url,
    title: data.title,
    description: data.description,
  }
  const video = axios.post(
    "https://wonderful-app-lmk4d.cloud.serverless.com/video",
    videoInfo,
    axiosConfig
  )
  return video
})
const userDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addUser(state, action) {
      state.currentUser = action.payload
    },
    delUser(state) {
      state.allUsers.pop()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.allUsers = action.payload
    })
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.loading = false
      state.videos = action.payload
    })
    builder.addCase(fetchVideos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.currentUser.userId = action.payload.id
      document.cookie = `token=${action.payload.authToken};max-age=31536000 `
      state.loginLoading = false
    })
    builder.addCase(registerUser.pending, (state) => {
      state.loginLoading = true
    })
    builder.addCase(fetchUsers.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(fetchVideos.rejected, (state) => {
      state.loading = false
    })
    builder.addCase(registerUser.rejected, (state) => {
      state.loginLoading = false
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.currentUser.userId = action.payload.id
      document.cookie = `token=${action.payload.authToken};max-age=31536000 `
      state.loginLoading = false
    })
    builder.addCase(loginUser.pending, (state) => {
      state.loginLoading = true
    })
    builder.addCase(loginUser.rejected, (state) => {
      state.postLoading = false
    })
  },
})

const { reducer } = userDataSlice
const { getData } = userDataSlice.actions

export { reducer, getData }
