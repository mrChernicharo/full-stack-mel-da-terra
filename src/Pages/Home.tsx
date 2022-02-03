import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Components/Cart";
import { ProductsList } from "../Components/ProductsList";
import { useAuthContext } from "../hooks/AuthContext";

export const Home = () => {
  const { user } = useAuthContext();

  return (
    <div className="page-container">
      <Cart />

      <h1>Mel da Terra Verde</h1>

      {!user && <Link to="/login">Login</Link>}

      <ProductsList />
    </div>
  );
};
