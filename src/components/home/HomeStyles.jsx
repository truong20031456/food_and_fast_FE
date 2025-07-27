import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Button, Box, Typography, GlobalStyles } from '@mui/material';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';

// Animations
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;
export const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;
export const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(5deg); }
  50% { transform: translateY(0px) rotate(0deg); }
  75% { transform: translateY(-10px) rotate(-5deg); }
`;
export const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

// Add missing keyframes
export const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

export const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
`;

export const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
export const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, rgba(255, 107, 107, 0.9) 0%, rgba(255, 142, 83, 0.9) 50%, rgba(255, 193, 7, 0.9) 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  color: 'white',
  padding: theme.spacing(20, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)`,
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  }
}));

export const FloatingElements = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  pointerEvents: 'none',
  '& .floating-circle': {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    animation: `${float} 8s ease-in-out infinite`,
    filter: 'blur(1px)',
  },
  '& .circle-1': {
    width: '100px', height: '100px', top: '20%', left: '10%', animationDelay: '0s', background: 'rgba(255, 255, 255, 0.15)',
  },
  '& .circle-2': {
    width: '150px', height: '150px', top: '60%', right: '10%', animationDelay: '2s', background: 'rgba(255, 193, 7, 0.15)',
  },
  '& .circle-3': {
    width: '80px', height: '80px', top: '10%', right: '20%', animationDelay: '4s', background: 'rgba(255, 142, 83, 0.15)',
  },
  '& .circle-4': {
    width: '120px', height: '120px', bottom: '10%', left: '15%', animationDelay: '6s', background: 'rgba(255, 107, 107, 0.15)',
  }
});

export const ParticleBox = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  '& .particle': {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '50%',
    pointerEvents: 'none',
  }
});

// Particle animation
export const Particles = () => {
  useEffect(() => {
    const particleContainer = document.getElementById('particle-container');
    if (!particleContainer) return;
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.5 + 0.3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${left}%`;
      particle.style.bottom = '-10px';
      particle.style.opacity = opacity;
      particle.style.animation = `floatUp ${animationDuration}s linear infinite`;
      particleContainer.appendChild(particle);
      setTimeout(() => { particle.remove(); }, animationDuration * 1000);
    };
    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  return <ParticleBox id="particle-container"></ParticleBox>;
};

// Gradient Button
export const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  borderRadius: '50px',
  padding: '14px 36px',
  fontSize: '1.1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    background: 'linear-gradient(135deg, #ff5252 0%, #ff7043 100%)',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 40px rgba(255, 107, 107, 0.4)',
    '&::before': { left: '100%' },
  },
}));

// Global style for particles (inject keyframes floatUp)
export const GlobalParticleStyles = () => (
  <GlobalStyles styles={{
    '@keyframes floatUp': {
      to: { bottom: '100%', opacity: 0 }
    }
  }} />
);

// Animated Title
export const AnimatedTitle = styled(Typography)(({ theme }) => ({
  animation: `${fadeInScale} 1.2s ease-out`,
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffc107 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  position: 'relative',
  '&::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -1,
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 50%, #ffc107 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'blur(10px)',
    opacity: 0.5,
  }
}));

// Feature Card
export const FeatureCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  '& .card-inner': {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '24px',
    overflow: 'hidden',
    border: 'none',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
    position: 'relative',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(135deg, transparent 0%, rgba(255, 107, 107, 0.05) 50%, transparent 100%)`,
      opacity: 0,
      transition: 'opacity 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-15px) scale(1.03)',
      boxShadow: '0 25px 60px rgba(255, 107, 107, 0.2)',
      '&::before': {
        opacity: 1,
      },
    },
  }
}));

// Icon Wrapper
export const IconWrapper = styled(motion.div)(({ theme }) => ({
  width: '90px',
  height: '90px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  color: 'white',
  fontSize: '2.5rem',
  boxShadow: '0 10px 30px rgba(255, 107, 107, 0.4)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
    filter: 'blur(20px)',
    opacity: 0.5,
    zIndex: -1,
  }
}));

// Animation Variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};
export const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Food Card
export const FoodCard = styled(motion.div)(({ theme }) => ({
  '& .card-inner': {
    borderRadius: '24px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.7) 100%)',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: 1,
    },
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)',
      '&::before': {
        opacity: 1,
      },
      '& .card-media': {
        transform: 'scale(1.1)',
      },
    },
  },
  '& .card-media': {
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  }
}));

// Pulse animation đã có ở trên
// Scale animation cho card
export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Add missing styled components
export const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
}));

export const TestimonialCard = styled(motion.div)(({ theme }) => ({
  '& .paper-inner': {
    padding: theme.spacing(4),
    borderRadius: '24px',
    background: 'linear-gradient(145deg, #ffffff 0%, #fef7f0 100%)',
    border: '2px solid transparent',
    backgroundClip: 'padding-box',
    position: 'relative',
    transition: 'all 0.4s ease',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: '24px',
      background: 'linear-gradient(135deg, #ff6b6b, #ffc107)',
      margin: '-2px',
      opacity: 0,
      transition: 'opacity 0.4s ease',
      zIndex: -1,
    },
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 50px rgba(255, 107, 107, 0.15)',
      '&::before': {
        opacity: 1,
      },
    },
  }
}));

