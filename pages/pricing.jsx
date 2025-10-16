"use client";

import React from "react";

const packages = [
  {
    name: "Entry",
    price: "R5,000 – R7,000",
    features: [
      "3-5 page website",
      "Lite logo or 'T' symbol",
      "Basic branding",
      "Google Business Profile setup",
      "1 social media profile setup",
      "Mobile responsive",
      "Minimal on-page SEO",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: "R12,000 – R18,000",
    features: [
      "6-10 page website",
      "Custom branding + logo + style guide",
      "Social media setup + 2 posts/week",
      "SEO optimization (on-page + local)",
      "Light content creation (photo/video)",
      "Google Business Profile fully configured",
      "Digital marketing strategy session",
    ],
    cta: "Talk to Us",
  },
  {
    name: "Premium",
    price: "R35,000 – R50,000",
    features: [
      "10+ page or eCommerce site",
      "Full branding identity + collateral",
      "Professional content creation (photo/video)",
      "Ongoing social media management + paid ads",
      "Advanced SEO & monthly strategy",
      "All support included",
      "Flexible monthly payments available",
    ],
    cta: "Book Strategy Call",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Fully bespoke solution",
      "Dedicated team",
      "Advanced integrations",
      "Tailored marketing & strategy",
      "Priority support",
    ],
    cta: "Schedule Consultation",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-16 lg:px-32">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00B8D4] via-[#00ACC1] to-[#00B8D4]">
          Takouri Co. Pricing
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Flexible packages designed to grow with your brand. Pick a range that fits your needs or contact us for a fully custom solution.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between transform transition-transform hover:scale-105 hover:shadow-2xl"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h2>
              <p className="text-gray-500 mb-4 font-medium">{pkg.price}</p>
              <ul className="mb-6 space-y-2 text-gray-600">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B8D4] via-[#00ACC1] to-[#00B8D4] font-bold">
                      •
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-auto py-2 rounded-xl font-semibold bg-gradient-to-r from-[#00B8D4] via-[#00ACC1] to-[#00B8D4] text-white hover:brightness-110 transition-all"
              onClick={() => alert(`${pkg.name} package: CTA clicked`)}
            >
              {pkg.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="max-w-3xl mx-auto mt-16 text-center text-gray-600">
        <p>
          All packages can be tailored to your brand’s unique needs. Not sure which package is right?{" "}
          <a href="/contact" className="text-[#00B8D4] font-semibold hover:underline">
            Contact us
          </a>{" "}
          and let’s craft the perfect solution.
        </p>
      </div>
    </div>
  );
}
