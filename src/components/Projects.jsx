import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { SectionWrapper } from '../hoc';
import { styles } from '../styles';
import '../index.css';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../constants';
import { fadeIn, textVariant, staggerContainer, slideIn } from '../utils/motion';

const ProjectCard = ({
  id,
  name,
  description,
  techStack,
  image,
  roles,
  index,
  active,
  handleClick,
  demo,
}) => {
  const [hovered, setHovered] = useState(false);

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    handleClick(active === id ? null : id);
  };
 
  

  return (
    <motion.div
      variants={fadeIn('left', 'linear', index * 0.15, 0.25)}
      className={`relative ${
        active === id ? 'lg:flex-[3.5] flex-[10] z-30' : 'lg:flex-[1] flex-[1] z-10'
      } flex items-center justify-center h-[420px] cursor-pointer card-shadow transition-all duration-300 mx-2`}
      onClick={() => handleClick(id)}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute top-0 left-0 z-10 bg-jetLight h-full w-full rounded-[24px] transition-opacity duration-300 ${active === id ? 'opacity-0' : 'opacity-50'}`}
      ></div>

      {active !== id && (
        <div className="absolute w-full h-full rounded-[24px] overflow-hidden flex items-end">
          <img
            src={image}
            alt={name}
            className="w-full h-[50%] object-cover object-bottom"
          />
        </div>
      )}

      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between ${active ? 'p-8' : 'p-4'} ${active ? 'pt-8' : 'pt-4'} ${active ? 'pb-4' : 'pb-4'}`}
      >
        <div className="w-full flex justify-center">
          {active !== id ? (
            <h3
              className="font-extrabold font-beckman uppercase text-timberWolf text-[18px] sm:text-[20px] leading-none text-center truncate mt-3"
            >
              {name}
            </h3>
          ) : (
            <h2 className="font-bold sm:text-[16px] text-[20px] text-timberWolf uppercase font-beckman mb-4">
              {name}
            </h2>
          )}
        </div>

        {active === id && (
          <>
            <p
              className="text-silver sm:text-[14px] text-[12px] max-w-3xl sm:leading-[24px] leading-[18px] font-poppins tracking-[1px] mb-4"
            >
              {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1 mb-5">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="text-black text-[14px] bg-gray-200 rounded-full px-3 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {active !== id && hovered && (
        <div className="absolute top-0 left-0 w-full h-[50%] bg-black bg-opacity-70 text-white p-4 flex flex-col justify-center rounded-t-[24px]">
          <h4 className="text-[16px] font-bold mb-2">Roles:</h4>
          <ul className="list-disc list-inside text-[14px]">
            {roles.map((role, index) => (
              <li key={index} className="mb-1">{role}</li>
            ))}
          </ul>
        </div>
      )}

      {active === id && demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-blue-500 text-white px-1 py-1 rounded-full flex items-center space-x-2 z-40 pointer-events-auto mb-0"
        >
          <FaExternalLinkAlt />
          <span>Demo</span>
        </a>
      )}
    </motion.div>
  );
};

const Projects = () => {
  const [active, setActive] = useState(null);

  const needsCarousel = projects.length > 4;

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    fade: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
    accessibility: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="-mt-[6rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadTextLight}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
        >
          Below are a few selected projects from the many I have worked on. These examples showcase the technologies employed and the diverse solutions developed for various clients. They provide a snapshot of my extensive experience and expertise.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        {needsCarousel ? (
          <Slider {...settings} className="mt-[50px]">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                {...project}
                active={active}
                handleClick={setActive}
              />
            ))}
          </Slider>
        ) : (
          <div className="mt-[50px] flex lg:flex-row flex-col min-h-[420px] gap-2">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                {...project}
                active={active}
                handleClick={setActive}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Projects, 'projects');
