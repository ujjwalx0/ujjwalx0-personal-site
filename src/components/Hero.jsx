import { motion } from 'framer-motion';
import { styles } from '../styles';
import { ProfilePic } from '../assets';

const Hero = () => {
  return (
    <>
      <section className="relative flex w-full h-screen mx-auto bg-dark overflow-hidden">
{/* Profile Picture Section */}
<div className="absolute top-0 right-0 w-full sm:w-[25%] h-[50%] sm:h-full flex items-center justify-center bg-dark flex-shrink-0 p-4">
  <img
    src={ProfilePic}
    alt="profile"
    className="w-[35%] sm:w-[70%] h-auto rounded-full border-4 border-gray-800 shadow-lg"
  />
</div>

        {/* Introductory Text Section */}
        <div className="w-full sm:w-[75%] h-full flex flex-col items-center sm:items-start justify-center px-6 sm:px-12">
          <h1
            className={`${styles.heroHeadText} text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 font-poppins uppercase`}
          >
            Hi, I'm{' '}
            <span className="text-[50px] sm:text-[90px] font-mova font-extrabold uppercase tracking-wide hover:scale-105 transition-transform duration-500">
              Ujjwal
            </span>
          </h1>
          <p className={`${styles.heroSubText} mt-4 text-white text-center sm:text-left max-w-lg`}>
            I'm a Full-Stack Developer specializing in crafting efficient and robust software solutions.
            <br className="sm:hidden" />
            Passionate about creating seamless user experiences and building impactful applications.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-french border-dim flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;
