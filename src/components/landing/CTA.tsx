import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 sm:py-24 lg:py-32">
      <div className="container px-6 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Ready to transform your workflow?</h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-blue-100">Join thousands of professionals building the future of work</p>
          <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
            <Link
              href="/auth/signup"
              className="px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Get Started for Free
            </Link>
            <Link
              href="/hire" 
              className="px-8 py-3 text-lg font-medium text-white border-2 border-white rounded-lg hover:bg-white/10 transition"
            >
              Browse Freelancers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;