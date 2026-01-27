import { memo, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  BarChart3,
  Code2,
} from "lucide-react";

/* ---------------- FEATURES DATA ---------------- */

const FEATURES_DATA = [
  {
    id: "demo",
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI INTERVIEW SIMULATION",
    heading: "Mobile friendly AI practice",
    description: "Practice with realistic, adaptive interview questions tailored by Mockmate's AI.",
    ctaTo: "/interview",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop",
    accentColor: "#5b8cf6",
  },
  {
    id: "dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "INSTANT AI FEEDBACK",
    heading: "Performance you can measure",
    description: "Get actionable feedback on clarity, structure, and communication.",
    ctaTo: "/dashboard",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    accentColor: "#9b7cf6",
  },
  {
    id: "code",
    icon: <Code2 className="w-6 h-6" />,
    title: "LIVE CODE PRACTICE",
    heading: "Practice coding in your browser",
    description: "Write and test solutions instantly using MockMate's built-in editor.",
    ctaTo: "/code-demo",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop",
    accentColor: "#ff8844",
  },
];

/* ---------------- SPOTLIGHT EFFECT CLASS ---------------- */

class Spotlight {
  constructor(containerElement) {
    this.container = containerElement;
    this.cards = Array.from(this.container.children);
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.containerSize = {
      w: 0,
      h: 0,
    };
    this.initContainer = this.initContainer.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.init();
  }

  initContainer() {
    this.containerSize.w = this.container.offsetWidth;
    this.containerSize.h = this.container.offsetHeight;
  }

  onMouseMove(event) {
    const { clientX, clientY } = event;
    const rect = this.container.getBoundingClientRect();
    const { w, h } = this.containerSize;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const inside = x < w && x > 0 && y < h && y > 0;
    if (inside) {
      this.mouse.x = x;
      this.mouse.y = y;
      this.cards.forEach((card) => {
        const cardX = -(card.getBoundingClientRect().left - rect.left) + this.mouse.x;
        const cardY = -(card.getBoundingClientRect().top - rect.top) + this.mouse.y;
        card.style.setProperty('--mouse-x', `${cardX}px`);
        card.style.setProperty('--mouse-y', `${cardY}px`);
      });
    }
  }

  init() {
    this.initContainer();
    window.addEventListener('resize', this.initContainer);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  destroy() {
    window.removeEventListener('resize', this.initContainer);
    window.removeEventListener('mousemove', this.onMouseMove);
  }
}

/* ---------------- NFT CARD ---------------- */

const NFTCard = memo(({ feature }) => {
  return (
    <Link to={feature.ctaTo} className="nft-card spotlight-card">
      <div className="card-inner">
        {/* Radial gradient glow at bottom */}
        <div className="card-glow" aria-hidden="true">
          <div className="card-glow-inner"></div>
        </div>

        <div className="card-main">
          {/* Image with accent glow */}
          <div className="relative inline-flex w-full">
            <div 
              className="image-glow" 
              style={{ backgroundColor: feature.accentColor }}
              aria-hidden="true"
            ></div>
            <img 
              className="token-image" 
              src={feature.image} 
              alt={feature.heading}
            />
          </div>

          {/* Text content */}
          <div className="card-content">
            <h2 className="card-title">{feature.heading}</h2>
            <p className="card-description">{feature.description}</p>
            
            <div className="token-info">
              <div className="price" style={{ color: feature.accentColor }}>
                {feature.icon}
                <p>{feature.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

/* ---------------- MAIN ---------------- */

const Features = memo(function Features() {
  const spotlightContainerRef = useRef(null);
  const spotlightInstanceRef = useRef(null);

  const cards = useMemo(
    () =>
      FEATURES_DATA.map((f) => (
        <NFTCard key={f.id} feature={f} />
      )),
    []
  );

  useEffect(() => {
    // Initialize spotlight effect
    if (spotlightContainerRef.current && !spotlightInstanceRef.current) {
      spotlightInstanceRef.current = new Spotlight(spotlightContainerRef.current);
    }

    // Cleanup
    return () => {
      if (spotlightInstanceRef.current) {
        spotlightInstanceRef.current.destroy();
        spotlightInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-mockmate">
      </div>

      <div className="px-6 mx-auto max-w-7xl">
        <div className="relative z-10 mb-20 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Everything you need to{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text">
              prep smarter
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            AI-powered practice, feedback, and insights
          </p>
        </div>

        <div 
          ref={spotlightContainerRef}
          className="nft-cards-container spotlight-group"
        >
          {cards}
        </div>
      </div>

      {/* Integrated Spotlight + NFT Card Styles */}
      <style>{`
        .bg-mockmate {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          pointer-events: none;
        }

        .bg-mockmate h1 {
          font-size: clamp(8rem, 20vw, 20rem);
          filter: opacity(0.03);
          font-weight: 900;
          color: #eee;
          white-space: nowrap;
        }

        .nft-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* ✅ Spotlight Effect Styles */
        .spotlight-card {
          position: relative;
          background: #1e293b;
          border-radius: 1.5rem;
          padding: 1px;
          overflow: hidden;
        }

        .spotlight-card::before {
          content: '';
          position: absolute;
          width: 20rem;
          height: 20rem;
          left: -10rem;
          top: -10rem;
          background: #94a3b8;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s;
          transform: translate(var(--mouse-x, 0), var(--mouse-y, 0));
          z-index: 10;
          blur: 100px;
          filter: blur(100px);
        }

        .spotlight-card::after {
          content: '';
          position: absolute;
          width: 24rem;
          height: 24rem;
          left: -12rem;
          top: -12rem;
          background: #6366f1;
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s;
          transform: translate(var(--mouse-x, 0), var(--mouse-y, 0));
          z-index: 30;
          blur: 100px;
          filter: blur(100px);
        }

        .spotlight-group:hover .spotlight-card::before {
          opacity: 1;
        }

        .spotlight-card:hover::after {
          opacity: 0.1;
        }

        .card-inner {
          position: relative;
          height: 100%;
          background: #0f172a;
          padding: 1.5rem;
          padding-bottom: 2rem;
          border-radius: 1.5rem;
          z-index: 20;
          overflow: hidden;
        }

        /* Radial gradient glow */
        .card-glow {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          pointer-events: none;
          z-index: -10;
          width: 50%;
          aspect-ratio: 1;
        }

        .card-glow-inner {
          position: absolute;
          inset: 0;
          background: #1e293b;
          border-radius: 50%;
          filter: blur(80px);
        }

        /* NFT Card Styles */
        .nft-card {
          user-select: none;
          max-width: 350px;
          margin: 0 auto;
          text-decoration: none;
          display: block;
          cursor: pointer;
          transition: 0.3s transform;
        }

        .nft-card:hover {
          transform: translateY(-4px);
        }

        .card-main {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          z-index: 2;
        }

        /* Image glow effect */
        .image-glow {
          position: absolute;
          width: 40%;
          height: 40%;
          inset: 0;
          margin: auto;
          transform: translateY(-10%);
          filter: blur(3rem);
          z-index: -10;
          border-radius: 50%;
          opacity: 0.6;
        }

        .token-image {
          border-radius: 0.75rem;
          max-width: 100%;
          width: 100%;
          height: 250px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .card-content {
          margin-top: 1rem;
        }

        .card-title {
          margin: 0 0 0.5rem 0;
          color: #e2e8f0;
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .card-description {
          margin: 0.5rem 0 1rem 0;
          color: #94a3b8;
          font-size: 0.875rem;
          line-height: 1.6;
        }

        .token-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .price p {
          margin: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nft-cards-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .nft-card {
            max-width: 100%;
          }

          .bg-mockmate h1 {
            font-size: clamp(4rem, 15vw, 10rem);
          }
        }
      `}</style>
    </section>
  );
});

export default Features;
