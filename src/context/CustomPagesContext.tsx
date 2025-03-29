import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';

interface Widget {
  id: string;
  title: string;
  type: string;
  isHeart?: boolean;
}

export interface CustomPage {
  id: string;
  title: string;
  widgets: Widget[];
  layout: Layout[];
}

interface CustomPagesContextType {
  pages: CustomPage[];
  addPage: (title: string) => void;
  removePage: (id: string) => void;
  addWidgetToPage: (pageId: string, type: string, title: string, isHeart?: boolean) => void;
  removeWidgetFromPage: (pageId: string, widgetId: string) => void;
  updatePageLayout: (pageId: string, layout: Layout[]) => void;
  copyWidget: (pageId: string, widgetId: string) => void;
  resetAllPages: () => void;
}

const CustomPagesContext = createContext<CustomPagesContextType>({
  pages: [],
  addPage: () => {},
  removePage: () => {},
  addWidgetToPage: () => {},
  removeWidgetFromPage: () => {},
  updatePageLayout: () => {},
  copyWidget: () => {},
  resetAllPages: () => {},
});

export const useCustomPages = () => useContext(CustomPagesContext);

export const CustomPagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<CustomPage[]>(() => {
    const savedPages = localStorage.getItem('customPages');
    return savedPages ? JSON.parse(savedPages) : [];
  });

  useEffect(() => {
    localStorage.setItem('customPages', JSON.stringify(pages));
  }, [pages]);

  const addPage = (title: string) => {
    const newPage: CustomPage = {
      id: `page-${Date.now()}`,
      title,
      widgets: [],
      layout: [],
    };
    setPages([...pages, newPage]);
  };

  const removePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const addWidgetToPage = (pageId: string, type: string, title: string, isHeart: boolean = false) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const widgetId = `widget-${Date.now()}`;
        const newWidget: Widget = {
          id: widgetId,
          title,
          type,
          isHeart
        };
        const newLayout: Layout = {
          i: widgetId,
          x: (page.layout.length * 2) % 12,
          y: Infinity,
          w: 6,
          h: 4
        };
        return {
          ...page,
          widgets: [...page.widgets, newWidget],
          layout: [...page.layout, newLayout]
        };
      }
      return page;
    }));
  };

  const removeWidgetFromPage = (pageId: string, widgetId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          widgets: page.widgets.filter(widget => widget.id !== widgetId),
          layout: page.layout.filter(item => item.i !== widgetId)
        };
      }
      return page;
    }));
  };

  const updatePageLayout = (pageId: string, layout: Layout[]) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          layout
        };
      }
      return page;
    }));
  };

  const copyWidget = (pageId: string, widgetId: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const originalWidget = page.widgets.find(w => w.id === widgetId);
        if (originalWidget) {
          const newWidgetId = `widget-${Date.now()}`;
          const newWidget: Widget = {
            ...originalWidget,
            id: newWidgetId
          };
          const newLayout: Layout = {
            i: newWidgetId,
            x: (page.layout.length * 2) % 12,
            y: Infinity,
            w: 6,
            h: 4
          };
          return {
            ...page,
            widgets: [...page.widgets, newWidget],
            layout: [...page.layout, newLayout]
          };
        }
      }
      return page;
    }));
  };

  const resetAllPages = () => {
    // Clear all pages and layouts
    setPages([]);
    
    // Clear all stored data
    localStorage.removeItem('customPages');
    localStorage.removeItem('gridLayouts');
    localStorage.removeItem('widgetPositions');
    localStorage.removeItem('lastWidgetPositions');
    
    // Clear any other related local storage items that might affect layout
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (
        key.startsWith('rgl-') || // react-grid-layout keys
        key.includes('layout') || // any layout related keys
        key.includes('widget') || // any widget related keys
        key.includes('position') // any position related keys
      )) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  };

  return (
    <CustomPagesContext.Provider
      value={{
        pages,
        addPage,
        removePage,
        addWidgetToPage,
        removeWidgetFromPage,
        updatePageLayout,
        copyWidget,
        resetAllPages
      }}
    >
      {children}
    </CustomPagesContext.Provider>
  );
}; 