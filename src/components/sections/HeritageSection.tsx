import { motion } from "framer-motion";

export default function HeritageSection() {
  return (
    <section className="w-full py-20 bg-[#FAF8F4]">
      <div className="text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.3em] uppercase text-[#B8935A] font-dm"
        >
          TIMELESS DESIGN
        </motion.p>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-cormorant text-[56px] text-[#1A1918] leading-[1.1] mt-4"
        >
          The Heritage Series
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="w-12 h-[0.5px] bg-[#B8935A] mx-auto mt-5"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="relative flex items-center justify-center">
          {/* Circular container */}
          <div className="relative w-[400px] h-[400px] rounded-full bg-[#EDE8DF] flex items-center justify-center">
            <img
              src="/images/img01.png"
              alt="Hand holding heritage watch"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Feature labels */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="font-dm text-[14px] uppercase tracking-[0.2em] text-[#B8935A] mb-2">
              PRECISION CHRONOGRAPH
            </p>
            <div className="w-12 h-[0.5px] bg-[#B8935A] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="font-dm text-[14px] uppercase tracking-[0.2em] text-[#B8935A] mb-2">
              HERITAGE CASE DESIGN
            </p>
            <div className="w-12 h-[0.5px] bg-[#B8935A] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-dm text-[14px] uppercase tracking-[0.2em] text-[#B8935A] mb-2">
              SUN-RAY DIAL FINISH
            </p>
            <div className="w-12 h-[0.5px] bg-[#B8935A] mx-auto" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
