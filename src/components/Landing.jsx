import { HeroParallax } from "./ui/hero-parallax";
import { useEffect } from "react";
import { WavyBackground } from "./ui/wavy-background";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

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
    <>
      <div className="custom-scrollbar dark bg-neutral-950">
        <WavyBackground
          waveWidth={75}
          waveOpacity={0.5}
          backgroundFill="#0a0a0a"
        ></WavyBackground>
        <motion.div
          className="absolute"
          initial={{
            y: "-55vh",
            x: "38vw",
          }}
        >
          <div className="text-3xl font-semibold text-white md:text-7xl">
            Welcome to <br />{" "}
            <span className="text-fuchsia-600">SpendSense</span>
          </div>
        </motion.div>
        <HeroParallax products={products} />
      </div>
      <div className="v-full dark h-screen bg-neutral-950 bg-grid-small-slate-800">
        <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-40 md:pb-40 md:pt-10">
          <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
            See what people are saying <br /> about{" "}
            <span className="text-fuchsia-600">SpendSense</span>
          </h1>
        </div>
        <div className="mx-auto w-full"></div>
      </div>
      <footer>
        <div className="dark flex h-8 items-center justify-end bg-neutral-950 px-4 text-sm text-fuchsia-600">
          Created by Menachem Lemmer and Craig Wagner
        </div>
      </footer>
    </>
  );
};

export default Landing;
