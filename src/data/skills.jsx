import React from 'react';
import { SiSpringboot, SiGitlab, SiBlazor, SiMysql, SiPostgresql, SiSqlite } from 'react-icons/si';

import HtmlIcon from '../assets/icons/html5.svg?react';
import CssIcon from '../assets/icons/css3.svg?react';
import JsIcon from '../assets/icons/javascript.svg?react';
import FigmaIcon from '../assets/icons/figma.svg?react';
import NodeIcon from '../assets/icons/nodedotjs.svg?react';
import PythonIcon from '../assets/icons/python.svg?react';
import ReactIcon from '../assets/icons/react.svg?react';
import GithubIcon from '../assets/icons/github.svg?react';
import GitIcon from '../assets/icons/git.svg?react';
import TailwindIcon from '../assets/icons/tailwind.svg?react';
import CsharpIcon from '../assets/icons/csharp.svg?react';
import JavaIcon from '../assets/icons/java.svg?react';

// Shared by the Skills grid and the About-section marquee.
export const skillsData = [
  { name: 'Java', icon: <JavaIcon /> },
  { name: 'Spring Boot', icon: <SiSpringboot /> },
  { name: 'HTML5', icon: <HtmlIcon /> },
  { name: 'CSS3', icon: <CssIcon /> },
  { name: 'JavaScript', icon: <JsIcon /> },
  { name: 'React.js', icon: <ReactIcon /> },
  { name: 'Tailwind CSS', icon: <TailwindIcon /> },
  { name: 'Node.js', icon: <NodeIcon /> },
  { name: 'C#', icon: <CsharpIcon /> },
  { name: 'Python', icon: <PythonIcon /> },
  { name: 'Git', icon: <GitIcon /> },
  { name: 'GitHub', icon: <GithubIcon /> },
  { name: 'GitLab', icon: <SiGitlab /> },
  { name: 'MudBlazor', icon: <SiBlazor /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'SQLite', icon: <SiSqlite /> },
  { name: 'Figma', icon: <FigmaIcon /> },
];
