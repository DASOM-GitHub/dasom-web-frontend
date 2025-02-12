import React from 'react'
import { Header } from '../components/UI/Header'
import { Cover } from '../components/UI/cover'
import MobileLayout from '../components/layout/MobileLayout'
import pythonRecruit from '../assets/images/pythonRecruit.svg'
import pythonCross from '../assets/images/pythonCross.svg'
import pythonMerge from '../assets/images/pythonMerge.svg'
import pythonSplit from '../assets/images/pythonSplit.svg'
import pythonMeetballs from '../assets/images/pythonMeetballs.svg'
import pythonPlus from '../assets/images/pythonPlus.svg'
import pythonRunAll from '../assets/images/pythonRunAll.svg'
import pythonMain from '../assets/images/pythonMain.svg'
import pythonDown from '../assets/images/pythonDown.svg'
import pythonStart from '../assets/images/pythonStart.svg'
import pythonFocus from '../assets/images/pythonFocus.svg'
import ActivityStatus from '../components/UI/ActivityStatus'

const Main: React.FC = () => {
  return (
    <MobileLayout>
      <Header />
      <div className='top-44 text-4xl md:text-[24px] lg:text-[36px] font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-400 to-neutral-300 dark:from-neutral-800 dark:via-white dark:to-white'>
        Code Beyond Limits, <br /> Discover <Cover>New Spaces</Cover> with <div className='text-mainColor'>DASOM</div>
      </div>
      <div className='relative top-[600px] max-w-[351px] mx-auto'>
        {/* Header */}
        <div className='flex gap-10 justify-between items-center pr-3 w-full whitespace-nowrap bg-neutral-800'>
          <div className='flex gap-px items-start self-stretch my-auto'>
            <div className='flex items-center'>
              <div className='flex gap-1 items-center self-stretch px-3 py-2.5 my-auto bg-stone-900 min-h-[35px]'>
                <div className='self-stretch my-auto text-sm font-medium text-white flex items-center gap-2'>
                  <img src={pythonRecruit} className='h-5 w-5' alt='Python Recruit Icon' />
                  DasomRecruit.py
                  <img src={pythonCross} className='h-3 w-3' alt='Python Exit Icon' />
                </div>
              </div>
              <img src={pythonMerge} className='h-4 w-4 mr-2.5 ml-20' alt='Python Open Change Icon' />
              <img src={pythonSplit} className='h-4 w-4 mr-2.5' alt='Python Split Icon' />
              <img src={pythonMeetballs} className='h-4 w-4' alt='Python Meetball Icon' />
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className='flex flex-col pt-1 w-full bg-stone-900 min-h-[398px]'>
          <div className='flex items-start w-full text-center bg-stone-900 text-stone-300 px-3'>
            <div className='flex gap-1 items-start'>
              <div className='self-stretch my-auto text-xs font-medium flex items-center'>
                <img src={pythonPlus} className='h-4 w-4 mr-1' alt='Python Plus Icon' />
                Code
              </div>
              <div className='flex shrink-0 self-stretch w-px bg-stone-300 bg-opacity-40 h-[22px] ml-1' />
              <div className='self-stretch my-auto text-xs font-medium flex'>
                <img src={pythonRunAll} className='h-4 w-4 ml-1 mr-1' alt='Python RunAll Icon' />
                Run All
                <img src={pythonMeetballs} className='h-4 w-4 mr-2.5 ml-1.5' alt='Python Meetball Icon' />
              </div>
            </div>
            <div className='self-stretch my-auto text-xs font-medium flex ml-8'>
              <img src={pythonMain} className='h-4 w-4 mr-0.5' alt='Python Main Icon' />
              main (Python 3.9.7)
            </div>
          </div>

          {/* Code Blocks */}
          <div className='flex flex-col w-full bg-zinc-900 p-3'>
            {/* First Code Block */}
            <div className='mb-4'>
              <div className='text-2xl font-semibold text-white flex items-center'>
                <img src={pythonDown} className='h-4 w-4 mr-2.5' alt='Python Scroll Down Icon' />
                DASOM 34기 부원 모집
                </div>
                <div className='text-xl font-semibold text-stone-300 flex items-center'>
                  <img src={pythonDown} className='h-4 w-4 mr-2.5' alt='Python Scroll Down Icon' />
                  WHY NOT?!
                  </div>
                  <div className='flex items-stretch w-full'>
                    <img src={pythonFocus} className='h-40 flex-none object-contain' alt='Python Focus Icon' />
                    <div className='w-full flex-1'>
                      <pre className='relative flex-1 flex flex-col h-full text-xs bg-neutral-800 border border-neutral-700 p-3 text-zinc-300 rounded overflow-auto min-h-[10rem]'>
                        <code>
                          <span className='text-[#C586C0]'>import</span> pandas <span className='text-[#C586C0]'>as</span> pd{'\n'}
                          <span className='text-[#C586C0]'>import</span> numpy <span className='text-[#C586C0]'>as</span> np{'\n'}
                          <span className='text-[#C586C0]'>import</span> seaborn <span className='text-[#C586C0]'>as</span> sns{'\n'}
                          <span className='text-[#C586C0]'>import</span> matplotlib.pyplot <span className='text-[#C586C0]'>as</span> plt{'\n\n'}
                          sns.set(<span className='text-[#9CDCF2]'>style</span>=<span className='text-[#D69D85]'> 'darkgrid' </span>)
                        </code>
                      <div className='absolute bottom-1 left-2 text-xs font-medium text-emerald-300'>✔ 0.3s</div>
                    <div className='absolute bottom-1 right-2 text-xs font-medium text-gray-500'>Python</div>
                  </pre>
                </div>
              </div>
            </div>
            {/* Second Code Block */}
            <div>
              <pre className='text-xs bg-neutral-800 border border-neutral-700 p-3 text-zinc-300 rounded'>
                <code>print(<span className='text-[#D69D85]'>"Join DASOM"</span>)</code>
              </pre>
              <div className='text-xs font-medium text-zinc-500'>Ctrl + Enter to run</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='flex w-full bg-stone-900 min-h-[1px] mb-20' />

        <ActivityStatus year="2024" />
      </div>
    </MobileLayout>
  )
}

export default Main