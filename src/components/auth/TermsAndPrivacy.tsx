import Link from "next/link";

export default function TermsAndPrivacy() {
  return (
    <p className="mt-4 text-center text-sm text-gray-600">
      Ao se registrar ou fazer login, você concorda com os{" "}
      <Link href="/terms" className="font-medium hover:underline text-blue-500 hover:text-blue-600">
        Termos de Uso
      </Link>{" "}
      e{" "}
      <Link href="/privacy" className="font-medium hover:underline text-blue-500 hover:text-blue-600">
        Política de Privacidade
      </Link>{" "}
      da ReadyDoer.
    </p>
  );
}