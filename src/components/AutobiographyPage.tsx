'use client';

import { forwardRef } from 'react';

interface AutobiographyPageProps {
  content: string;
  pageNumber: number;
  isFirstPage?: boolean;
  isTableOfContents?: boolean;
}

const AutobiographyPage = forwardRef<HTMLDivElement, AutobiographyPageProps>(
  ({ content, pageNumber, isFirstPage = false, isTableOfContents = false }, ref) => {
    if (isFirstPage) {
      return (
        <div ref={ref} className="cover-page">
          <h1>MY STORY</h1>
          <div className="subtitle">A Life Worth Living</div>
          <div className="text-lg">An Autobiography</div>
        </div>
      );
    }

    if (isTableOfContents) {
      return (
        <div ref={ref} className="table-of-contents">
          <h2>TABLE OF CONTENTS</h2>
          <div className="space-y-2">
            <div className="chapter-line">
              <span className="chapter-title">Chapter 1: The Beginning</span>
              <span className="page-number">3</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 2: Growing Up</span>
              <span className="page-number">12</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 3: Finding My Path</span>
              <span className="page-number">23</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 4: Love and Loss</span>
              <span className="page-number">34</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 5: Career Milestones</span>
              <span className="page-number">45</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 6: Life Lessons</span>
              <span className="page-number">56</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 7: Family and Friends</span>
              <span className="page-number">67</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 8: Challenges Overcome</span>
              <span className="page-number">78</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 9: Dreams Realized</span>
              <span className="page-number">89</span>
            </div>
            <div className="chapter-line">
              <span className="chapter-title">Chapter 10: Looking Forward</span>
              <span className="page-number">98</span>
            </div>
            <div className="chapter-line mt-4">
              <span className="chapter-title">Epilogue</span>
              <span className="page-number">105</span>
            </div>
          </div>
        </div>
      );
    }

    const formatContent = (text: string) => {
      const lines = text.split('\n').filter(line => line.trim() !== '');
      const elements = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('CHAPTER') || line.startsWith('EPILOGUE')) {
          elements.push(<h2 key={i} className="chapter-title">{line}</h2>);
        } else if (line.length < 50 && !line.includes('.') && i === 1) {
          elements.push(<h1 key={i}>{line}</h1>);
        } else {
          elements.push(<p key={i}>{line}</p>);
        }
      }
      
      return elements;
    };

    return (
      <div ref={ref} className="autobiography-page p-8">
        <div className="h-full flex flex-col justify-between">
          <div className="flex-1">
            {formatContent(content)}
          </div>
          <div className="text-center mt-8">
            <div className="page-number text-sm text-gray-500">{pageNumber}</div>
          </div>
        </div>
      </div>
    );
  }
);

AutobiographyPage.displayName = 'AutobiographyPage';

export default AutobiographyPage;