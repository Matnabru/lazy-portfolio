import { useState, useEffect, useRef } from 'react';

export interface Section {
    name: string;
    content: string[];
    company?: string;
    date?: string;
    title?: string;
    year?: string;
    demoUrl?: string;
    repoUrl?: string;
    technologies?: string;
    snippet?: string;
}


interface Category {
    title: string;
    sections: Section[];
}

interface LayoutProps {
    sections: Category[];
}

const Layout = ({ sections }: LayoutProps) => {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0); // Start with Experience (Home at 0)
    const [selectedSectionIndices, setSelectedSectionIndices] = useState<number[]>(sections.map(() => 0));
    const rightPanelRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);

    const currentCategory = sections[selectedCategoryIndex];
    const currentSectionIndex = selectedSectionIndices[selectedCategoryIndex];
    const currentSection = currentCategory.sections[currentSectionIndex];

    // Handle scrolling on the right panel
    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;


    };

    // Handle arrow key navigation and update selected section
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                if (currentSectionIndex > 0) {
                    setSelectedSectionIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        newIndices[selectedCategoryIndex] = currentSectionIndex - 1;
                        return newIndices;
                    });
                } else if (selectedCategoryIndex > 0) {
                    setSelectedCategoryIndex((prevIndex) => prevIndex - 1);
                    setSelectedSectionIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        newIndices[selectedCategoryIndex - 1] = sections[selectedCategoryIndex - 1].sections.length - 1;
                        return newIndices;
                    });
                }
            }
            if (event.key === 'ArrowDown') {
                if (currentSectionIndex < currentCategory.sections.length - 1) {
                    setSelectedSectionIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        newIndices[selectedCategoryIndex] = currentSectionIndex + 1;
                        return newIndices;
                    });
                } else if (selectedCategoryIndex < sections.length - 1) {
                    setSelectedCategoryIndex((prevIndex) => prevIndex + 1);
                    setSelectedSectionIndices((prevIndices) => {
                        const newIndices = [...prevIndices];
                        newIndices[selectedCategoryIndex + 1] = 0;
                        return newIndices;
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCategoryIndex, currentSectionIndex, sections, currentCategory.sections.length]);

    // Scroll the selected section into view when it changes
    useEffect(() => {
        if (
            sectionRefs.current[selectedCategoryIndex] &&
            sectionRefs.current[selectedCategoryIndex][currentSectionIndex]
        ) {
            sectionRefs.current[selectedCategoryIndex][currentSectionIndex]?.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'start',
            });
        }
    }, [selectedCategoryIndex, currentSectionIndex]);

    return (
        <div className="flex h-screen relative">
            {/* Left column: List of categories */}
            <div className="lg:w-1/4 w-2/5 bg-black text-white p-4 border-r border-gray-700 flex flex-col justify-between mb-1">
                {/* Home */}
                <div
                    className={`h-[10%] border mt-1 mb-1 ${selectedCategoryIndex === 0 ? 'border-blue-300' : 'border-gray-300'} cursor-pointer`}
                    onClick={() => setSelectedCategoryIndex(0)}
                >
                    <div className="bg-black lg:text-lg md:text-base text-xs pl-2 font-bold text-xl mb-3 section-top-text">
                        Home
                    </div>
                    <div className='p-1 lg:text-lg md:text-base text-xs'>
                        Hello I'm <span className='text-teal-600'>Mateusz Urbanek</span>
                        <span className='hidden md:inline'>, software engineer from <span className='text-red-600 underline'>Poland</span></span>
                    </div>
                </div>

                {/* Other categories */}
                <div className="pt-2 h-[90%] overflow-y-auto">
                    {sections.slice(1).map((category, categoryIndex) => (
                        <div
                            key={category.title}
                            className={`h-[28%] mb-4 border ${selectedCategoryIndex === categoryIndex + 1 ? 'border-blue-300' : 'border-gray-300'}`}
                        >
                            <div className="lg:text-lg md:text-base text-xs bg-black pl-2 font-bold text-xl mb-2 section-top-text">
                                {category.title}
                            </div>
                            <div className="lg:text-lg md:text-base text-xs overflow-y-auto h-[calc(100%-2rem)]">
                                {category.sections.map((section, sectionIndex) => (
                                    <div
                                        key={section.name}
                                        ref={(el) => {
                                            if (!sectionRefs.current[categoryIndex + 1]) {
                                                sectionRefs.current[categoryIndex + 1] = [];
                                            }
                                            sectionRefs.current[categoryIndex + 1][sectionIndex] = el;
                                        }}
                                        className={`p-1 pl-4 cursor-pointer border border-transparent rounded-md hover:border-gray-700 ${selectedCategoryIndex === categoryIndex + 1 &&
                                            sectionIndex === selectedSectionIndices[categoryIndex + 1]
                                            ? 'bg-gray-700 border-gray-700'
                                            : 'hover:bg-gray-700'
                                            }`}
                                        onClick={() => {
                                            setSelectedCategoryIndex(categoryIndex + 1);
                                            setSelectedSectionIndices((prevIndices) => {
                                                const newIndices = [...prevIndices];
                                                newIndices[categoryIndex + 1] = sectionIndex;
                                                return newIndices;
                                            });
                                        }}
                                    >
                                        {section.name}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm section-bottom-text">
                                <div className='bg-black'>
                                    {selectedSectionIndices[categoryIndex + 1] + 1} of {category.sections.length}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right panel: Dynamic content */}
            <div
                className="lg:text-lg md:text-base lg:w-3/4 w-3/5 p-6 bg-black text-white overflow-y-auto border border-gray-700 rounded-md"
                ref={rightPanelRef}
                onScroll={handleScroll}
            >
                <div className='m-1'>
                    {selectedCategoryIndex === 0 ? (
                        // Home section content displayed together
                        <div>
                            {sections[0].sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="mb-8"> {/* Add space after each content block */}
                                    {/* Render all elements in the content array */}
                                    {section.content.map((contentItem, contentIndex) => (
                                        <div
                                            className={`${contentIndex === 6 ? 'mb-5' : ''}`}
                                            key={contentIndex}
                                            dangerouslySetInnerHTML={{ __html: contentItem }}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {/* Show each field of the selected section dynamically */}
                            {selectedCategoryIndex === 1 && currentSection.title && (
                                <div className="text-2xl text-blue-500 font-bold mb-4">
                                    {currentSection.title}
                                </div>
                            )}
                            {selectedCategoryIndex === 1 && currentSection.company && (
                                <div className="text-xl text-green-500 mb-4">
                                    {currentSection.company}
                                </div>
                            )}
                            {selectedCategoryIndex === 1 && currentSection.date && (
                                <div className="text-lg text-yellow-500 mb-4">
                                    {currentSection.date}
                                </div>
                            )}

                            {selectedCategoryIndex === 2 && currentSection.name && (
                                <div className="text-2xl text-red-500 font-bold mb-4">
                                    {currentSection.name}
                                </div>
                            )}
                            {selectedCategoryIndex === 2 && currentSection.technologies && (
                                <div className="text-lg text-purple-500 mb-4">
                                    Technologies: {currentSection.technologies}
                                </div>
                            )}
                            {selectedCategoryIndex === 2 && currentSection.demoUrl && (
                                <div className="text-lg text-pink-500 mb-4">
                                    Demo: <a href={currentSection.demoUrl} className="underline">{currentSection.demoUrl}</a>
                                </div>
                            )}
                            {selectedCategoryIndex === 2 && currentSection.repoUrl && (
                                <div className="text-lg text-pink-500 mb-4">
                                    Repo: <a href={currentSection.repoUrl} className="underline">{currentSection.repoUrl}</a>
                                </div>
                            )}

                            {selectedCategoryIndex === 3 && currentSection.name && (
                                <div className="text-2xl text-indigo-500 font-bold mb-4">
                                    {currentSection.name}
                                </div>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: currentSection.content.join('<br/>') }} />
                        </div>
                    )}
                </div>
            </div>

            <footer className="absolute bottom-0 w-full bg-black text-white py-2 text-center border-t border-gray-700">
                <div className="flex justify-center space-x-4 text-sm">

                    {/* Links */}
                    <a href="./cv/MateuszUrbanek_resume.pdf" className="text-blue-400 hover:underline">Resume</a>
                    <a href="" className="text-blue-400 hover:underline">GitHub</a>
                    <a href="your_linkedin_url" className="text-blue-400 hover:underline">LinkedIn</a>
                </div>

                {/* Instructions */}
                <div className="mt-2 text-gray-400 text-xs">
                    <p>&lt;pgup&gt;/&lt;pgdown&gt;: Scroll (or just use the mouse)</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
