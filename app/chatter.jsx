import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// 故事資料，包含繪本頁面和問題提示。
// This is the story data, including book pages and question prompts.
const stories = [
  {
    id: 'story-1',
    title: '小熊的野餐日',
    pages: [
      {
        illustrationUrl: 'https://placehold.co/1024x768/007bff/fff?text=小熊醒來了！',
        text: '今天是個晴朗的好天氣，小熊揉了揉眼睛，從暖暖的被窩裡爬了出來。',
      },
      {
        illustrationUrl: 'https://placehold.co/1024x768/4CAF50/fff?text=小熊在廚房準備',
        text: '小熊決定要和朋友們一起去野餐。他走進廚房，準備了好吃的蜂蜜和果醬。',
        question: {
          text: '（家長/老師可問）「小熊在廚房裡做什麼呢？」、「你猜他還會帶什麼東西去野餐？」',
        },
      },
      {
        illustrationUrl: 'https://placehold.co/1024x768/FFC107/fff?text=小熊出發囉！',
        text: '他背上裝滿食物的籃子，開心地哼著歌，往森林裡走去。',
      },
      {
        illustrationUrl: 'https://placehold.co/1024x768/2196F3/fff?text=遇見小兔子',
        text: '走著走著，小熊遇見了正在採花的兔子。兔子看到小熊，開心地說：「野餐！我也要去！」',
        question: {
          text: '（家長/老師可問）「小兔子為什麼看起來這麼開心？」、「你覺得小熊會答應讓小兔子一起去嗎？」',
        },
      },
      {
        illustrationUrl: 'https://placehold.co/1024x768/9C27B0/fff?text=大家都來了',
        text: '他們又遇見了小松鼠和狐狸，大家一起開心地到大樹下野餐。',
        question: {
          text: '（家長/老師可問）「故事裡總共有哪些動物朋友呢？」、「野餐時，他們可能會玩什麼遊戲？」',
        },
      },
      {
        illustrationUrl: 'https://placehold.co/1024x768/E91E63/fff?text=快樂的野餐日',
        text: '這真是個充滿歡笑與美食的野餐日！',
      },
    ],
  },
];

// 設定 CSS 動畫效果
// Setting up CSS animation effects
const css = `
.page-enter {
  opacity: 0;
  transform: scale(0.95);
}
.page-enter-active {
  opacity: 1;
  transform: scale(1);
  transition: opacity 300ms, transform 300ms;
}
.page-exit {
  opacity: 1;
}
.page-exit-active {
  opacity: 0;
  position: absolute;
  transition: opacity 300ms, transform 300ms;
  transform: scale(1.05);
}
`;

export default function App() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // 為了簡單起見，我們只使用第一個故事。
  // For simplicity, we are only using the first story.
  const currentStory = stories[0];
  const currentPage = currentStory.pages[currentPageIndex];
  
  // 處理切換到下一頁的邏輯
  // Logic for moving to the next page
  const handleNextPage = () => {
    if (currentPageIndex < currentStory.pages.length - 1) {
      const nextPage = currentStory.pages[currentPageIndex + 1];
      setCurrentPageIndex(prevIndex => prevIndex + 1);
      
      // 檢查下一頁是否有問題，若有則顯示。
      // Check if the next page has a question, and if so, show it.
      if (nextPage.question) {
        setCurrentQuestion(nextPage.question);
        setIsQuestionVisible(true);
      }
    }
  };
  
  // 處理切換到上一頁的邏輯
  // Logic for moving to the previous page
  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prevIndex => prevIndex - 1);
      // 關閉任何可能正在顯示的問題提示。
      // Close any question prompts that might be visible.
      setIsQuestionVisible(false);
      setCurrentQuestion(null);
    }
  };
  
  const handleCloseQuestion = () => {
    setIsQuestionVisible(false);
  };

  return (
    <div className="font-sans antialiased bg-gray-100 min-h-screen flex items-center justify-center p-4">
      {/* 隱藏式 CSS 樣式 */}
      {/* Hidden CSS styles */}
      <style>{css}</style>
      
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col items-center">
        {/* 標題區域 */}
        {/* Title area */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{currentStory.title}</h1>
          <p className="text-lg text-gray-500 mt-2">第 {currentPageIndex + 1} 頁 / 共 {currentStory.pages.length} 頁</p>
        </div>

        {/* 主要內容區域：插圖與文字 */}
        {/* Main content area: illustration and text */}
        <div className="relative w-full flex-grow flex flex-col md:flex-row items-center justify-center md:space-x-8">
          <TransitionGroup className="relative w-full md:w-3/5 overflow-hidden rounded-2xl shadow-lg">
            <CSSTransition
              key={currentPageIndex}
              timeout={300}
              classNames="page"
            >
              <img
                src={currentPage.illustrationUrl}
                alt={`插圖 ${currentPageIndex + 1}`}
                className="w-full h-auto object-cover rounded-2xl"
              />
            </CSSTransition>
          </TransitionGroup>
          
          <div className="w-full md:w-2/5 mt-6 md:mt-0 p-4 md:p-6 bg-blue-50 rounded-2xl shadow-inner">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
              {currentPage.text}
            </p>
          </div>
        </div>

        {/* 導航按鈕區域 */}
        {/* Navigation button area */}
        <div className="flex justify-between w-full mt-8 md:mt-12">
          <button
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0}
            className="flex items-center justify-center p-3 md:p-4 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md transition-all duration-200"
          >
            <ChevronLeft size={24} className="text-gray-800" />
            <span className="ml-2 text-lg font-bold hidden md:inline">上一頁</span>
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPageIndex === currentStory.pages.length - 1}
            className="flex items-center justify-center p-3 md:p-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md transition-all duration-200 text-white"
          >
            <span className="mr-2 text-lg font-bold hidden md:inline">下一頁</span>
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* 問題提示彈窗 */}
        {/* Question prompt modal */}
        {isQuestionVisible && currentQuestion && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg p-6 md:p-8 text-center relative animate-fade-in-down">
              <button
                onClick={handleCloseQuestion}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">對話式閱讀提示</h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {currentQuestion.text}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

