import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(4, "Tên đăng nhập ít nhất 4 ký tự"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Mock login
    toast.success("Đăng nhập thành công!");
    setLocation("/");
  }

  return (
    <Layout>
      <div className="p-6 pt-10 flex flex-col min-h-[calc(100vh-140px)]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-card border border-primary/20 shadow-[0_0_15px_rgba(0,200,255,0.2)] mb-4">
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-2xl font-black text-white mb-2">ĐĂNG NHẬP</h1>
          <p className="text-sm text-muted-foreground">Chào mừng trở lại với VIE999</p>
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-5 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="Tên đăng nhập" 
                          className="pl-10 h-12 bg-background border-border/50 focus:border-primary focus:ring-primary/20" 
                          data-testid="input-username"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mật khẩu" 
                          className="pl-10 pr-10 h-12 bg-background border-border/50 focus:border-primary focus:ring-primary/20" 
                          data-testid="input-password"
                          {...field} 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <a href="#" className="text-xs text-primary hover:underline">Quên mật khẩu?</a>
              </div>
              
              <Button type="submit" className="w-full h-12 text-md font-bold bg-primary text-black hover:bg-primary/90 mt-2" data-testid="button-submit-login">
                ĐĂNG NHẬP
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </Layout>
  );
}
