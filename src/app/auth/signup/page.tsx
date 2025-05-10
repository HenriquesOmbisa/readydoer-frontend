"use client";

import { useState, useEffect } from "react";
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

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres." }),
  code: z.string().optional(),
});

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState({
    form: false,
    google: false,
    github: false,
    linkedin: false,
  });
  const [emailSent, setEmailSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [codeExpired, setCodeExpired] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", code: "" }
  });

  // Efeito para o timer decrescente
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (emailSent && countdown === 0) {
      setCodeExpired(true);
    }
    
    return () => clearTimeout(timer);
  }, [countdown, emailSent]);

  const handleSendVerificationCode = () => {
    const email = form.getValues("email");
    if (email) {
      // Simular envio de código
      console.log("Código enviado para:", email);
      setEmailSent(true);
      setCountdown(60); // 60 segundos
      setCodeExpired(false);
      
      // Resetar o campo de código
      form.setValue("code", "");
    }
  };

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    if (!emailSent) {
      handleSendVerificationCode();
      return;
    }
    
    // Verificar se o código expirou
    if (codeExpired) {
      form.setError("code", {
        type: "manual",
        message: "O código expirou. Por favor, solicite um novo."
      });
      return;
    }
    
    // Verificar se o código foi preenchido
    if (!data.code) {
      form.setError("code", {
        type: "manual",
        message: "Por favor, insira o código de verificação."
      });
      return;
    }

    setIsLoading({ ...isLoading, form: true });
    console.log("Conta criada:", data);
    // Implementar lógica de signup
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
          <h2 className="mt-2 md:mt-6 text-2xl md:text-3xl font-bold text-gray-900">Crie conta</h2>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        {...field}
                        disabled={isLoading.form || emailSent}
                        className="w-full h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        disabled={isLoading.form || emailSent}
                        className="w-full h-11 text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {emailSent && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Verificação</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="123456"
                            {...field}
                            disabled={isLoading.form || codeExpired}
                            className="w-full h-11 text-base"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleSendVerificationCode}
                          disabled={isLoading.form || countdown > 0}
                          className="h-11"
                        >
                          {countdown > 0 ? `Reenviar (${countdown}s)` : "Reenviar"}
                        </Button>
                      </div>
                      <FormMessage />
                      {countdown > 0 && !codeExpired && (
                        <p className="text-sm text-gray-500 mt-1">
                          O código expirará em {countdown} segundos
                        </p>
                      )}
                      {codeExpired && (
                        <p className="text-sm text-red-500 mt-1">
                          O código expirou. Por favor, solicite um novo.
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              )}

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
                {emailSent ? "Criar Conta" : "Enviar Código"}
              </Button>
            </form>
          </Form>

          <SocialButtons isLoading={isLoading} setIsLoading={setIsLoading} />

          <TermsAndPrivacy />
        </div>
        <p className="mt-0 text-center text-base text-gray-600">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="font-medium hover:underline text-blue-500 hover:text-blue-600">
            Faça login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}