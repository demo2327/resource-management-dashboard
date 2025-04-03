/**
 * Custom Pages Context
 * 
 * This module implements a React Context for managing custom pages and their widgets
 * in a dashboard-style application. It demonstrates advanced React patterns including:
 * 
 * Technical Concepts:
 * 1. React Context API for global state management
 * 2. TypeScript interfaces for type safety
 * 3. Local Storage integration for persistence
 * 4. React Grid Layout integration for widget positioning
 * 5. Custom hooks for context consumption
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Layout } from 'react-grid-layout';
import { Widget, WidgetType } from '../pages/CustomPage';

/**
 * CustomPage Interface
 * 
 * Defines the structure of a custom dashboard page
 * @property {string} id - Unique identifier for the page
 * @property {string} title - Display title of the page
 * @property {Widget[]} widgets - Array of widgets on the page
 * @property {Layout[]} layout - React-grid-layout configuration for widget positioning
 */
interface CustomPage {
  id: string;
  title: string;
  widgets: Widget[];
  layout: Layout[];
}

/**
 * CustomPagesContextType Interface
 * 
 * Defines the shape of the context value object
 * Includes all methods for managing pages and their widgets
 */
interface CustomPagesContextType {
  pages: CustomPage[];
  addPage: (title: string) => void;
  removePage: (id: string) => void;
  addWidgetToPage: (pageId: string, type: WidgetType, title: string, isHeart?: boolean) => void;
  removeWidgetFromPage: (pageId: string, widgetId: string) => void;
  updatePageLayout: (pageId: string, layout: Layout[]) => void;
  copyWidget: (pageId: string, widgetId: string) => void;
  resetAllPages: () => void;
  updatePageTitle: (pageId: string, newTitle: string) => void;
  updateWidgetTitle: (pageId: string, widgetId: string, newTitle: string) => void;
  importPage: (config: CustomPage) => void;
}

// Create context with default values
const CustomPagesContext = createContext<CustomPagesContextType>({
  pages: [],
  addPage: () => {},
  removePage: () => {},
  addWidgetToPage: () => {},
  removeWidgetFromPage: () => {},
  updatePageLayout: () => {},
  copyWidget: () => {},
  resetAllPages: () => {},
  updatePageTitle: () => {},
  updateWidgetTitle: () => {},
  importPage: () => {},
});

/**
 * Custom hook for consuming the CustomPages context
 * 
 * @throws {Error} If used outside of CustomPagesProvider
 * @returns {CustomPagesContextType} The context value object
 */
export const useCustomPages = () => {
  const context = useContext(CustomPagesContext);
  if (!context) {
    throw new Error('useCustomPages must be used within a CustomPagesProvider');
  }
  return context;
};

/**
 * CustomPagesProvider Component
 * 
 * Provides the CustomPages context to its children
 * Manages state and persistence of custom pages
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const CustomPagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or empty array
  const [pages, setPages] = useState<CustomPage[]>(() => {
    const savedPages = localStorage.getItem('customPages');
    return savedPages ? JSON.parse(savedPages) : [];
  });

  // Persist pages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customPages', JSON.stringify(pages));
  }, [pages]);

  /**
   * Creates a new custom page
   * @param {string} title - The title for the new page
   */
  const addPage = (title: string) => {
    const newPage: CustomPage = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      widgets: [],
      layout: []
    };
    setPages([...pages, newPage]);
  };

  /**
   * Removes a page by its ID
   * @param {string} id - The ID of the page to remove
   */
  const removePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id));
  };

  /**
   * Adds a new widget to a specific page
   * @param {string} pageId - The ID of the target page
   * @param {WidgetType} type - The type of widget to add
   * @param {string} title - The title for the new widget
   * @param {boolean} [isHeart=false] - Whether the widget is favorited
   */
  const addWidgetToPage = (pageId: string, type: WidgetType, title: string, isHeart: boolean = false) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        const widgetId = Math.random().toString(36).substr(2, 9);
        const newWidget: Widget = {
          id: widgetId,
          type,
          title,
          isHeart,
          x: (page.layout.length * 2) % 12, // Ensure widgets stay within 12-column grid
          y: Infinity, // Place at bottom
          w: 6, // Default width of 6 columns
          h: 4  // Default height of 4 rows
        };
        const newLayout: Layout = {
          i: widgetId,
          x: newWidget.x,
          y: newWidget.y,
          w: newWidget.w,
          h: newWidget.h
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

  /**
   * Removes a widget from a specific page
   * @param {string} pageId - The ID of the page containing the widget
   * @param {string} widgetId - The ID of the widget to remove
   */
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

  /**
   * Updates the layout of widgets on a specific page
   * @param {string} pageId - The ID of the page to update
   * @param {Layout[]} layout - The new layout configuration
   */
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

  /**
   * Creates a copy of an existing widget
   * @param {string} pageId - The ID of the page containing the widget
   * @param {string} widgetId - The ID of the widget to copy
   */
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

  /**
   * Resets the application state by removing all pages and clearing localStorage
   * Also cleans up any related layout and widget position data
   */
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

  /**
   * Updates the title of a specific page
   * @param {string} pageId - The ID of the page to update
   * @param {string} newTitle - The new title for the page
   */
  const updatePageTitle = (pageId: string, newTitle: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          title: newTitle
        };
      }
      return page;
    }));
  };

  /**
   * Updates the title of a specific widget
   * @param {string} pageId - The ID of the page containing the widget
   * @param {string} widgetId - The ID of the widget to update
   * @param {string} newTitle - The new title for the widget
   */
  const updateWidgetTitle = (pageId: string, widgetId: string, newTitle: string) => {
    setPages(pages.map(page => {
      if (page.id === pageId) {
        return {
          ...page,
          widgets: page.widgets.map(widget => {
            if (widget.id === widgetId) {
              return {
                ...widget,
                title: newTitle
              };
            }
            return widget;
          })
        };
      }
      return page;
    }));
  };

  /**
   * Imports a page from a configuration object
   * @param {CustomPage} config - The page configuration to import
   */
  const importPage = (config: CustomPage) => {
    // Validate required fields
    if (!config.title || !Array.isArray(config.widgets) || !Array.isArray(config.layout)) {
      throw new Error('Invalid page configuration');
    }

    // Generate new IDs for widgets to avoid conflicts
    const widgetIdMap = new Map<string, string>();
    const newWidgets = config.widgets.map(widget => {
      const newId = Math.random().toString(36).substr(2, 9);
      widgetIdMap.set(widget.id, newId);
      return { ...widget, id: newId };
    });

    // Update layout with new widget IDs
    const newLayout = config.layout.map(item => ({
      ...item,
      i: widgetIdMap.get(item.i) || item.i
    }));

    // Create new page with imported configuration
    const newPage: CustomPage = {
      id: Math.random().toString(36).substr(2, 9),
      title: config.title,
      widgets: newWidgets,
      layout: newLayout
    };

    // Restore S3 table filters if they exist in the config
    config.widgets.forEach((widget: any) => {
      if (widget.type === 's3-buckets' && widget.filters) {
        const newWidgetId = widgetIdMap.get(widget.id);
        if (newWidgetId) {
          localStorage.setItem(`s3-buckets-filters-${newWidgetId}`, JSON.stringify(widget.filters));
        }
      }
    });

    setPages([...pages, newPage]);
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
        resetAllPages,
        updatePageTitle,
        updateWidgetTitle,
        importPage
      }}
    >
      {children}
    </CustomPagesContext.Provider>
  );
}; 