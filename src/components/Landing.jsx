import { HeroParallax } from "./ui/hero-parallax";
import { useEffect } from "react";

const products = [
  {
    title: "SpendSense Dashboard",
    link: "",
    thumbnail: "/spendsense-screenshot.png",
  },
  {
    title: "Finance",
    link: "",
    thumbnail: "/image2.jpg",
  },
  {
    title: "SpendSense",
    link: "",
    thumbnail: "/screenshot2.png",
  },

  {
    title: "Shadcn Charts",
    link: "https://ui.shadcn.com/charts",
    thumbnail: "/shadcn-charts.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Shadcn",
    link: "https://ui.shadcn.com",
    thumbnail: "/shadcn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "SpendSense",
    link: "",
    thumbnail: "/spendsense-screenshot.png",
  },
  {
    title: "Tailwind CSS",
    link: "https://tailwindcss.com",
    thumbnail: "/tailwind.png",
  },
  {
    title: "Framer Motion",
    link: "https://www.framer.com/motion/",
    thumbnail: "/framer-motion.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const Landing = () => {
  useEffect(() => {
    document.body.classList.add("custom-scrollbar");

    return () => {
      document.body.classList.remove("custom-scrollbar");
    };
  }, []);
  return (
    <div className="custom-scrollbar dark bg-neutral-950">
      <HeroParallax products={products} />
    </div>
  );
};

export default Landing;
