import { motion } from 'framer-motion';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { styles } from '../styles';
import { textVariant } from '../utils/motion';

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }} 
        className="flex flex-wrap justify-center gap-10 mt-14"
      >
        {technologies.map((technology) => (
          <div className="relative w-28 h-28" key={technology.name}>
            <div className="group relative w-full h-full flex justify-center items-center">
              <BallCanvas icon={technology.icon} />
              <div
                className="absolute bottom-0 mb-2 w-max opacity-0 group-hover:opacity-100
                bg-darkGray text-white text-[12px] px-2 py-1 rounded-lg transform 
                translate-y-full transition-opacity duration-300"
              >
                {technology.name}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Tech, '');
