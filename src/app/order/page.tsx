"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import BookCard from '@/components/bookCard';
import CreateOrder from '@/services/orders';
import { toast } from "react-toastify";
import { ShoppingCart, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface OrderData {
  token: any;
  bookId: any;
  clientName: any;
}

interface AuthData {
  token: any;
  clientName: any;
}

const OrderPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>();
  const [authData, setAuthData] = useState<AuthData>({ token: null, clientName: null});
  const [isMounted, setIsMounted] = useState(false);

  // Initialize authentication data
  useEffect(() => {
    setIsMounted(true);
    const token = window.localStorage.getItem("accessToken");
    const clientName = window.localStorage.getItem("clientName");
    setAuthData({ token, clientName });
  }, []);

  // Handle order creation with useCallback
  const createOrder = useCallback(async (token: any, bookId: any, clientName: any) => {
    try {
      const response = await CreateOrder(token, bookId, clientName);
      
      if (response && response !== "Failed to place order. Try again.") {
        toast.success("Order Placed Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return true;
      } else {
        toast.error("Failed to place order", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return false;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred while placing your order", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return false;
    }
  }, []);

  // Handle order click with proper async handling
  const handleOrderClick = useCallback(async (bookId: string) => {
    const { token, clientName } = authData;

    if (!token || !clientName) {
      toast.info("Please login first.", {
        position: "top-center",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await createOrder(token, bookId, clientName);
      if (success) {
        setOrderData({ token, bookId, clientName });
      }
    } finally {
      setIsLoading(false);
    }
  }, [authData, createOrder]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Confirm Your Order
          </h1>

          <Link href="/showOrders">
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
              disabled={isLoading}
            >
              <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
              <span className="text-base md:text-lg font-medium">
                View Orders
              </span>
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-4 md:p-6 backdrop-blur-lg bg-opacity-90 transition-all duration-300 hover:shadow-2xl">
          <BookCard 
            HomeProps="#"
            orderProps={handleOrderClick}
            disabled={isLoading}
          />
        </div>

        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-gray-700 font-medium">Processing your order...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
