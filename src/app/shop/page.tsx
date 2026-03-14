import { motion } from "framer-motion";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white px-10 py-24">

      <h1 className="text-4xl mb-16 tracking-wide">
        Season I — Collection
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

        <div className="space-y-4">
          <div className="bg-neutral-900 h-[400px] rounded-xl"></div>
          <h2 className="text-lg">LUC-01 Structured Hoodie</h2>
          <p className="text-neutral-400">$180</p>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-900 h-[400px] rounded-xl"></div>
          <h2 className="text-lg">LUC-02 Precision Tee</h2>
          <p className="text-neutral-400">$85</p>
        </div>

        <div className="space-y-4">
          <div className="bg-neutral-900 h-[400px] rounded-xl"></div>
          <h2 className="text-lg">LUC-03 Utility Pants</h2>
          <p className="text-neutral-400">$220</p>
        </div>

      </div>

    </div>
  );
}
