import { siteConfig } from "../config/index.ts";

export interface DataType {
  name: string;
  type: "game" | "effect";
  link?: string;
  image: string;
  repository: string;
  description: string;
}

const REPO_LINK = `${siteConfig.repo}/tree/master`;

const data: DataType[] = [
  {
    name: "Stack It",
    type: "game",
    link: "https://stack-it.netlify.app/",
    image: "/images/play/stack-it.png",
    repository: `${REPO_LINK}/block-break`,
    description: "A block stacking game akin to digital Jenga",
  },
  {
    name: "Matrix Digital Rain",
    type: "effect",
    link: "https://matrixdigitalrain.netlify.app/",
    image: "/images/play/matrix-digital-rain.png",
    repository: `${REPO_LINK}/matrix-rain`,
    description:
      "Ever watched these cult favourite movies? This is the opening sequence",
  },
  {
    name: "Block Breaker",
    type: "game",
    link: "https://block-breaker.netlify.app",
    image: "/images/play/block-break.png",
    repository: `${REPO_LINK}block-break`,
    description: "A clone of the popular block breaking game",
  },
  {
    name: "Tetris",
    type: "game",
    link: "https://tetricks.netlify.app",
    image: "/images/play/tetris.png",
    repository: `${REPO_LINK}/tetris`,
    description:
      "A clone of the famous stacking game for different sized block shapes",
  },
  {
    name: "Noughts & Crosses",
    type: "game",
    link: "https://clone-tictactoe.netlify.app",
    image: "/images/play/tictactoe.png",
    repository: `${REPO_LINK}/nought-and-crosses`,
    description: "The classic game also known as tictactoe",
  },
  {
    name: "Monopoly",
    type: "game",
    image: "/images/play/virtual-monopoly.png",
    repository: `${REPO_LINK}/monopoly`,
    description: "The classic board game reimagined",
  },
];

export default data;
