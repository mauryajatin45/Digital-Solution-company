// components/WhyPartner.js
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const points = [
  "Proven track record across 15+ industries.",
  "Multidisciplinary team with global experience.",
  "Transparent communication and reporting.",
  "ROI focused approach with measurable outcomes.",
  "Commitment to long term client success.",
];

export default function WhyPartner() {
  return (
    <section className="bg-black text-white py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12"
        >
          Why Partner with <span className="text-gray-300">Vertex Global</span>
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-2">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
              <p className="text-lg leading-relaxed text-gray-300">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
