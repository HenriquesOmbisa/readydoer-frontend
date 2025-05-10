'use client'
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/NotFound.module.css';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const funnyMessages = [
    "Oops! The page has been abducted by alien developers 👽",
    "404: The cat walked on the keyboard and deleted this page 🐱⌨️",
    "Our server hamsters are too tired for this page 🐹💤",
    "Looks like you found the Matrix easter egg! 🕶️",
    "This page ran away with the pet unicorn 🦄",
    "Error 404: Laughs not found (just kidding, we have a lot!) 😂",
    "Where's Wally? Oops, you mean the page? 🧐"
  ];

  // Rotação de mensagens divertidas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funnyMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Efeito de confete no hover do botão
  const createConfetti = () => {
    const colors = ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57', '#5f27cd'];
    for (let i = 0; i < 20; i++) {
      const confetti = document.createElement('div');
      confetti.className = styles.confetti;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.width = `${Math.random() * 10 + 5}px`;
      confetti.style.height = `${Math.random() * 10 + 5}px`;
      confetti.style.opacity = (Math.random() + 0.5).toString();
      
      const buttonContainer = document.querySelector(`.${styles.buttonContainer}`);
      if (buttonContainer) {
        buttonContainer.appendChild(confetti);
      }
      
      // Animação do confete
      const animation = confetti.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        }
      );
      
      animation.onfinish = () => confetti.remove();
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Página Não Encontrada | Diversão Garantida</title>
        <meta name="description" content="Página não encontrada, mas cheia de animações!" />
      </Head>

      <motion.main 
        className={styles.main}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Nuvem animada */}
        <motion.div 
          className={styles.cloud}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={styles.cloudShape}></div>
        </motion.div>

        {/* Personagem principal animado */}
        <motion.div 
          className={styles.character}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className={styles.characterBody}></div>
          <div className={styles.characterFace}>
            <AnimatePresence>
              {isHovering ? (
                <motion.div
                  className={styles.faceHappy}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="happy"
                >😄</motion.div>
              ) : (
                <motion.div
                  className={styles.faceNormal}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="normal"
                >😕</motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Título com efeito de digitação */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          4<span className={styles.bounce}>0</span>4
        </motion.h1>

        {/* Mensagem animada */}
        <AnimatePresence mode='wait'>
          <motion.p
            key={currentMessage}
            className={styles.message}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {funnyMessages[currentMessage]}
          </motion.p>
        </AnimatePresence>

        {/* Botão com confete */}
        <Link href={"/"}>
          <div className={styles.buttonContainer}>
            <motion.button
              onClick={() => router.push('/')}
              className={styles.button}
              whileHover={{
                scale: 1.05,
                rotate: [0, 2, -2, 0]
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() =>{
                createConfetti();
                setIsHovering(true);
              }}
              onHoverEnd={() => setIsHovering(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Return to civilization 🚀
            </motion.button>
          </div>
        </Link>

        {/* Elementos decorativos animados */}
        <div className={styles.decorations}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.star}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "linear"
              }}
            >⭐</motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
}