"use client"
import React, { useState, useEffect } from 'react'
import { getOrders, deleteOrder } from '@/services/orders'
import { toast } from 'react-toastify'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Package, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ShowOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const token = window.localStorage.getItem("accessToken")

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
      } catch (error) {
        toast.error("Error loading orders")
      } finally {
        setIsLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const deleteFunc = async(orderId: any) => {
    try {
      const data = await deleteOrder(token, orderId)
      if(data !== "Order deleted successfully"){
        toast.info("Order deleted successfully", {
          position: "top-center",
          autoClose: 200,
          theme: "colored",
        })
        const updatedOrders = orders.filter((order: any) => order.id !== orderId)
        setOrders(updatedOrders)
      } else {
        toast.error("Failed to delete order")
      }
    } catch (error) {
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Package className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-blue-600">
            Your Orders
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((book: any, index: number) => (
            <Card 
              key={index} 
              className="bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex gap-6 p-6">
                <div className="w-36 h-48 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={`/book${book?.bookId || 'default'}.png`}
                      alt={'Book cover'}
                      fill
                      className="object-cover rounded-lg"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 justify-between">
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                         {book?.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Order #{book?.id || 'N/A'}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Customer:</span> {book?.customerName || 'N/A'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Book ID:</span> {book?.bookId || 'N/A'}
                      </p>
                      <p className="text-green-600 font-semibold text-lg">
                        ${typeof book?.price === 'number' ? book.price.toFixed(2) : '0.00'}
                      </p>
                      <p className="text-blue-600">
                        Quantity: {book?.quantity || 0}
                      </p>
                  </div>

                  <div className="flex border-t border-red-500 border-opacity-50 border- justify-end pt-1">
                    <Button
                      onClick={() => book?.id && deleteFunc(book.id)}
                      className="p-2 text-black bg-red-500 hover:bg-red-300 hover:text-gray-500 transition-colors duration-200"
                      aria-label="Delete order"
                    >
                      <Trash className=" w-5 h-5" />
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

export default ShowOrders
