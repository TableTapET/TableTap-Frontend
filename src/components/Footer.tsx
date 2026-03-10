import Link from "next/link";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t border-gray-200 dark:border-slate-700 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="sm:flex sm:justify-between sm:items-start gap-10">
          {/* brand + short */}
          <div className="flex-1 min-w-0">

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 max-w-md">
              Open-source tools to help restaurants digitize ordering, manage tables,
              and understand performance — built by the TableTapET community. {/**rework paragraph here! */}
            </p>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <Link href="#features">Features</Link>
                </li>
                <li>
                  <Link href="#product-showcase">Product</Link>
                </li>
                <li>
                  <Link href="#pricing">Pricing</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <a href="https://github.com/TableTapET" target="_blank" rel="noreferrer">GitHub</a>
                </li>
                <li>
                  <Link href="/docs">Docs</Link>
                </li>
                <li>
                  <Link href="/changelog">Changelog</Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold">Community</h4>
              <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li><a href="/contribute">Contribute</a></li>
                <li><a href="/roadmap">Roadmap</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} TableTap</p>

          <div className="flex items-center space-x-4">
            <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-300">Privacy</a>
            <a href="/terms" className="text-sm text-gray-600 dark:text-gray-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}