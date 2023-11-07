import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@medplum/react';
import * as C from './App.styles'

import Explanation from "./routes/Explanation";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HomePatient from "./routes/HomePatient";
import ConfigPatient from "./routes/ConfigPatient";
import HomeMedic from "./routes/HomeMedic";
import ConfigMedic from "./routes/ConfigMedic";
import SendPatientData from "./routes/SendPatientData";
import PatientData from "./routes/PatientData";

import AuthService from './services/AuthService';
import AuthProvider from './contexts/auth/AuthProvider';

const medplum = new MedplumClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login authService={new AuthService()} />
      },
      {
        path: "/patient/home",
        element: <HomePatient />
      },
      {
        path: "/patient/config",
        element: <ConfigPatient />
      },
      {
        path: "/medic/home",
        element: <HomeMedic />
      },
      {
        path: "/medic/config",
        element: <ConfigMedic />
      },
      {
        path: "/explanation",
        element: <Explanation />
      },
      {
        path: "/register",
        element: <Register authService={new AuthService()} />
      },
      {
        path: "/patient/send-data",
        element: <SendPatientData />
      },
      {
        path: "/medic/view-patient-data",
        element: <PatientData />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <AuthProvider authService={new AuthService()}>
      <MedplumProvider medplum={medplum}>
        <RouterProvider router={router} />
      </MedplumProvider>
    </AuthProvider>
  </React.StrictMode>
);