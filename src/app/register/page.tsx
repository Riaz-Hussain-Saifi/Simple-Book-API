"use client"
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Mail, User, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerClient } from "@/services/auth";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerClient(name, email);

      if (
        response !== "API client already registered. Try a different email." &&
        response !== "Failed to register API client"
      ) {
        localStorage.setItem("accessToken", response);
        localStorage.setItem("clientName", name);

        toast.success("Registration Successful", {
          position: "top-center",
          autoClose: 200,
          theme: "colored",
        });
        redirect("/order");
      } else {
        toast.error(response, {
          position: "top-center",
          autoClose: 200,
          theme: "colored",
        });
      }
    } 
   finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4 animate-gradient-x">
      <Card className="w-full max-w-md shadow-2xl transform hover:scale-[1.01] transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-3 pb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-2">
            <User className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create an Account
          </CardTitle>
          <p className="text-sm text-gray-600 text-center">
            Enter your details to get started with Simple-Book-API
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Enter your name"
                className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Enter your email"
                className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg transition-all duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>
          </div>

          <Button
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70"
            onClick={handleRegister}
            disabled={isLoading}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Register Now
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </span>
          </Button>

          <p className="text-xs text-gray-500 text-center mt-6">
            Simple-Book-API Registration Form
            <br />
            <span className="text-blue-600">Created by Riaz Hussain</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;