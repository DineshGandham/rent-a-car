import { useEffect, useState } from 'react';

export function useLayout() {
  const [paddingTop, setPaddingTop] = useState(64);

  useEffect(() => {
    const nav = document.querySelector('header');
    if (nav) {
      setPaddingTop(nav.offsetHeight);
    }
  }, []);

  return { paddingTop };
}
