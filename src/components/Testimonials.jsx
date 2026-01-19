import { memo, useMemo } from "react";
import { m } from "framer-motion";
import { Quote, Star, Verified } from "lucide-react";
import SectionHeader from "./common/SectionHeader";

// ✅ Move testimonials data outside component
const TESTIMONIALS_DATA = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

const TRUST_BADGES = [
  { icon: Star, text: "4.9/5 average rating", color: "text-yellow-400 fill-yellow-400" },
  { icon: Verified, text: "10,000+ verified reviews", color: "text-blue-400" },
  { icon: Quote, text: "Trusted by top companies", color: "text-indigo-400" },
];

// ✅ Memoize BackgroundDecoration
const BackgroundDecoration = memo(function BackgroundDecoration() {
  return (
    <>
      <div className="absolute inset-0 -z-10">
        <div className="absolute rounded-full top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl" />
        <div className="absolute rounded-full top-1/2 right-1/4 w-96 h-96 bg-indigo-500/10 blur-3xl" />
      </div>
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-950/50 shadow-xl ring-1 shadow-blue-500/5 ring-white/5 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
    </>
  );
});

// ✅ Memoize StarRating component
const StarRating = memo(function StarRating({ rating, size = "w-5 h-5", delay = 0.4 }) {
  return (
    <div className="flex gap-1">
      {[...Array(rating)].map((_, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + i * 0.1, type: "spring", stiffness: 300 }}
        >
          <Star className={`${size} text-yellow-400 fill-yellow-400`} />
        </m.div>
      ))}
    </div>
  );
});

// ✅ Memoize TestimonialAuthor component
const TestimonialAuthor = memo(function TestimonialAuthor({ 
  name, 
  role, 
  company, 
  image, 
  size = "large",
  showVerified = false 
}) {
  const imageSize = size === "large" ? "w-16 h-16" : "w-10 h-10";
  const verifiedSize = size === "large" ? "w-6 h-6" : "w-5 h-5";
  const verifiedIconSize = size === "large" ? "w-4 h-4" : "w-3 h-3";

  return (
    <div className={size === "large" ? "flex flex-col items-center" : "flex items-center gap-3"}>
      <div className="relative flex-shrink-0">
        <img
          src={image}
          alt={name}
          className={`${imageSize} object-cover rounded-full ring-2 ring-blue-500/30`}
          loading="lazy"
        />
        {showVerified && (
          <div className={`absolute flex items-center justify-center ${verifiedSize} bg-blue-500 rounded-full -bottom-1 -right-1`}>
            <Verified className={`${verifiedIconSize} text-white`} />
          </div>
        )}
      </div>
      <div className={size === "large" ? "mt-4 text-center" : "flex-1 min-w-0"}>
        <div className={size === "large" ? "text-lg font-bold text-white" : "text-sm font-semibold text-white"}>
          {name}
        </div>
        <div className={size === "large" ? "text-sm text-slate-400" : "text-xs text-slate-400"}>
          {role} at <span className="text-blue-400">{company}</span>
        </div>
      </div>
    </div>
  );
});

// ✅ Memoize FeaturedTestimonial component
const FeaturedTestimonial = memo(function FeaturedTestimonial({ testimonial }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-16"
    >
      <div className="relative p-8 border shadow-2xl rounded-3xl border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-sm sm:p-12">
        {/* Quote icon */}
        <m.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="absolute -top-4 left-8"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
            <Quote className="w-6 h-6 text-white" />
          </div>
        </m.div>

        {/* Stars */}
        <div className="flex justify-center mb-6">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote */}
        <blockquote className="text-xl font-semibold leading-relaxed text-center sm:text-2xl text-white/95">
          <p>"{testimonial.content}"</p>
        </blockquote>

        {/* Author */}
        <figcaption className="mt-8">
          <TestimonialAuthor
            name={testimonial.name}
            role={testimonial.role}
            company={testimonial.company}
            image={testimonial.image}
            size="large"
            showVerified={true}
          />
        </figcaption>
      </div>
    </m.div>
  );
});

// ✅ Memoize SecondaryTestimonialCard component
const SecondaryTestimonialCard = memo(function SecondaryTestimonialCard({ 
  testimonial, 
  index 
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative p-6 transition-all border rounded-2xl border-slate-800 bg-slate-900/60 backdrop-blur-sm hover:border-slate-700 group"
    >
      {/* Small quote icon */}
      <div className="absolute flex items-center justify-center w-8 h-8 border rounded-full -top-2 -left-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30">
        <Quote className="w-4 h-4 text-blue-400" />
      </div>

      {/* Stars */}
      <div className="mb-4">
        <StarRating rating={testimonial.rating} size="w-4 h-4" delay={0} />
      </div>

      {/* Content */}
      <p className="mb-4 text-sm leading-relaxed text-slate-200">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="pt-4 border-t border-slate-800">
        <TestimonialAuthor
          name={testimonial.name}
          role={testimonial.role}
          company={testimonial.company}
          image={testimonial.image}
          size="small"
        />
      </div>
    </m.div>
  );
});

// ✅ Memoize TrustBadge component
const TrustBadge = memo(function TrustBadge({ icon: Icon, text, color }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span>{text}</span>
    </div>
  );
});

// ✅ Main Testimonials component
const Testimonials = memo(function Testimonials() {
  return null; //Disable this when needed
  // ✅ Memoize featured and secondary testimonials
  const { featured, secondary } = useMemo(() => {
    const featured = TESTIMONIALS_DATA[1]; // Marcus Rodriguez
    const secondary = TESTIMONIALS_DATA.filter(t => t.id !== featured.id);
    return { featured, secondary };
  }, []);

  return (
    <section
      id="testimonials"
      className="relative px-6 py-24 overflow-hidden isolate bg-slate-950 sm:py-32 lg:px-8"
    >
      <BackgroundDecoration />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <m.div
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
        </m.div>

        {/* Featured Testimonial */}
        <FeaturedTestimonial testimonial={featured} />

        {/* Secondary Testimonials */}
        <div className="grid gap-6 mt-12 sm:grid-cols-2">
          {secondary.map((testimonial, i) => (
            <SecondaryTestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>

        {/* Trust badges */}
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-16 text-sm text-slate-400"
        >
          {TRUST_BADGES.map((badge, i) => (
            <div key={i} className="flex items-center gap-6">
              <TrustBadge icon={badge.icon} text={badge.text} color={badge.color} />
              {i < TRUST_BADGES.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-slate-600" />
              )}
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
});

export default Testimonials;
