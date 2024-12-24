"use client";

import React from "react";
import BookCard from "@/components/bookCard";
import { Book } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in">
            <Book className="w-14 h-14 text-blue-600" />
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
              Welcome to Book Store
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            Discover your next favorite book from our carefully curated
            collection
          </p>
        </div>
        {/* Featured Books Section */}
        <div className="mt-32">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Featured Books
          </h2>

          <BookCard
            HomeProps="/register"
            orderProps={async (bookId) => Promise.resolve()}
            disabled={false}
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Start Your Reading Journey Today
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Join thousands of book lovers and discover your next literary
            adventure
          </p>
        </div>
      </div>
    </div>
  );
}
