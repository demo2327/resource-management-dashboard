import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';

interface Widget {
  id: string;
  title: string;
  type: string;
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
  addWidgetToPage: (pageId: string, widgetType: string, title: string) => void;
  removeWidgetFromPage: (pageId: string, widgetId: string) => void;
  updatePageLayout: (pageId: string, layout: Layout[]) => void;
}

const CustomPagesContext = createContext<CustomPagesContextType>({
  pages: [],
  addPage: () => {},
  removePage: () => {},
  addWidgetToPage: () => {},
  removeWidgetFromPage: () => {},
  updatePageLayout: () => {},
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

  const addWidgetToPage = (pageId: string, widgetType: string, title: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const newWidget: Widget = {
          id: `widget-${Date.now()}`,
          title,
          type: widgetType,
        };
        const newLayout: Layout = {
          i: newWidget.id,
          x: (page.layout.length * 6) % 12,
          y: Math.floor(page.layout.length / 2) * 4,
          w: 6,
          h: 4,
        };
        return {
          ...page,
          widgets: [...page.widgets, newWidget],
          layout: [...page.layout, newLayout],
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
          widgets: page.widgets.filter(w => w.id !== widgetId),
          layout: page.layout.filter(l => l.i !== widgetId),
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
          layout,
        };
      }
      return page;
    }));
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
      }}
    >
      {children}
    </CustomPagesContext.Provider>
  );
}; 