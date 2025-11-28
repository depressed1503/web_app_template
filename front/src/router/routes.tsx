import { createRouter, Route, RootRoute } from "@tanstack/react-router"
import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import { ProtectedRoute } from "@/router/protected"
import RegistrationPage from "@/pages/RegistrationPage"
import ProfilePage from "@/pages/ProfilePage"

const rootRoute = new RootRoute()

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
})

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegistrationPage,
})

const protectedRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedRoute,
})

const profileRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: ProfilePage,
})

const homeRoute = new Route({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: HomePage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  protectedRoute.addChildren([homeRoute, profileRoute]),
])

export const router = createRouter({ routeTree })
