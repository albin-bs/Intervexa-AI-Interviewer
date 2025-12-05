import { motion } from "framer-motion";
import { Quote, Star, Verified } from "lucide-react";
import SectionHeader from "./common/SectionHeader";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "Google",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Mockmate gave me realistic interview practice and feedback—it boosted my confidence for my real interviews!",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    company: "Meta",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "I landed my dream job thanks to Mockmate! The AI feedback made me aware of my strengths and blind spots before the actual interview.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Hiring Manager",
    company: "Amazon",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We've recommended Mockmate to our entire graduate cohort for interview prep. It's like having a personal coach for every candidate.",
    rating: 5,
  },
];

export default function Testimonials() {
  const main = testimonials[1]; // highlight Marcus

  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 overflow-hidden isolate bg-slate-950 sm:py-32 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute rounded-full top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl" />
        <div className="absolute rounded-full top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 blur-3xl" />
      </div>

      {/* Decorative skewed background */}
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-950/50 shadow-xl ring-1 shadow-blue-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Success Stories"
            title="Trusted by candidates worldwide"
            description="Discover how people are landing jobs and boosting interview skills with MockMateAI's AI-powered coaching."
            align="center"
          />
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-16"
        >
          <div className="relative p-8 border shadow-2xl rounded-3xl border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-sm sm:p-12">
            {/* Quote icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              className="absolute -top-4 left-8"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                <Quote className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(main.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300 }}
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl font-semibold leading-relaxed text-center sm:text-2xl text-white/95">
              <p>"{main.content}"</p>
            </blockquote>

            {/* Author */}
            <figcaption className="flex flex-col items-center mt-8">
              <div className="relative">
                <img
                  src={main.image}
                  alt={main.name}
                  className="object-cover w-16 h-16 rounded-full ring-2 ring-blue-500/30"
                />
                <div className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full -bottom-1 -right-1">
                  <Verified className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-lg font-bold text-white">{main.name}</div>
                <div className="text-sm text-slate-400">
                  {main.role} at <span className="text-blue-400">{main.company}</span>
                </div>
              </div>
            </figcaption>
          </div>
        </motion.div>

        {/* Secondary Testimonials */}
        <div className="grid gap-6 mt-12 sm:grid-cols-2">
          {testimonials
            .filter((t) => t !== main)
            .map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative p-6 transition-all border rounded-2xl border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 group"
              >
                {/* Small quote icon */}
                <div className="absolute flex items-center justify-center w-8 h-8 border rounded-full -top-2 -left-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30">
                  <Quote className="w-4 h-4 text-blue-400" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-4 text-sm leading-relaxed text-slate-200">
                  "{t.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="relative flex-shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="object-cover w-10 h-10 transition-all rounded-full ring-2 ring-slate-800 group-hover:ring-blue-500/30"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400">
                      {t.role} at <span className="text-blue-400">{t.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.9/5 average rating</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-2">
            <Verified className="w-4 h-4 text-blue-400" />
            <span>10,000+ verified reviews</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-600" />
          <div className="flex items-center gap-2">
            <Quote className="w-4 h-4 text-indigo-400" />
            <span>Trusted by top companies</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
