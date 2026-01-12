// components/AnchorLink.tsx
'use client';

import { useLenis } from 'lenis/react';

const AnchorLink = () => {
  const lenis = useLenis();

  const handleClick = () => {
    // The scrollTo method is also typed
    lenis?.scrollTo('#target-section', { duration: 1 });
  };

  return (
    <span onClick={handleClick} style={{ cursor: 'pointer' }}>
      Scroll to Target Section
    </span>
  );
};

export default AnchorLink;
