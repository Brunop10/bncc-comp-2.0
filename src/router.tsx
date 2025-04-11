import { createBrowserRouter, Navigate } from 'react-router'

import AppLayout from './layouts/app-layout'

import { Home } from './pages/home'
import { Abilities } from './pages/abilities'
import { Details } from './pages/details'
import { AbilitiesByYear } from './pages/abilities-by-year'
import { Favorites } from './pages/favorites'
import { About } from './pages/about'
import { AbilitiesByAxes } from './pages/abilities-by-axes'

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
        path: '/guia/ano',
        element: <AbilitiesByYear />
      },
      {
        path: '/guia/eixo',
        element: <AbilitiesByAxes />
      },
      {
        path: '/favoritos',
        element: <Favorites />
      },
      {
        path: '/detalhes',
        element: <Navigate to='/' />
      },
      {
        path: '/detalhes/:code',
        element: <Details />
      },
      {
        path: '/sobre',
        element: <About />
      }
    ]
  }
])
