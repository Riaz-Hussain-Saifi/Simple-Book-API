"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import fetchBook from "@/services/api"
import Link from "next/link"

interface Book {
  id: number
  name: string
  type: string
  available: boolean
}
interface BookCardProps {
  HomeProps: string;
  orderProps?: (bookId: any) => Promise<any>;
  disabled: boolean;
}
function BookCard({ HomeProps , orderProps}: BookCardProps) {
const [books, setBooks] = useState([]);

useEffect(()=>{
 const fetchData = async() =>{
  const books = await fetchBook()
  setBooks(books);
 }
 fetchData();
},[]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: Book) => (
          <Card
            key={book.id}
            className="group bg-white hover:shadow-lg transition-all duration-300 rounded-3xl overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative w-full h-[400px] p-8 bg-gray-50">
              <div className="relative w-full h-full">
                <Image
                  src={`/book${book.id}.png`}
                  alt={`${book.name} cover`}
                  fill
                  className="object-contain transform transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={book.id <= 6}
                  quality={100}
                />
                {/* Subtle shadow overlay */}
                <div className="absolute inset-0 shadow-inner" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 min-h-[3.5rem]">
                {book.name}
              </h2>

              {/* Genre */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Genre:</span>
                <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full">
                  {book.type}
                </span>
              </div>

              {/* Availability Badge */}
              <Badge
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium
                  ${
                    book.available
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }
                `}
              >
                {book.available ? "Available" : "Out of Stock"}
              </Badge>

              {/* Button */}
              <Link href={HomeProps} >
              <Button
                onClick={() => { orderProps && orderProps(book.id) } }
                disabled={!book.available}
                className={`
                  w-full mt-4 py-6 rounded-2xl font-medium text-base
                  transition-all duration-300
                  ${
                    book.available
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                {book.available ? "Place Order" : "Sold Out"}
              </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BookCard
