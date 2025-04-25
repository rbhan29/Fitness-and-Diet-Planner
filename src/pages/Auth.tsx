import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth, UserWithCredentials } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type FormData = z.infer<typeof formSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    if (isLogin) {
      // Handle Login
      const success = await login(data.email, data.password);
      if (success) {
        toast({ title: "Login Successful", description: "You have successfully logged in." });
        navigate(location.state?.from?.pathname || "/home"); // Redirect to the main website
      } else {
        toast({ variant: "destructive", title: "Login Failed", description: "Invalid email or password." });
      }
    } else {
      // Handle Signup
      const userData: UserWithCredentials = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
  
      const success = await signup(userData);
      if (success) {
        toast({ title: "Signup Successful", description: "Your account has been created. Please log in." });
        setIsLogin(true); // Switch to the login form after successful signup
      } else {
        toast({ variant: "destructive", title: "Signup Failed", description: "Email already in use." });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-md p-8 border border-border">
        <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" type="email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">{isLogin ? "Login" : "Sign Up"}</Button>
          </form>
        </Form>
        <div className="mt-4 text-sm text-center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Button variant="link" onClick={() => setIsLogin(false)}>Sign Up</Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" onClick={() => setIsLogin(true)}>Login</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;