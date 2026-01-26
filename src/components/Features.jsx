import { memo, useMemo } from "react";
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


/* ---------------- NFT CARD ---------------- */


const NFTCard = memo(({ feature }) => {
  return (
    <Link to={feature.ctaTo} className="nft-card">
      <div className="card-main">
        <img 
          className="token-image" 
          src={feature.image} 
          alt={feature.heading}
        />
        <h2 className="card-title">{feature.heading}</h2>
        <p className="card-description">{feature.description}</p>
        
        <div className="token-info">
          <div className="price" style={{ color: feature.accentColor }}>
            {feature.icon}
            <p>{feature.title}</p>
          </div>
        </div>
      </div>
    </Link>
  );
});


/* ---------------- MAIN ---------------- */


const Features = memo(function Features() {
  const cards = useMemo(
    () =>
      FEATURES_DATA.map((f) => (
        <NFTCard key={f.id} feature={f} />
      )),
    []
  );


  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Watermark */}
      <div className="bg-mockmate">
        <h1>MockMate</h1>
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


        <div className="nft-cards-container">
          {cards}
        </div>
      </div>


      {/* NFT Card Glassmorphic Styles with Softer Gradients */}
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


        .nft-card {
          user-select: none;
          max-width: 350px;
          margin: 0 auto;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: linear-gradient(
            180deg,
            rgba(30, 35, 45, 0.6) 0%,
            rgba(20, 25, 35, 0.8) 100%
          );
          box-shadow: 0 4px 16px 2px rgba(0, 0, 0, 0.3);
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          transition: 0.5s all;
          position: relative;
          text-decoration: none;
          display: block;
          cursor: pointer;
        }


        .nft-card::before {
          position: absolute;
          content: "";
          box-shadow: 0 0 150px 60px rgba(255, 255, 255, 0.08);
          top: -10%;
          left: -100%;
          transform: rotate(-45deg);
          height: 60rem;
          width: 60rem;
          transition: 0.7s all;
          z-index: 1;
        }


        .nft-card:hover {
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px 4px rgba(0, 0, 0, 0.4);
          transform: translateY(-4px) scale(1.01);
          filter: brightness(1.15);
        }


        .nft-card:hover::before {
          filter: brightness(0.6);
          top: -100%;
          left: 200%;
        }


        .card-main {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 1rem;
          position: relative;
          z-index: 2;
        }


        .token-image {
          border-radius: 0.75rem;
          max-width: 100%;
          width: 100%;
          height: 250px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }


        .card-title {
          margin: 1rem 0 0.5rem 0;
          color: #fff;
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
        }


        .card-description {
          margin: 0.5rem 0 1rem 0;
          color: rgba(168, 158, 201, 0.9);
          font-size: 0.9rem;
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
