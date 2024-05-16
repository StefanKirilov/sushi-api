import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { AuthProvider } from './contexts/authContext';
import { ShoppingCartProvider } from './contexts/shoppingCartContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Catalog from './components/Catalog/Catalog';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Profile from './components/Profile/Profile';
import Favorites from './components/Favorites/Favorites';
import Contacts from './components/Contacts/Contacts';
import Logout from './components/Logout/Logout';
import Sushi from './components/Sushi/Sushi';
import Drinks from './components/Drinks/Drinks';
import Sauce from './components/Sauce/Sauce';
import AuthGuard from './components/guards/AuthGuard';
import { ErrorPage } from './components/Error/ErrorPage';
import NotAuthGuard from './components/guards/NotAuthGuard';
import { Loader } from './components/Loader/Loader';

// import DetailSushi from './components/DetailSushi/DetailSushi';
// import DetailSauce from './components/DetailSauce/DetailSauce';
// import DetailDrink from './components/DetailDrink/DetailDrink';

const DetailSushi = lazy(() => import('./components/DetailSushi/DetailSushi'));
const DetailSauce = lazy(() => import('./components/DetailSauce/DetailSauce'));
const DetailDrink = lazy(() => import('./components/DetailDrink/DetailDrink'));

function App() {

  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Catalog />} />
            <Route path="/menu/sushi" element={<Sushi />}></Route>
            <Route path="/menu/drinks" element={< Drinks />}></Route>
            <Route path="/menu/sauce" element={<Sauce />}></Route>
            <Route path="/menu/sushi/:id" element={<DetailSushi />}></Route>
            <Route path="/menu/drinks/:id" element={<DetailDrink />}></Route>
            <Route path="/menu/sauce/:id" element={<DetailSauce />}></Route>
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/error" element={<ErrorPage />} />

            <Route element={<AuthGuard />}>
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route element={<NotAuthGuard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

          </Routes>
        </Suspense>
        <Footer />
      </ShoppingCartProvider>
    </AuthProvider>
  )
}

export default App
