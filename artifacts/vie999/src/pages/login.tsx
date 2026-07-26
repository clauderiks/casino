import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1A1A2E] border border-[#C9A84C]/30 shadow-[0_0_20px_rgba(201,168,76,0.15)] mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
              <path d="M2 22h20M2 18l4-10 4 4 2-6 2 6 4-4 4 10H2z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black mb-2" style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(135deg, #C9A84C, #F5D787)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ĐĂNG NHẬP</h1>
          <p className="text-sm text-white/60">Chào mừng trở lại với HUYNH THUONG</p>
        </div>

        <div className="bg-[#1A1A2E] border border-[#C9A84C]/20 rounded-xl p-5 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                        <Input 
                          placeholder="Tên đăng nhập" 
                          className="pl-10 h-12 bg-[#0D0D1A] border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20" 
                          data-testid="input-username"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[#C0272D]" />
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
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Mật khẩu" 
                          className="pl-10 pr-10 h-12 bg-[#0D0D1A] border-[#C9A84C]/30 text-white placeholder:text-white/30 focus:border-[#C9A84C] focus:ring-[#C9A84C]/20" 
                          data-testid="input-password"
                          {...field} 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-white/40 hover:text-white"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[#C0272D]" />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <a href="#" className="text-xs text-[#C9A84C] hover:underline">Quên mật khẩu?</a>
              </div>
              
              <Button type="submit" className="w-full h-12 text-md font-bold bg-gradient-to-br from-[#C9A84C] to-[#E8C96A] text-[#0D0D1A] hover:opacity-90 border-none mt-2" data-testid="button-submit-login">
                ĐĂNG NHẬP
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-8 text-center text-sm text-white/60">
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-[#C9A84C] font-bold hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </Layout>
  );
}
