import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { Widget, WidgetType } from '../pages/CustomPage';

interface CustomPage {
  id: string;
  title: string;
  widgets: Widget[];
  layout: Layout[];
}

interface CustomPagesContextType {
  pages: CustomPage[];
  addPage: (title: string) => void;
  removePage: (id: string) => void;
  addWidgetToPage: (pageId: string, type: WidgetType, title: string, isHeart?: boolean) => void;
  removeWidgetFromPage: (pageId: string, widgetId: string) => void;
  updatePageLayout: (pageId: string, layout: Layout[]) => void;
  copyWidget: (pageId: string, widgetId: string) => void;
}

const CustomPagesContext = createContext<CustomPagesContextType | undefined>(undefined);

export const useCustomPages = () => {
  const context = useContext(CustomPagesContext);
  if (!context) {
    throw new Error('useCustomPages must be used within a CustomPagesProvider');
  }
  return context;
};

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
      id: Math.random().toString(36).substr(2, 9),
      title,
      widgets: [],
      layout: []
    };
    setPages([...pages, newPage]);
  };

  const removePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  const addWidgetToPage = (pageId: string, type: WidgetType, title: string, isHeart: boolean = false) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const widgetId = Math.random().toString(36).substr(2, 9);
        const newWidget: Widget = {
          id: widgetId,
          type,
          title,
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
          const newWidgetId = Math.random().toString(36).substr(2, 9);
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

  return (
    <CustomPagesContext.Provider value={{
      pages,
      addPage,
      removePage,
      addWidgetToPage,
      removeWidgetFromPage,
      updatePageLayout,
      copyWidget
    }}>
      {children}
    </CustomPagesContext.Provider>
  );
}; 