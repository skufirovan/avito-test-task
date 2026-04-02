import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { baseApi } from "@/api/baseApi"

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (gdm) => gdm().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
