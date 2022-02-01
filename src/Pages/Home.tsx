import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cart } from "../Components/Cart";
import { ProductsList } from "../Components/ProductsList";

export const Home = () => {
  // const Products = lazy(async () => ({ default: (await import("../Components/ProductsList")).ProductsList }));

  return (
    <div className="page-container">
      <Cart />

      <h1>Mel da Terra Verde</h1>

      <Link to="/login">Login</Link>

      <ProductsList />
    </div>
  );
};
