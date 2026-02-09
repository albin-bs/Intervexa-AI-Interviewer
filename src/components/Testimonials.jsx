const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "Mockmate gave me realistic interview practice and feedback—it boosted my confidence for my real interviews!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Software Engineer",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "I landed my dream job thanks to Mockmate! The AI feedback made me aware of my strengths and blind spots before the actual interview.",
  },
  {
    name: "Emily Watson",
    role: "CTO",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200",
    content:
      "We've recommended Mockmate to our entire graduate cohort for interview prep. It's like having a personal coach for every candidate.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16">
          {/* Left side - Header */}
          <div className="lg:w-1/2 w-full text-center lg:text-left">
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Mockmate interview success stories
            </h2>
            <p className="text-gray-400 text-base text-xl sm:text-lg max-w-2xl mx-auto">
              Discover how people are landing jobs and boosting interview skills with Mockmate’s AI-powered coaching and feedback.
            </p>
          </div>

          {/* Right side - testimonials */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-6 sm:space-y-8">
              {testimonials.map((testimonial, key) => (
                <div
                  key={key}
                  className="bg-slate-900/50 p-4 sm:p-6 backdrop-blur-sm border border-slate-800 rounded-xl sm:rounded-2xl"
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold 
                        bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text 
                        text-transparent"
                      >
                        "
                      </div>
                    </div>

                    <div className="flex-grow">
                      <p className="text-white text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-white text-sm sm:text-base">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
