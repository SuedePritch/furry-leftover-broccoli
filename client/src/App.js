import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ApolloClient,InMemoryCache,ApolloProvider,createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { StoreProvider } from './utils/GlobalState';


// Styling Imports
import './App.css'

// Component Imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProductPage from './pages/ProductPage'
import AllCategories from './pages/AllCategories';
import CategoryPage from './pages/CategoryPage';
import AdminMain from './pages/AdminMain';
import Landing from './pages/Landing'


require('dotenv').config();


// APOLLO CONFIG
//THIS HTTPLINK NEEDS TO BE UPDATED TO THE DEPLOYED URL 
const httpLink = createHttpLink({uri: 'http://localhost:3001/graphql',cache: new InMemoryCache(),});
const authLink = setContext((_, { headers }) => {const token = localStorage.getItem('id_token');return {headers: {...headers,authorization: token ? `Bearer ${token}` : '',},}});
const client = new ApolloClient({link: authLink.concat(httpLink),cache: new InMemoryCache(),});



function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
      <StoreProvider>
        <Navbar />
        
        
        <Routes>
          {/* Auth Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminMain />} />



          {/* Main Landing Page */}
          <Route path='/' element={<Landing />} />
          


          {/* Product Routes */}
          <Route path='/product/:productId' element={<ProductPage />} />


          {/* Category Routes */}
          <Route path='/category' element={<AllCategories />} />
          <Route path='/category/:categoryId'element={<CategoryPage />}/>


          {/* Wildcard/404 Routes - Needs to stay at the bottom */}
          <Route path='*'element={<h1 className='display-2'>Wrong page!</h1>}/>
        </Routes>



        <Footer />
        </StoreProvider>
      </>
    </Router>
    
    </ApolloProvider>
  );
}


export default App;