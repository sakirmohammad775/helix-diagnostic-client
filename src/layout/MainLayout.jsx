

import { Outlet } from 'react-router-dom';

import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

export default function MainLayout() {
  return (
    <div>
      {/* The Navbar will stay static at the top of every page */}
      <Navbar /> 
      {/* LOGIC: Outlet dynamically renders whichever child route is currently active */}
      <main>
        <Outlet /> 
      </main>

      <Footer/>
    </div>
  );
}