"use client"; // 新增這一行以解決伺服器元件問題

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Heart, PlusCircle, Search } from 'lucide-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// 故事資料庫，未來可從API或外部檔案載入
// Story library data, can be loaded from an API or external file in the future
const stories = [
  {
    id: 'story-1',
    title: '小熊的野餐日',
    coverUrl: '/img/1.jpg',
    category: '仁愛',
    isNew: false,
    isPopular: true,
    pages: [
      {
        illustrationUrl: '/img/1.jpg',
        text: '今天是個晴朗的好天氣，小熊揉了揉眼睛，從暖暖的被窩裡爬了出來。',
      },
      {
        illustrationUrl: '/img/2.jpg',
        text: '小熊決定要和朋友們一起去野餐。他走進廚房，準備了好吃的蜂蜜和果醬。',
        interactiveContent: {
          type: 'multiple-choice',
          question: '小熊為朋友們準備了什麼好吃的食物？',
          options: ['三明治', '蜂蜜和果醬', '巧克力蛋糕'],
          correctAnswer: '蜂蜜和果醬'
        },
      },
      {
        illustrationUrl: '/img/3.jpg',
        text: '他背上裝滿食物的籃子，開心地哼著歌，往森林裡走去。',
      },
      {
        illustrationUrl: '/img/4.jpg',
        text: '走著走著，小熊遇見了正在採花的兔子。兔子看到小熊，開心地說：「野餐！我也要去！」',
        interactiveContent: {
          type: 'text-prompt',
          text: '（家長/老師可問）「小兔子為什麼看起來這麼開心？」、「你覺得小熊會答應讓小兔子一起去嗎？」',
        },
      },
      {
        illustrationUrl: '/img/5.jpg',
        text: '他們又遇見了小松鼠和狐狸，大家一起開心地到大樹下野餐。',
        interactiveContent: {
          type: 'text-prompt',
          text: '（家長/老師可問）「故事裡總共有哪些動物朋友呢？」、「野餐時，他們可能會玩什麼遊戲？」',
        },
      },
      {
        illustrationUrl: '/img/6.jpg',
        text: '這真是個充滿歡笑與美食的野餐日！',
      },
    ],
  },
  {
    id: 'story-2',
    title: '小鴨子學游泳',
    coverUrl: '/img/2-0.jpg',
    category: '堅毅',
    isNew: true,
    isPopular: false,
    pages: [
      {
        illustrationUrl: '/img/2-1.jpg',
        text: '在一個陽光明媚的早晨，池塘邊，一隻名叫樂樂的小鴨子，圓滾滾的眼睛好奇地望著寬廣的水面。水面波光粼粼，像一面閃閃發光的鏡子，吸引著他，卻又讓他感到一點點害怕。',
      },
      {
        illustrationUrl: '/img/2-2.jpg',
        text: '鴨媽媽莉莉溫柔地走到樂樂身邊，輕輕地用翅膀碰了碰他。「別怕，寶貝，」她輕聲說道：「試著把你的小腳放進水裡，你會發現水很溫柔的。」',
        interactiveContent: {
          type: 'multiple-choice',
          question: '小鴨子第一次嘗試時，是先做什麼？',
          options: ['跳進水裡', '把一隻腳伸進水中', '找朋友幫忙'],
          correctAnswer: '把一隻腳伸進水中'
        },
      },
      {
        illustrationUrl: '/img/2-3.jpg',
        text: '樂樂鼓起勇氣，深吸一口氣，小心翼翼地把一隻粉嫩的小腳伸進水中。冰涼的感覺讓他驚訝地抖了一下，水珠濺起，像小小的鑽石。',
      },
      {
        illustrationUrl: '/img/2-4.jpg',
        text: '接著，他發現水並沒有那麼可怕，反而有點舒服。樂樂開心地划動著兩隻小腳，在水面上游來游去，感覺自己就像一個小小船長，駕駛著自己的小船。',
        interactiveContent: {
          type: 'text-prompt',
          text: '（家長/老師可問）「小鴨子現在的心情是什麼樣子？」、「你覺得學會游泳後，他會想去哪裡？」',
        },
      },
    ],
  },
  {
    id: 'story-3',
    title: '小小太空人',
    coverUrl: '/img/3-0.jpg',
    category: '同理心',
    isNew: true,
    isPopular: true,
    pages: [
      {
        illustrationUrl: '/img/3-1.jpg',
        text: '晚上，小小太空人李奧穿上他閃亮的太空衣，他的房間變成了一個發射中心。他準備好，要從這裡飛向遙遠的太空，展開一場奇妙的冒險。',
      },
      {
        illustrationUrl: '/img/3-2.jpg',
        text: '他坐進自己的小火箭，按下啟動按鈕。轟隆隆！火箭發出巨大的聲響，緩緩升空。李奧揮手告別他的小床和玩具。',
      },
      {
        illustrationUrl: '/img/3-3.jpg' ,
        text: '火箭加速向上，穿越了厚厚的雲層。雲朵像棉花糖一樣，在窗外快速掠過，李奧感覺自己像一隻自由飛翔的小鳥。',
      },
      {
        illustrationUrl: '/img/3-4.jpg' ,
        text: '很快，他們衝出了大氣層，進入了浩瀚的宇宙。四周是無邊無際的黑暗，點綴著無數閃閃發光的星星，就像灑在黑色絲絨上的鑽石。',
      },
      {
        illustrationUrl: '/img/3-5.jpg' ,
        text: '李奧駕駛著火箭，直奔那顆在夜空中最亮、最圓的星球——月球。月球越來越近，他甚至能看到月球表面的坑洞。',
      },
      {
        illustrationUrl: '/img/3-6.jpg' ,
        text: '火箭輕輕地降落在月球表面。李奧小心翼翼地走出艙門，感受著月球上輕飄飄的感覺。他邁出了一小步，卻是人類的一大步！',
      },
      {
        illustrationUrl: '/img/3-7.jpg' ,
        text: '在月球上，李奧遇到了一個名叫閃閃的友好小外星人。閃閃有著大大的眼睛和會發光的觸角，牠好奇地看著李奧。',
      },
      {
        illustrationUrl: '/img/3-8.jpg' ,
        text: '火李奧和閃閃一起在月球表面跳躍。他們還用月球塵土堆了一個迷你銀河系。',
      },
      {
        illustrationUrl: '/img/3-9.jpg' ,
        text: '天快亮了，是時候回家了。李奧和閃閃互相告別，約定下次再見。李奧帶著滿滿的回憶和一顆閃閃送的月亮石，回到了火箭。',
      },
      {
        illustrationUrl: '/img/3-10.jpg' ,
        text: '火箭再次升空，李奧透過窗戶看著月球漸漸變小，星星再次閃爍。他知道，這趟太空之旅將是他永遠珍藏的秘密。',
      }
    ],
  },
];

// 定義分類並排序，以便在圖書館頁面中顯示
// Define and sort categories for display on the library page
const categories = [
  '堅毅', '尊重他人', '責任感', '國民身份認同', '承擔精神', '誠信', 
  '仁愛', '守法', '同理心', '勤勞', '團結', '孝親', '其他正確價值觀'
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

/* For fade-in-down animation of the modal */
@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out forwards;
}

/* For story card hover effect */
.story-card-container {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.story-card-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
`;

// Story Card component for reusability
const StoryCard = ({ story, onSelectStory }) => (
  <div
    onClick={() => onSelectStory(story)}
    className="cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl flex-none w-56 mx-2"
  >
    <div className="relative">
      <img
        src={story.coverUrl}
        alt={story.title}
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      {story.isPopular && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Heart size={12} className="mr-1" fill="currentColor" /> 熱門
        </span>
      )}
      {story.isNew && (
        <span className="absolute top-2 right-2 bg-green-400 text-green-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <PlusCircle size={12} className="mr-1" /> 最新
        </span>
      )}
    </div>
    <div className="p-4 text-center">
      <h3 className="text-xl font-semibold text-gray-800 truncate">{story.title}</h3>
    </div>
  </div>
);

// New Library View Component
const LibraryView = ({ stories, onSelectStory }) => {
  const newStories = stories.filter(story => story.isNew);
  const popularStories = stories.filter(story => story.isPopular);

  // 根據分類將故事分組
  const groupedStories = stories.reduce((acc, story) => {
    const category = story.category || '其他正確價值觀';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(story);
    return acc;
  }, {});

  return (
    <div className="relative w-full h-full p-6 md:p-8 flex flex-col items-center overflow-y-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-wide">兒童繪本閱讀應用程式</h1>
        <p className="text-xl text-gray-500 mt-2">選擇一本你喜歡的繪本，開始閱讀吧！</p>
      </div>
      
      {/* 熱門故事 */}
      {popularStories.length > 0 && (
        <div className="w-full mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
            <Heart className="mr-2 text-red-500" /> 熱門故事
          </h2>
          <div className="flex story-card-container -mx-2 pb-4">
            {popularStories.map(story => (
              <StoryCard key={story.id} story={story} onSelectStory={onSelectStory} />
            ))}
          </div>
        </div>
      )}
      
      {/* 最新上架 */}
      {newStories.length > 0 && (
        <div className="w-full mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center">
            <PlusCircle className="mr-2 text-green-500" /> 最新上架
          </h2>
          <div className="flex story-card-container -mx-2 pb-4">
            {newStories.map(story => (
              <StoryCard key={story.id} story={story} onSelectStory={onSelectStory} />
            ))}
          </div>
        </div>
      )}
      
      {/* 所有故事，按類別分組顯示 */}
      <div className="w-full">
        {categories.map(category => (
          groupedStories[category] && groupedStories[category].length > 0 && (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedStories[category].map(story => (
                  <StoryCard key={story.id} story={story} onSelectStory={onSelectStory} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

// New Story View Component
const StoryView = ({ currentStory, currentPage, currentPageIndex, totalPages, onBack, onNext, onPrevious, onRestart }) => {
  // useRef to fix the findDOMNode issue with CSSTransition
  const pageRef = useRef(null);
  
  return (
    // 調整容器以適應橫向 iPad 佈局
    <div className="relative w-full h-full max-w-screen-2xl mx-auto p-4 md:p-8 bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-between">
      <div className="text-center w-full">
        <button
          onClick={onBack}
          className="absolute top-6 left-6 p-2 md:p-3 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200 flex items-center"
        >
          <ChevronLeft size={24} className="inline-block mr-1" />
          <span className="hidden md:inline-block">返回</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{currentStory.title}</h1>
        <p className="text-lg text-gray-500 mt-2">第 {currentPageIndex + 1} 頁 / 共 {totalPages} 頁</p>
      </div>

      {/* 主要內容區域，已修改為橫向並排佈局 */}
      {/* Main content area, modified to a side-by-side landscape layout */}
      <div className="relative w-full flex-grow flex flex-row items-center justify-center space-x-4 md:space-x-8 mt-6">
        {/* 圖片容器 */}
        <TransitionGroup className="relative w-1/2 h-full overflow-hidden rounded-2xl shadow-lg">
          <CSSTransition
            key={currentPageIndex}
            nodeRef={pageRef}
            timeout={300}
            classNames="page"
          >
            <img
              ref={pageRef}
              src={currentPage.illustrationUrl}
              alt={`插圖 ${currentPageIndex + 1}`}
              className="w-full h-full object-contain rounded-2xl"
            />
          </CSSTransition>
        </TransitionGroup>
        
        {/* 文字容器 */}
        <div className="w-1/2 h-full p-4 md:p-6 bg-blue-50 rounded-2xl shadow-inner flex items-center justify-center">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            {currentPage.text}
          </p>
        </div>
      </div>

      {/* 導覽按鈕 */}
      <div className="flex justify-between w-full mt-4 md:mt-8">
        <button
          onClick={onPrevious}
          disabled={currentPageIndex === 0}
          className="flex items-center justify-center p-3 md:p-4 bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md transition-all duration-200"
        >
          <ChevronLeft size={24} className="text-gray-800" />
          <span className="ml-2 text-lg font-bold hidden md:inline">上一頁</span>
        </button>
        
        {currentPageIndex === totalPages - 1 ? (
          <button
            onClick={onRestart}
            className="flex items-center justify-center p-3 md:p-4 bg-blue-500 hover:bg-blue-600 rounded-full shadow-md transition-all duration-200 text-white"
          >
            <span className="mr-2 text-lg font-bold">重頭再來</span>
            <ChevronRight size={24} />
          </button>
        ) : (
          <button
            onClick={onNext}
            disabled={currentPageIndex === totalPages - 1}
            className="flex items-center justify-center p-3 md:p-4 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-md transition-all duration-200 text-white"
          >
            <span className="mr-2 text-lg font-bold hidden md:inline">下一頁</span>
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

// Main App component
export default function App() {
  const [view, setView] = useState('library'); // 'library' or 'story'
  const [currentStory, setCurrentStory] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);
  const [interactiveContent, setInteractiveContent] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState('');

  const handleSelectStory = (story) => {
    setCurrentStory(story);
    setCurrentPageIndex(0); // Reset page index when a new story is selected
    setIsQuestionVisible(false); // Hide any question prompts
    setInteractiveContent(null);
    setAnswerFeedback('');
    setView('story');
  };

  const handleBackToLibrary = () => {
    setView('library');
    setCurrentStory(null);
  };
  
  const currentPage = currentStory ? currentStory.pages[currentPageIndex] : null;
  const totalPages = currentStory ? currentStory.pages.length : 0;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      const nextPage = currentStory.pages[currentPageIndex + 1];
      setCurrentPageIndex(prevIndex => prevIndex + 1);
      
      if (nextPage.interactiveContent) {
        setInteractiveContent(nextPage.interactiveContent);
        setIsQuestionVisible(true);
      } else {
        setIsQuestionVisible(false);
        setInteractiveContent(null);
        setAnswerFeedback('');
      }
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prevIndex => prevIndex - 1);
      setIsQuestionVisible(false);
      setInteractiveContent(null);
      setAnswerFeedback('');
    }
  };
  
  const handleRestart = () => {
    setCurrentPageIndex(0);
    setIsQuestionVisible(false);
    setInteractiveContent(null);
    setAnswerFeedback('');
  };
  
  const handleCloseInteractiveContent = () => {
    setIsQuestionVisible(false);
    setAnswerFeedback('');
  };
  
  const handleAnswer = (selectedOption) => {
    if (interactiveContent.type === 'multiple-choice') {
      if (selectedOption === interactiveContent.correctAnswer) {
        setAnswerFeedback('答對了！');
      } else {
        setAnswerFeedback(`答錯了，正確答案是：${interactiveContent.correctAnswer}`);
      }
    }
  };

  return (
    <div className="font-sans antialiased bg-white min-h-screen flex items-center justify-center">
      <style>{css}</style>
      
      {view === 'library' ? (
        <LibraryView stories={stories} onSelectStory={handleSelectStory} />
      ) : (
        <div className="relative w-full h-full p-6 md:p-8 flex flex-col items-center justify-center">
          <StoryView
            currentStory={currentStory}
            currentPage={currentPage}
            currentPageIndex={currentPageIndex}
            totalPages={totalPages}
            onBack={handleBackToLibrary}
            onNext={handleNextPage}
            onPrevious={handlePreviousPage}
            onRestart={handleRestart}
          />
        </div>
      )}
      
      {isQuestionVisible && interactiveContent && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg p-6 md:p-8 text-center relative animate-fade-in-down">
            <button
              onClick={handleCloseInteractiveContent}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
            
            {interactiveContent.type === 'multiple-choice' ? (
              <>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">問題與挑戰</h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                  {interactiveContent.question}
                </p>
                <div className="flex flex-col space-y-3">
                  {interactiveContent.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full p-3 md:p-4 bg-gray-100 rounded-xl text-lg font-medium text-gray-800 hover:bg-gray-200 transition-colors duration-200 shadow-sm"
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {answerFeedback && (
                  <p className="mt-4 text-lg font-bold text-green-600">
                    {answerFeedback}
                  </p>
                )}
              </>
            ) : (
              <>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">對話式閱讀提示</h3>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  {interactiveContent.text}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
