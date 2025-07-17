'use client';

import { useRef, useEffect, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

interface PageFlipBookProps {
  pages: string[];
  onFlip?: (pageObject: any) => void;
  className?: string;
  width?: number;
  height?: number;
}

const PageFlipBook = forwardRef<any, PageFlipBookProps>(({ 
  pages, 
  onFlip, 
  className = '',
  width = 300,
  height = 400
}, ref) => {
  return (
    <div className={`pageflip-book ${className}`}>
      <HTMLFlipBook
        ref={ref}
        width={width}
        height={height}
        size="stretch"
        minWidth={200}
        maxWidth={600}
        minHeight={300}
        maxHeight={600}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={false}
        onFlip={onFlip}
        className="demo-book"
      >
        {pages.map((content, index) => (
          <div key={index} className="demoPage">
            <div className="page-content">
              <div className="page-header">
                <h2>Page {index + 1}</h2>
              </div>
              <div className="page-body">
                <p>{content}</p>
              </div>
              <div className="page-footer">
                <div className="page-number">{index + 1}</div>
              </div>
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
});

PageFlipBook.displayName = 'PageFlipBook';

export default PageFlipBook;