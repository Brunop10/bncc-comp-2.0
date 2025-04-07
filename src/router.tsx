import { createBrowserRouter, Navigate } from 'react-router'

import AppLayout from './pages/_layout/app-layout'

import { Home } from './pages/home'
import { Abilities } from './pages/abilities'
import { Details } from './pages/details'
import { AbilitiesGuided } from './pages/abilities-guided'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/habilidades',
        element: <Abilities />
      },
      {
        path: '/habilidades-guiado',
        element: <AbilitiesGuided />
      },
      {
        path: '/detalhes',
        element: <Navigate to='/' />
      },
      {
        path: '/detalhes/:code',
        element: <Details />
      }
    ]
  }
])
