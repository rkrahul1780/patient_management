import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Home from './Home';
import Navbar from './navbar';
import ConsultationCertificateForm from './verifyconsulation';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/verify/consultation"
            element={<ConsultationCertificateForm />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
