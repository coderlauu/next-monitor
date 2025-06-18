import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Alerts } from '@/views/Alerts'
import { Crons } from '@/views/Corns'
import { Dashboard } from '@/views/Dashboard'
import { Issues } from '@/views/Issues'
import { Login } from '@/views/Login'
import { Performance } from '@/views/Performance'
import { PerformanceSummary } from '@/views/PerformanceSummary'
import { Projects } from '@/views/Projects'

import Layout from '../layout'
import AuthRoute from './AuthRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children: [
            {
                path: 'projects',
                element: <Projects />,
            },
            {
                path: 'issues',
                element: <Issues />,
            },
            {
                path: 'performance',
                element: <Performance />,
            },
            {
                path: 'performance/summary',
                element: <PerformanceSummary />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'crons',
                element: <Crons />,
            },
            {
                path: 'alerts',
                element: <Alerts />,
            },
            {
                path: '/',
                element: <Navigate to="/projects" replace />,
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
])
