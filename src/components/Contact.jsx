import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { send, sendHover } from '../assets';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const { name, email, message } = form;
    if (!name.trim()) {
      toast.error('Name is required.');
      return false;
    }
    if (!email.trim() || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error('A valid email is required.');
      return false;
    }
    
    if (!message.trim()) {
      toast.error('Message cannot be empty.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    emailjs
      .send(
        'service_9tdycg7', 
        'template_0t1etfy', 
        {
          from_name: form.name,
          to_name: 'Ujjwal', 
          from_email: form.email,
          to_email: 'ujjwals346@gmail.com', 
          message: form.message,
        },
        'eSjSL2jFFbRm5GV8G' 
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Message sent! I appreciate your input and will respond soon.');

          setForm({
            name: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error('EmailJS Error:', error);
          toast.error('Oops! Something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className="flex flex-col xl:flex-row xl:gap-10 gap-6 overflow-hidden xl:items-start items-center mt-16 xl:mt-0 px-4">
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="flex-1 bg-jet p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadTextLight}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-6 font-poppins w-full"
        >
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-2 sm:mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-eerieBlack py-3 px-4 sm:py-4 sm:px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-2 sm:mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-eerieBlack py-3 px-4 sm:py-4 sm:px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-timberWolf font-medium mb-2 sm:mb-4">Your Message</span>
            <textarea
              rows="6"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's your message?"
              className="bg-eerieBlack py-3 px-4 sm:py-4 sm:px-6 placeholder:text-taupe text-timberWolf rounded-lg outline-none border-none font-medium resize-none"
            />
          </label>

          <button
            type="submit"
            className="flex justify-center items-center py-3 sm:py-4 px-6 rounded-lg bg-night text-timberWolf font-bold text-lg transition duration-300 ease-in-out hover:bg-battleGray hover:text-eerieBlack"
            onMouseOver={() => {
              document.querySelector('.contact-btn').setAttribute('src', sendHover);
            }}
            onMouseOut={() => {
              document.querySelector('.contact-btn').setAttribute('src', send);
            }}
          >
            {loading ? 'Sending' : 'Send'}
            <img
              src={send}
              alt="send"
              className="contact-btn ml-3 w-[23px] h-[23px] object-contain"
            />
          </button>
        </form>
      </motion.div>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ fontSize: '16px', borderRadius: '15px', padding: '15px' }}
      />
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
