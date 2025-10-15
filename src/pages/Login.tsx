import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <div className="login-header flex justify-between p-4 fixed top-0 w-full">
      <h1 className="logo">
        <span className="font-bold text-2xl"> Editor </span>
        <span className="text-background bg-foreground font-bold text-2xl px-1 py-0.5">
          AI
        </span>
      </h1>
      <div className="mode-toggle">
        <ModeToggle />
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate()

  const FormSchema = z.object({
    username: z.string().min(2, {
      message: "用户名最少两个字符",
    }),
    password: z
      .string()
      .min(6, {
        message: "密码长度最少6位",
      })
      .max(12, {
        message: "密码长度最多12位",
      }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const params = data
    navigate('/worker')
  };


  return (
    <div className="login-container h-dvh flex flex-col">
      <Header />
      <div className="content flex justify-center items-center flex-1 flex-col w-1/4 mx-auto">
        <h1 className="font-bold">欢迎使用</h1>
        <p className="text-sm text-gray-500 mt-2 ">使用 GitHub 或账号登录</p>
        <Button variant="outline" className="w-full mt-4">
          <Github />
          使用GitHub登陆
        </Button>
        <Separator className="my-8 relative">
          <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gray-100 text-[12px] px-1 py-0.5 rounded-[2px] text-gray-500 dark:text-white dark:bg-[#333] ">
            使用其他方式
          </div>
        </Separator>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入用户名" {...field} />
                  </FormControl>
                  <FormDescription>测试账号: admin</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500">密码</FormLabel>
                  <FormControl>
                    <Input placeholder="请输入用户名" {...field} type="password"/>
                  </FormControl>
                  <FormDescription>测试密码: admin123</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              立即登陆
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
