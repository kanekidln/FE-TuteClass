import demo1 from "./images/demo1.png";
import demo2 from "./images/demo2.png";
import demo3 from "./images/demo3.png";
import demo4 from "./images/demo4.png";
import demo5 from "./images/demo5.png";
import demo6 from "./images/demo6.png";
import type { FeatureNode } from "./types";

export const features: FeatureNode[] = [
  { copy: "Open a new learning orbit.", demo: "class", image: demo1, imageAlt: "Create Class demo preview", index: 1, left: "10%", planet: "planet-1", progress: 0, title: "Create Class", top: "55%", theme: "orange" },
  { copy: "Sync lessons into weekly paths.", demo: "schedule", image: demo2, imageAlt: "Schedule Lessons demo preview", index: 2, left: "25%", planet: "planet-2", progress: 0.176, title: "Schedule Lessons", top: "31%", theme: "orange" },
  { copy: "Track every student signal.", demo: "attendance", image: demo3, imageAlt: "Take Attendance demo preview", index: 3, left: "42%", planet: "planet-3", progress: 0.377, title: "Take Attendance", top: "61%", theme: "blue" },
  { copy: "Beam resources to the class fleet.", demo: "materials", image: demo4, imageAlt: "Share Materials demo preview", index: 4, left: "60%", planet: "planet-4", progress: 0.588, title: "Share Materials", top: "34%", theme: "orange" },
  { copy: "Launch assignments with clear due dates.", demo: "homework", image: demo5, imageAlt: "Assign Homework demo preview", index: 5, left: "78%", planet: "planet-5", progress: 0.8, title: "Assign Homework", top: "66%", theme: "orange" },
  { copy: "Read patterns from the learning galaxy.", demo: "insights", image: demo6, imageAlt: "Ask AI Insights demo preview", index: 6, left: "93%", planet: "planet-6", progress: 1, title: "Ask AI Insights", top: "31%", theme: "blue" },
];

export const workflowPath = "M 144,260 C 245,250 270,165 360,165 C 455,165 520,285 605,285 C 700,285 765,175 864,175 C 965,175 1030,305 1123,305 C 1218,305 1260,165 1368,165";

export const workflowPathLength = 1224;
