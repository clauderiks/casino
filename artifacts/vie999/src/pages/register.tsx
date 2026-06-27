import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Lock, Eye, EyeOff, Phone } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

const registerSchema = z.object({
  username: z.string().min(4, "Tên đăng nhập ít nhất 4 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

export default function Register() {
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    toast.success("Đăng ký thành công!");
    setLocation("/");
  }

  return (
    <Layout>
      <div className="p-6 pt-8 flex flex-col min-h-[calc(100vh-140px)]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-white mb-2">ĐĂNG KÝ TÀI KHOẢN</h1>
          <p className="text-sm text-primary font-medium">Nhận ngay ưu đãi 150% cho lần nạp đầu</p>
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
                          placeholder="Tên đăng nhập (4-16 ký tự)" 
                          className="pl-10 h-12 bg-background border-border/50 focus:border-primary focus:ring-primary/20" 
                          data-testid="input-register-username"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input 
                          placeholder="Số điện thoại" 
                          type="tel"
                          className="pl-10 h-12 bg-background border-border/50 focus:border-primary focus:ring-primary/20" 
                          data-testid="input-register-phone"
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
                          data-testid="input-register-password"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Xác nhận mật khẩu" 
                          className="pl-10 pr-10 h-12 bg-background border-border/50 focus:border-primary focus:ring-primary/20" 
                          data-testid="input-register-confirm"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="text-[10px] text-muted-foreground text-center">
                Bằng cách đăng ký, bạn đồng ý với <a href="#" className="text-primary hover:underline">Điều khoản & Điều kiện</a> của VIE999
              </div>
              
              <Button type="submit" className="w-full h-12 text-md font-bold bg-primary text-black hover:bg-primary/90" data-testid="button-submit-register">
                ĐĂNG KÝ NGAY
              </Button>
            </form>
          </Form>
        </div>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Đăng nhập
          </Link>
        </div>
      </div>
    </Layout>
  );
}
