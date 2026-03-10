type Feature = {
  id?: string;
  title: string;
  description: string;
};

export default function Features({
  features = defaultFeatures,
  className = "",
}: {
  features?: Feature[];
  className?: string;
}) {
  return (
    <section id="features" className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">What TableTap does</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Easy to access building blocks for restaurant digital experiences —
            ordering, table management, and analytics.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <FeatureCard key={f.id ?? idx} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: Feature) {
  return (
    <article className="flex items-start space-x-4 p-6 bg-[#bebea5] dark:bg-slate-800/60 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </article>
  );
}

const defaultFeatures: Feature[] = [
  {
    id: "fast-order",
    title: "Fast mobile ordering",
    description:
      "Customers can order from their table with a tap — reduces wait time and speeds up turnover.",
  },
  {
    id: "menu-management",
    title: "Easy menu management",
    description:
      "Create and update menus in real time; categories, add-ons and availability handled cleanly.",
  },
  {
    id: "analytics",
    title: "Sales & performance analytics",
    description:
      "Track orders, peak hours, and item performance with straightforward dashboards.",
  },
  {
    id: "offline-first",
    title: "Offline-first reliability",
    description:
      "Works even with flaky connections — syncs when connectivity returns.",
  },
  {
    id: "open-source",
    title: "Open-source & extensible",
    description:
      "Integrate or extend any part of the stack — everything is modular and well-documented.",
  },
  {
    id: "secure",
    title: "Secure and GDPR-ready",
    description:
      "Authentication, role-based access, and privacy-aware defaults for production use.",
  },
];