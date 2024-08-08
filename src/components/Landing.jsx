import { HeroParallax } from "./ui/hero-parallax";
import { useEffect } from "react";
import { WavyBackground } from "./ui/wavy-background";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

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
        <motion.div
          initial={{
            x: "-70vw",
          }}
          whileInView={{
            x: 0,
            transition: {
              delay: 0.2,
              duration: 1,
              type: "spring",
              bounce: 0.4,
              stiffness: 70,
            },
          }}
          className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-40 md:pb-40 md:pt-10"
        >
          <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
            See what people are saying <br /> about{" "}
            <span className="text-fuchsia-600">SpendSense</span>
          </h1>
        </motion.div>
        <motion.div className="mt-[10vh] flex w-full items-center justify-center gap-8 overflow-hidden">
          <Card className="h-96 w-96 border-fuchsia-600 p-2">
            <CardHeader>
              <div>
                <CardTitle>John </CardTitle>
                <CardDescription className="text-fuchsia-600">
                  CEO, SpendSense
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-12">
              <TypeAnimation
                repeat={3}
                style={{
                  whiteSpace: "pre-line",
                  height: "195px",
                  display: "block",
                }}
                sequence={[
                  "\"SpendSense is the best finance tracker I've ever used. It's simple, easy to use, and has all the features I need to keep track of my spending.\"",
                ]}
              />
            </CardContent>
          </Card>
          <Card className="h-96 w-96 border-fuchsia-600 p-2">
            <CardHeader>
              <div>
                <CardTitle>Bill </CardTitle>
                <CardDescription className="text-fuchsia-600">
                  Eccentric Billionaire
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-12">
              <TypeAnimation
                style={{
                  whiteSpace: "pre-line",
                  height: "195px",
                  display: "block",
                }}
                sequence={[
                  '"I have 10,000 SpendSense accounts, and I use them all to keep track of my spending. In fact, I use SpendSense so much that I never have time to spend any money."',
                ]}
              ></TypeAnimation>
            </CardContent>
          </Card>
          <Card className="h-96 w-96 border-fuchsia-600 p-2">
            <CardHeader>
              <div>
                <CardTitle> Eric </CardTitle>
                <CardDescription className="text-fuchsia-600">
                  Former Homeless Guy
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-12">
              <TypeAnimation
                style={{
                  whiteSpace: "pre-line",
                  height: "195px",
                  display: "block",
                }}
                sequence={[
                  '"Three months ago, I was living on the streets. Then I found SpendSense, and it changed my life. Now I\'m the CEO of a Fortune 500 company, and I have 10 children, all named SpendSense!"',
                ]}
              ></TypeAnimation>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer>
        <div className="dark flex h-8 items-center justify-end bg-neutral-950 px-4 text-sm text-slate-600">
          Created by Menachem Lemmer and Craig Wagner
        </div>
      </footer>
    </>
  );
};

export default Landing;
