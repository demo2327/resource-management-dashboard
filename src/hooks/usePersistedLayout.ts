import { useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';

const usePersistedLayout = (pageId: string, defaultLayout: Layout[]) => {
  const [layout, setLayout] = useState<Layout[]>(() => {
    const savedLayout = localStorage.getItem(`layout-${pageId}`);
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
  });

  useEffect(() => {
    localStorage.setItem(`layout-${pageId}`, JSON.stringify(layout));
  }, [layout, pageId]);

  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
  };

  return { layout, onLayoutChange };
};

export default usePersistedLayout; 