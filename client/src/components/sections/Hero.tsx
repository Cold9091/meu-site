import { motion } from "framer-motion";
import { blurIn, fadeIn, parallaxScroll, revealText, slideUp, staggerContainer } from "@/lib/animations";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useLanguage } from "@/hooks/use-language";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const [countStarted, setCountStarted] = useState(false);
  const { t } = useLanguage();

  // Efeito de reveal em caracteres
  useEffect(() => {
    if (textRef.current) {
      const text = textRef.current.innerText;
      textRef.current.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.transitionDelay = `${i * 0.02}s`;
        textRef.current?.appendChild(span);
      });

      setTimeout(() => {
        textRef.current?.classList.add('visible');
      }, 100);
    }
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-dark-200 overflow-hidden pt-24 md:pt-32">
      {/* Elementos decorativos com estilo Apple */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-96 h-96 bg-gray-200 dark:bg-gray-900 rounded-full opacity-30 blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3, x: [0, 10, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 -left-20 w-80 h-80 bg-gray-300 dark:bg-gray-800 rounded-full opacity-20 blur-3xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2, x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="overflow-hidden mb-4">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white leading-tight"
              variants={slideUp}
            >
              <span className="text-gradient">{t('hero.title.1')}</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-black dark:text-white leading-tight"
              variants={slideUp}
            >
              {t('hero.title.2')}
            </motion.h1>
          </div>
          <motion.p 
            className="text-lg md:text-xl max-w-3xl text-gray-600 dark:text-gray-300 mb-12"
            variants={blurIn}
          >
            {t('hero.description')}
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-5"
            variants={fadeIn}
            custom={0.4}
          >
            <motion.a 
              href="#servicos" 
              className="apple-button micro-button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
            >
              {t('hero.cta.primary')}
            </motion.a>
            <motion.a 
              href="#contato" 
              className="subtle-button micro-button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" }}
            >
              {t('hero.cta.secondary')}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Stats com estilo Apple */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          initial="hidden"
          whileInView="visible"
          onViewportEnter={() => setCountStarted(true)}
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {[
            { value: 120, suffix: "+", label: t('hero.stats.clients') },
            { value: 200, suffix: "+", label: t('hero.stats.projects') },
            { value: 1, suffix: "M+", label: t('hero.stats.engagement') },
            { value: 98, suffix: "%", label: t('hero.stats.satisfaction') },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 glass-card micro-card"
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-2 text-black dark:text-white">
                {countStarted && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator="."
                    decimal=","
                    suffix={stat.suffix}
                    delay={index * 0.2}
                  />
                )}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Texto com animação por caractere */}
        <div className="mt-32 mb-20 text-center">
          <p className="char-animation text-lg md:text-xl text-gray-600 dark:text-gray-300" ref={textRef}>
            {t('hero.since')}
          </p>
        </div>
      </div>

      {/* Indicator de scroll */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center pt-2">
          <motion.div 
            className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
