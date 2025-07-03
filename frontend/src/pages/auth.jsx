"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import axios from "axios";
import { toast } from "react-toastify";

const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [pending, setPending] = useState(false);
  const { setUser } = useStore();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(isLogin ? signInSchema : signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setPending(true);
    try {
      console.log(isLogin ? "Logging in..." : "Signing up...", data);
      const url = `${import.meta.env.VITE_BACKEND_URL}/auth/${
        isLogin ? "signin" : "signup"
      }`;
      const response = await axios.post(url, data, { withCredentials: true });
      if(response.status === 200 | 201) {
        console.log("Success:", response.data);
        setUser(response.data.data);
        toast.success("Wellcome");
        setPending(false);
        navigate("/");
      }
      else{
        setPending(false);
        toast.error(response.data.message);
        alert(response.data.message);
      }
      console.log("Response: ", response);
    } catch (error) {
      setPending(false);
      toast.error("An error occurred. Please try again.");
      alert("An error Occurred. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center">
      <Card className="max-w-md flex-1 mx-auto mt-10">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-xl font-bold text-center">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              {!isLogin && (
                <>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your first name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={pending}>
                {pending
                  ? isLogin
                    ? "Signing In..."
                    : "Signing Up..."
                  : isLogin
                  ? "Sign In"
                  : "Sign Up"}
              </Button>

              <div className="text-sm text-center text-muted-foreground">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary underline underline-offset-4"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
