import { memo, useMemo, useEffect, useRef } from "react";
import { Sparkles, BarChart3, Code2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { DotPattern } from "../components/ui/dot-pattern";

/* ---------------- FEATURES DATA ---------------- */

const FEATURES_DATA = [
  {
    id: "demo",
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI INTERVIEW SIMULATION",
    heading: "Friendly question practice",
    description:
      "Realistic interview questions tailored by Intervexa's AI.",
    ctaTo: "/interview",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=300&fit=crop",
    accentColor: "#5b8cf6",
  },
  {
    id: "dashboard",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "INSTANT AI FEEDBACK",
    heading: "Performance you can measure",
    description:
      "Get actionable feedback on clarity, structure, and communication using Intervexa.",
    ctaTo: "/dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    accentColor: "#9b7cf6",
  },
  {
    id: "code",
    icon: <Code2 className="w-6 h-6" />,
    title: "LIVE CODE WRITING",
    heading: "Code in your browser",
    description:
      "Write and test solutions instantly using Intervexa's built-in editor.",
    ctaTo: "/code-demo",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&h=300&fit=crop",
    accentColor: "#ff8844",
  },
];

/* ---------------- SPOTLIGHT EFFECT ---------------- */
class Spotlight {
  constructor(container) {
    this.container = container;
    this.cards = Array.from(container.children);
    this.rect = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onResize = this.onResize.bind(this);

    this.init();
  }

  onResize() {
    this.rect = this.container.getBoundingClientRect();
  }

  onMouseMove(e) {
    if (!this.rect) return;

    const x = e.clientX - this.rect.left;
    const y = e.clientY - this.rect.top;

    if (x < 0 || y < 0 || x > this.rect.width || y > this.rect.height) return;

    this.cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();

      const cardX = e.clientX - cardRect.left;
      const cardY = e.clientY - cardRect.top;

      card.style.setProperty("--mouse-x", `${cardX}px`);
      card.style.setProperty("--mouse-y", `${cardY}px`);
    });
  }

  init() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.container.addEventListener("mousemove", this.onMouseMove);
  }

  destroy() {
    window.removeEventListener("resize", this.onResize);
    this.container.removeEventListener("mousemove", this.onMouseMove);
  }
}

/* ---------------- NFT CARD ---------------- */

const NFTCard = memo(({ feature }) => (
  <div className="nft-card spotlight-card">
    <div className="card-inner">
      <div className="card-glow">
        <div className="card-glow-inner" />
      </div>

      <div className="card-main">
        <div className="relative inline-flex w-full">
          <div
            className="image-glow"
            style={{ backgroundColor: feature.accentColor }}
          />
          <img
            className="token-image"
            src={feature.image}
            alt={feature.heading}
          />
        </div>

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
  </div>
));

/* ---------------- MAIN ---------------- */

const Features = memo(function Features() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);

  const cards = useMemo(
    () => FEATURES_DATA.map((f) => <NFTCard key={f.id} feature={f} />),
    []
  );

  useEffect(() => {
    if (containerRef.current && !spotlightRef.current) {
      spotlightRef.current = new Spotlight(containerRef.current);
    }

    return () => spotlightRef.current?.destroy();
  }, []);

  return (
    <section className="relative py-24 overflow-hidden bg-[#020618]">
      {/* ===== DOT PATTERN BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotPattern
          className={cn(
            "absolute inset-0 opacity-25",
            "mask-[radial-gradient(700px_circle_at_center,white,transparent)]"
          )}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 px-6 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            Everything you need to{" "}
            <span className="text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text">
              prepare smarter
            </span>
          </h2>
        </div>

        <div ref={containerRef} className="nft-cards-container spotlight-group">
          {cards}
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        .nft-cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .spotlight-card {
          position: relative;
          background: #1e293b;
          border-radius: 1.5rem;
          padding: 1px;
          overflow: hidden;
        }

        .spotlight-card::before,
        .spotlight-card::after {
          content: "";
          position: absolute;
          width: 22rem;
          height: 22rem;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(var(--mouse-x, 0), var(--mouse-y, 0));
          opacity: 0;
          transition: opacity 0.4s;
          filter: blur(100px);
        }

        .spotlight-card::before {
          background: #94a3b8;
          z-index: 5;
        }

        .spotlight-card::after {
          background: #6366f1;
          z-index: 6;
        }

        .spotlight-group:hover .spotlight-card::before {
          opacity: 0.15;
        }

        .spotlight-card:hover::after {
          opacity: 0.12;
        }

        .card-inner {
          background: #0f172a;
          border-radius: 1.5rem;
          padding: 1.5rem;
          padding-bottom: 2rem;
          position: relative;
          z-index: 10;
          height: 100%;
        }

        .card-glow {
          position: absolute;
          bottom: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          aspect-ratio: 1;
          pointer-events: none;
        }

        .card-glow-inner {
          background: #1e293b;
          border-radius: 50%;
          filter: blur(90px);
          width: 100%;
          height: 100%;
        }

        .image-glow {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 40%;
          height: 40%;
          border-radius: 50%;
          filter: blur(3rem);
          opacity: 0.6;
        }

        .token-image {
          border-radius: 0.75rem;
          width: 100%;
          height: 250px;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.06);
        }

        .card-title {
          margin-top: 1rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: #e2e8f0;
        }

        .card-description {
          margin: 0.5rem 0 1rem;
          font-size: 0.875rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .nft-cards-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
});

export default Features;
