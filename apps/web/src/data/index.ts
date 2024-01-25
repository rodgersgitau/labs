import { siteConfig } from "../config/index.ts";

export interface DataType {
  name: string;
  type: "game" | "effect";
  link?: string;
  image: string;
  repository: string;
  description: string;
}

const REPO_LINK = `${siteConfig.repo}/tree/master/packages`;

export const projectData: DataType[] = [
  {
    name: "Stack It",
    type: "game",
    link: "https://stack-it.netlify.app/",
    image: "/images/play/stack-it.png",
    repository: `${REPO_LINK}/games/block-break`,
    description: "A block stacking game akin to digital Jenga",
  },
  {
    name: "Matrix Digital Rain",
    type: "effect",
    link: "https://matrixdigitalrain.netlify.app/",
    image: "/images/play/matrix-digital-rain.png",
    repository: `${REPO_LINK}/effects/matrix-rain`,
    description: "The opening sequence from these cult favourite movies",
  },
  {
    name: "Block Breaker",
    type: "game",
    link: "https://block-breaker.netlify.app",
    image: "/images/play/block-break.png",
    repository: `${REPO_LINK}/games/block-break`,
    description: "A clone of the popular block breaking game",
  },
  {
    name: "Tetris",
    type: "game",
    link: "https://tetricks.netlify.app",
    image: "/images/play/tetris.png",
    repository: `${REPO_LINK}/games/tetris`,
    description: "The famous stacking game for different sized block shapes",
  },
  {
    name: "Noughts & Crosses",
    type: "game",
    link: "https://clone-tictactoe.netlify.app",
    image: "/images/play/tictactoe.png",
    repository: `${REPO_LINK}/games/nought-and-crosses`,
    description: "The classic game also known as tic-tac-toe",
  },
  {
    name: "Monopoly",
    type: "game",
    image: "/images/play/virtual-monopoly.png",
    repository: `${REPO_LINK}/games/monopoly`,
    description: "The classic board game reimagined",
  },
];

export default projectData;
