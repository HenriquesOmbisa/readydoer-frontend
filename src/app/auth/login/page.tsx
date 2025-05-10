"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import SocialButtons from "@/components/auth/SocialButtons";
import TermsAndPrivacy from "@/components/auth/TermsAndPrivacy";
import { Handshake } from "lucide-react";
import { useState } from "react";

const signInSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState({
      form: false,
      google: false,
      github: false,
      linkedin: false,
    });
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" }
  });


  async function onSubmit(data: z.infer<typeof signInSchema>) {
    setIsLoading({ ...isLoading, form: true });
    console.log(data);
    // Implementar lógica de login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading({ ...isLoading, form: false });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-2 md:space-y-4"
      >
        <Link href={"/"} className="flex items-center gap-3 select-none mx-auto w-max">
          <div className="flex items-center gap-3 select-none mx-auto w-max">
            <div className="relative w-10 h-10 md:w-25 md:h-25">
              <div className="hexagon bg-gradient-to-br from-blue-500 to-indigo-700">
                <Handshake className="w-6 h-6 md:w-15 md:h-15 text-white" strokeWidth={2.2} />
              </div>
            </div>
            <span className="text-2xl md:text-5xl font-bold text-gray-800">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600"></span>Ready<span className="font-light">Doer</span>
            </span>
          </div>
        </Link>

        <style jsx>{`
          .hexagon {
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>

        <div className="text-center">
          <h2 className="mt-2 md:mt-6 text-2xl md:text-3xl font-bold text-gray-900">Faça login</h2>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        {...field}
                        disabled={isLoading.form}
                        className="w-full h-11 text-base"
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••"
                        {...field}
                        disabled={isLoading.form}
                        className="w-full h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-500 hover:text-blue-600"
                >
                  Esqueceu sua senha?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base bg-blue-500 hover:bg-blue-600 cursor-pointer"
                disabled={isLoading.form}
              >
                {isLoading.form && (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                Entrar
              </Button>
            </form>
          </Form>

          <SocialButtons isLoading={isLoading} setIsLoading={setIsLoading} />

          <TermsAndPrivacy />
        </div>
        <p className="mt-0 text-center text-base text-gray-600">
            Não tem uma conta ainda?{" "}
            <Link href="/auth/signup" className="font-medium text-blue-500 hover:text-blue-600">
              Registre-se
            </Link>
          </p>
      </motion.div>
    </div>
  );
}