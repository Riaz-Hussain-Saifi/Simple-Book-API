"use client"
import React, { useState, useEffect } from 'react'
import { getOrders, deleteOrder } from '@/services/orders'
import { toast } from 'react-toastify'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Package, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ShowOrders = () => {
  const [orders, setOrders] = useState<{ id: number; bookId: number; name: string; customerName: string; price: number; quantity: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem("accessToken") || ''
      setToken(token)
    }
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders(token)
        if (orders !== "Failed to get orders") {
          setOrders(orders)
        } else {
          toast.error("Failed to get orders", {
            position: "top-center",
            autoClose: 200,
            theme: "colored",
          })
        }
      } catch {
        toast.error("Error loading orders")
      } finally {
        setIsLoading(false)
      }
    }
    if (token) {
      fetchOrders()
    }
  }, [token])

  const deleteFunc = async (orderId: number) => {
    try {
      const data = await deleteOrder(orderId, token)
      if (data !== "Order deleted successfully") {
        toast.success("Order deleted successfully", {
          position: "top-center",
          autoClose: 200,
          theme: "colored",
        })
        const updatedOrders = orders.filter((order) => order.id !== orderId)
        setOrders(updatedOrders)
      } else {
        toast.info("Press delete again to delete order", {
          position: "top-center",
          autoClose: 200,
          theme: "colored",
        })
      }
    } catch {
      toast.error("Error deleting order")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 sm:mb-8">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center sm:text-left">
            Your Orders
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {orders.map((book, index) => (
            <Card 
              key={index} 
              className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                <div className="w-full sm:w-32 h-40 sm:h-48 mx-auto sm:mx-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={`/book${book.bookId || 'default'}.png`}
                      alt={'Book cover'}
                      fill
                      className="object-cover rounded-lg"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
                        {book.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1 text-center sm:text-left">
                        Order #{book.id || 'N/A'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-700 text-sm sm:text-base">
                        <span className="font-medium">Customer:</span> {book.customerName || 'N/A'}
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        <span className="font-medium">Book ID:</span> {book.bookId || 'N/A'}
                      </p>
                      <p className="text-green-600 font-semibold text-base sm:text-lg">
                        ${typeof book.price === 'number' ? book.price.toFixed(2) : '0.00'}
                      </p>
                      <p className="text-blue-600 text-sm sm:text-base">
                        Quantity: {book.quantity || 0}
                      </p>
                    </div>

                    <div className="flex border-t border-red-500 border-opacity-50 justify-end pt-2">
                      <Button
                        onClick={() => book.id && deleteFunc(book.id)}
                        className="p-2 text-black bg-red-500 hover:bg-red-300 hover:text-gray-500 transition-colors duration-200"
                        aria-label="Delete order"
                      >
                        <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const ShowOrdersPage = () => {
  return (
    <div>
      <ShowOrders />
    </div>
  )
}

export default ShowOrdersPage