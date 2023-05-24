import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from './Login';
import Navbar from './navbar';
import SignupForm from './Signup';
import Dashboard from './dashboard';
import Consultation from './consultation';
import { PrivateRoute } from './PrivateRouting';
import VaccineForm from './vaccination';
import ChangePasswordForm from './changepassword';
import Listconsultation from './Listconsultation';
import Consultationinfo from './viewconsultation';
import ListVaccination from './Listvaccination';
import Vacccinationinfo from './viewvaccination';
import Profile from './profile';
import ProfileForm from './editprofile';
import Listtransaction from './listtarnaction';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/consultation/add"
            element={
              <PrivateRoute>
                <Consultation />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/consultation"
            element={
              <PrivateRoute>
                <Listconsultation />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/vaccination/add"
            element={
              <PrivateRoute>
                <VaccineForm />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/vaccination"
            element={
              <PrivateRoute>
                <ListVaccination />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/transaction"
            element={
              <PrivateRoute>
                <Listtransaction />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/changepassword"
            element={
              <PrivateRoute>
                <ChangePasswordForm />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/profile/edit"
            element={
              <PrivateRoute>
                <ProfileForm />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/consultation/:id"
            element={
              <PrivateRoute>
                <Consultationinfo />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/vaccination/:id"
            element={
              <PrivateRoute>
                <Vacccinationinfo />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
