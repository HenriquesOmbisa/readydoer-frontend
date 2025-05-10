import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SocialButtonsProps {
  isLoading: {
    form: boolean;
    google: boolean;
    github: boolean;
    linkedin: boolean;
  };
  setIsLoading: (loading: {
    form: boolean;
    google: boolean;
    github: boolean;
    linkedin: boolean;
  }) => void;
}

export default function SocialButtons({ isLoading, setIsLoading }: SocialButtonsProps) {

  const handleSocialLogin = (provider: string) => {
    setIsLoading({ ...isLoading, [provider]: true });
    console.log(`Login com ${provider}`);
    // Implemente a lógica de autenticação aqui
    setTimeout(() => {
      setIsLoading({ ...isLoading, [provider]: false });
    }, 1500);
  };

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Ou continue com</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <Button
          variant="outline"
          type="button"
          className="rounded-full p-3 h-12 w-12 cursor-pointer"
          onClick={() => handleSocialLogin("google")}
          disabled={isLoading.linkedin}
        >
          {isLoading.google ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
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
          ) : (
            <Image
              src="/company-logos/google-logo.svg"
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-6"
            />
        )}
        </Button>

        <Button
          variant="outline"
          type="button"
          className="rounded-full p-3 h-12 w-12 cursor-pointer"
          onClick={() => handleSocialLogin("github")}
          disabled={isLoading.github}
        >
           {isLoading.github ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
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
          ) : (
            <Image
              src="/company-logos/github-logo.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          )}
        </Button>

        <Button
          variant="outline"
          type="button"
          className="rounded-full p-3 h-12 w-12 cursor-pointer"
          onClick={() => handleSocialLogin("linkedin")}
          disabled={isLoading.linkedin}
        > {isLoading.linkedin ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
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
        ) : (
            <Image
              src="/company-logos/linkedin-circle-logo.svg"
              alt="LinkedIn"
              width={24}
              height={24}
              className="h-6 w-6"
            />
        )}
        </Button>
      </div>
    </div>
  );
}



/** 
 * 
 Podes implementar um página de onboarding para o utilizador, onde ele pode escolher as suas preferências, como por exemplo:
 - Como quer usar a plataforma (como freelancer, como empresa, cliente, etc)
 Se for freelancer, pode escolher as suas categorias e subcategorias de actuação, um menu de categorias que expande as categorias e ele pode escolher as subcategorias. As categorias serão selecionadas intrinsecamente, ou seja, se o utilizador escolher as subcategorias "Web Development" e "Market Research & Analytics" automaticamente ele terá as categorias "Technology & Development" e "Digital Marketing & Sales" selecionadas. nas quais essas subcategorias estão inseridas.
 Após isso, o utilizador pode escolher as suas skills que serão sugeridas com base nas subcategorias que ele escolheu.
 O utilizador pode escolher a sua localização actual, país, cidade.
 O utilizador pode escolher a sua disponibilidade, se está disponível para trabalhar full-time, part-time, ou apenas em projectos pontuais.
 O utilizador pode escolher o seu nível de experiência, se é iniciante, intermédio ou avançado.
 O utilizador pode selecionar seu idioma nativo, e os idiomas que fala fluentemente, e os idiomas que fala com alguma dificuldade.
 O utilizador pode escolher a sua moeda preferida, e o seu valor/hora.
 O utilizador pode escolher a sua forma de pagamento preferida, se é por cartão de crédito, paypal, transferência bancária ou criptomoeda.
 
 Se o utilizador for uma empresa, ele pode escolher as suas categorias e subcategorias de actuação, um menu de categorias que expande as categorias e ele pode escolher as subcategorias. As categorias serão selecionadas intrinsecamente, ou seja, se o utilizador escolher as subcategorias "Management Consulting" e "Legal & Compliance" automaticamente ele terá a categoria "Business & Consulting" selecionada. nas quais essas subcategorias estão inseridas.
 O utilizador pode escolher a sua localização actual, país, cidade.
  O utilizador pode selecionar seu idioma nativo, e os idiomas que falam fluentemente, e os idiomas que falam com alguma dificuldade.
 O utilizador pode escolher se cobra por hora, por projecto (por serviço), ou por mês.
 se o utilizador escolher cobrar por hora, ele pode escolher a sua moeda preferida, e o valor/hora.
 O utilizador pode escolher a sua moeda preferida, e sua forma de pagamento preferida, se é por cartão de crédito, paypal, transferência bancária ou criptomoeda
 
 Se o utilizador for um cliente, ele pode escolher sua localização actual, país, cidade.
 O utilizador pode selecionar seu idioma nativo, e os idiomas que fala fluentemente, e os idiomas que fala com alguma dificuldade.
 O utilizador pode escolher a sua moeda preferida, e sua forma de pagamento preferida, se é por cartão de crédito, paypal, transferência bancária ou criptomoeda.

 OBS: Eu tenho um json das categorias com sub categorias, e as skills que estão inseridas em cada subcategoria, esse json é o que vai ser utilizado para preencher as categorias e subcategorias, e as skills. E eut tenho também um json com os países, e as cidades. Esses jsons estão na pasta data do projecto.
 *
 * 
 * 
 * 
 * 
 */