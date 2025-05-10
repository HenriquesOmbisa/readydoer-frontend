"use client";

import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Handshake } from "lucide-react";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
});

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" }
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof forgotPasswordSchema>) {
    console.log("Email para redefinição:", data.email);
    // Implementar lógica de envio
    await new Promise(resolve => setTimeout(resolve, 1000));
    setEmailSent(true);
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
          <h2 className="mt-2 md:mt-6 text-2xl md:text-3xl font-bold text-gray-900">
            {emailSent ? "Verifique seu e-mail" : "Redefinir senha"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {emailSent
              ? "Enviamos um e-mail com instruções para redefinir sua senha."
              : "Digite seu e-mail para receber um link de redefinição."}
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!emailSent ? (
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
                          disabled={isLoading}
                          className="w-full h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading && (
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
                  Enviar Link
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Se você não receber o e-mail em alguns minutos, verifique sua pasta de spam.
              </p>
              <Button
                onClick={() => setEmailSent(false)}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Tentar outro e-mail
              </Button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-blue-500 hover:text-blue-600"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}