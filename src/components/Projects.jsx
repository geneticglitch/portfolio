import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Management System",
    url: "https://github.com/xnigthmarex/Train-Reservation-System--Python-",
    image: "projects/404.jpg",
    description: "This Python script is a console-based railway management system. ",
  },
  {
    title: "SyncShift",
    url: "https://github.com/geneticglitch/SyncShift",
    image: "projects/404.jpg",
    description: "A productivity App",
  },
  {
    title: "Chat Sphere",
    url: "https://github.com/geneticglitch/chatsphere",
    image: "projects/404.jpg",
    description: "Real Time Chat App",
  },
  {
    title: "High Performance Moton Controller",
    url: "https://github.com/geneticglitch/Robot-Tour-Sci-Oly-2024",
    image: "projects/404.jpg",
    description: "Rc controller for my autonomous robot project",
  },
  {
    title: "Raw-NN-Digit-Recognition",
    url: "https://github.com/xnigthmarex/Raw-NN-Digit-Recognition",
    image: "projects/404.jpg",
    description: "Raw NN implementation in java",
  },
  {
    title: "Next.js Starter",
    url: "https://github.com/geneticglitch/Next.JS-Perfect-Starter",
    image: "projects/404.jpg",
    description: "Starter Template",
  },
  {
    title: "Astro-Equations",
    url: "https://github.com/geneticglitch/Astro-Equations",
    image: "projects/404.jpg",
    description: "",
  },
  {
    title: "Automation Scripts",
    url: "https://github.com/xnigthmarex/BashAutomationScripts",
    image: "projects/404.jpg",
    description: "These Scripts make it easy to download docker and deploying containers",
  },
  {
    title: "Coding p/s",
    url: "https://github.com/xnigthmarex/CodingBats-Answers",
    image: "projects/404.jpg",
    description: "This repo contains almost all of the solutions to questions on the codingbat.com website.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.3, 2.5]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.5}
      />
      <Text
        maxWidth={2.6}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.2, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.13}
        position={[-1, -0.70, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 3));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
