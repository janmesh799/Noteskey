"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store"; // Adjust the import based on your store location
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/lib/slices/authSlice"; // Adjust the import based on your slice location

const Home = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.auth  .value);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
    </div>
  );
};

export default Home;
