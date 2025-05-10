"use client";
import { motion } from "framer-motion";
import { Check, Zap, Star, BadgeCheck } from "lucide-react";
import Link from "next/link";

const Princing = () => {
  return (
    <section id="pricing" className="py-16 bg-white sm:py-24 lg:py-32">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Comece grátis, cresça com planos acessíveis
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            A plataforma é gratuita para começar. Expanda sua visibilidade e oportunidades com planos a partir de $1.
          </p>
        </div>

        {/* Tabs para alternar entre Clientes e Freelancers */}
        <div className="flex justify-center mt-12">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button className="px-4 py-2 text-sm font-medium rounded-md bg-white shadow-sm text-gray-900">
              Para Freelancers
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-md text-gray-500 hover:text-gray-900">
              Para Clientes
            </button>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            {
              name: "Grátis",
              price: "$0",
              description: "Perfeito para começar na plataforma",
              icon: <Star className="w-6 h-6 text-yellow-500" />,
              features: [
                "5 propostas/mês",
                "2 projetos grátis (cliente)",
                "Perfil público básico",
                "Avaliações de clientes",
                "Suporte comunitário"
              ],
              cta: "Começar agora",
              popular: false
            },
            {
              name: "Freelancer Pro",
              price: "$6",
              period: "/mês",
              description: "Para freelancers que querem se destacar",
              icon: <Zap className="w-6 h-6 text-blue-500" />,
              features: [
                "Propostas ilimitadas",
                "Destaque nas pesquisas",
                "Prioridade em matches",
                "Badge 'Pro' no perfil",
                "Estatísticas avançadas",
                "Suporte prioritário"
              ],
              cta: "Teste grátis por 7 dias",
              popular: true
            },
            {
              name: "Cliente Plus",
              price: "$3",
              period: "/mês",
              description: "Para clientes com múltiplos projetos",
              icon: <BadgeCheck className="w-6 h-6 text-purple-500" />,
              features: [
                "Até 10 projetos/mês",
                "+50% de visibilidade",
                "Estatísticas detalhadas",
                "Destaque por 7 dias (1 grátis/mês)",
                "Filtros avançados de busca",
                "Suporte dedicado"
              ],
              cta: "Experimentar",
              popular: false
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border ${plan.popular ? 'border-blue-500 shadow-xl' : 'border-gray-200'} hover:shadow-lg transition-shadow`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center">
                  <Zap className="w-3 h-3 mr-1" />
                  MAIS POPULAR
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center mb-2">
                  {plan.icon}
                  <h3 className="text-xl font-bold text-gray-900 ml-2">{plan.name}</h3>
                </div>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && <span className="ml-1 text-gray-600">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className={`block w-full py-3 px-6 text-center font-medium rounded-lg transition ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Seção de preços adicionais */}
        <div className="mt-16 max-w-3xl mx-auto bg-gray-50 rounded-xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Serviços adicionais</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Selo &quot; Verificado &quot;
              </h4>
              <p className="text-gray-600 mt-1">$5 (único)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Projeto extra
              </h4>
              <p className="text-gray-600 mt-1">$1 por projeto</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Destaque de projeto
              </h4>
              <p className="text-gray-600 mt-1">$3 por 7 dias</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Proposta extra
              </h4>
              <p className="text-gray-600 mt-1">$4/mês</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Princing;