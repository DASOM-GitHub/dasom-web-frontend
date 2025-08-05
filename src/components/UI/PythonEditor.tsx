import React, { useState, useEffect } from 'react'
import pythonRecruit from '../../assets/images/pythonRecruit.svg'
import pythonCross from '../../assets/images/pythonCross.svg'
import pythonMerge from '../../assets/images/pythonMerge.svg'
import pythonSplit from '../../assets/images/pythonSplit.svg'
import pythonMeetballs from '../../assets/images/pythonMeetballs.svg'
import pythonPlus from '../../assets/images/pythonPlus.svg'
import pythonRunAll from '../../assets/images/pythonRunAll.svg'
import pythonMain from '../../assets/images/pythonMain.svg'
import pythonDown from '../../assets/images/pythonDown.svg'
import pythonFocus from '../../assets/images/pythonFocus.svg'

const PythonEditor: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<number | null>(null)

  const TypingEffect = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('')
    const [index, setIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
      const speed = isDeleting ? 100 : 150
      const delay = isDeleting && index === 0 ? 1000 : speed

      const timeout = setTimeout(() => {
        if (!isDeleting) {
          setDisplayText(text.slice(0, index + 1))
          setIndex(prev => prev + 1)

          if (index + 1 === text.length) {
            setTimeout(() => setIsDeleting(true), 1000)
          }
        } else {
          setDisplayText(text.slice(0, index - 1))
          setIndex(prev => prev - 1)

          if (index - 1 === 0) {
            setIsDeleting(false)
          }
        }
      }, delay)

      return () => clearTimeout(timeout)
    }, [index, isDeleting, text])

    return <span className='text-xs text-[#D69D85]'>{displayText}</span>
  }

  const handleCodeClick = (index: number) => {
    setSelectedCode(selectedCode === index ? null : index)
  }

  return (
    <div className='w-full bg-[#1E1E1E] rounded-lg'>
      {/* 헤더 */}
      <div className='flex gap-10 justify-between items-center pr-3 w-full bg-neutral-800 rounded-t-lg'>
        <div className='flex gap-px items-start self-stretch my-auto'>
          <div className='flex items-center'>
            <div className='flex gap-1 items-center self-stretch px-3 py-2.5 my-auto bg-[#1E1E1E] min-h-[35px]'>
              <div className='self-stretch my-auto text-sm font-medium text-white flex items-center gap-2'>
                <img
                  src={pythonRecruit}
                  className='h-5 w-5'
                  alt='Python Recruit Icon'
                />
                DasomRecruit.py
                <img
                  src={pythonCross}
                  className='h-3 w-3'
                  alt='Python Exit Icon'
                />
              </div>
            </div>
            <img
              src={pythonMerge}
              className='h-4 w-4 mr-2.5 ml-20'
              alt='Python Open Change Icon'
            />
            <img
              src={pythonSplit}
              className='h-4 w-4 mr-2.5'
              alt='Python Split Icon'
            />
            <img
              src={pythonMeetballs}
              className='h-4 w-4'
              alt='Python Meetball Icon'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col pt-1 w-full bg-[#1E1E1E] min-h-[398px]'>
        {/* 코드  */}
        <div className='flex items-start w-full text-center bg-[#1E1E1E] text-stone-300 px-3'>
          <div className='flex gap-1 items-start'>
            <div className='self-stretch my-auto text-xs font-medium flex items-center'>
              <img
                src={pythonPlus}
                className='h-4 w-4 mr-1'
                alt='Python Plus Icon'
              />
              Code
            </div>
            <div className='flex shrink-0 self-stretch w-px bg-stone-300 bg-opacity-40 h-[22px] ml-1' />
            <div className='self-stretch my-auto text-xs font-medium flex'>
              <img
                src={pythonRunAll}
                className='h-4 w-4 ml-1 mr-1'
                alt='Python RunAll Icon'
              />
              Run All
              <img
                src={pythonMeetballs}
                className='h-4 w-4 mr-2.5 ml-1.5'
                alt='Python Meetball Icon'
              />
            </div>
          </div>
          <div className='self-stretch my-auto text-xs font-medium flex ml-8'>
            <img
              src={pythonMain}
              className='h-4 w-4 mr-0.5'
              alt='Python Main Icon'
            />
            main (Python 3.9.7)
          </div>
        </div>

        {/* 코드블럭 */}
        <div className='flex flex-col w-full bg-[#1E1E1E] p-3'>
          <div className='mb-4'>
            <div className='text-2xl font-semibold text-white flex items-center'>
              <img
                src={pythonDown}
                className='h-4 w-4 mr-2.5'
                alt='Python Scroll Down Icon'
              />
              DASOM 34기 부원 모집
            </div>
            <div className='text-xl font-semibold text-stone-300 flex items-center'>
              <img
                src={pythonDown}
                className='h-4 w-4 mr-2.5'
                alt='Python Scroll Down Icon'
              />
              WHY NOT?!
            </div>
            <div className='flex items-stretch w-full'>
              <img
                src={pythonFocus}
                className='h-40 flex-none object-contain'
                alt='Python Focus Icon'
              />
              <div className='w-full flex-1'>
                <pre className='relative flex-1 flex flex-col h-full text-xs bg-neutral-800 border border-neutral-700 p-3 text-zinc-300 rounded overflow-auto min-h-[10rem]'>
                  <code>
                    <span className='text-[#C586C0]'>import</span> pandas{' '}
                    <span className='text-[#C586C0]'>as</span> pd{'\n'}
                    <span className='text-[#C586C0]'>import</span> numpy{' '}
                    <span className='text-[#C586C0]'>as</span> np{'\n'}
                    <span className='text-[#C586C0]'>import</span> seaborn{' '}
                    <span className='text-[#C586C0]'>as</span> sns{'\n'}
                    <span className='text-[#C586C0]'>import</span>{' '}
                    matplotlib.pyplot <span className='text-[#C586C0]'>as</span>{' '}
                    plt{'\n\n'}
                    sns.set(<span className='text-[#9CDCF2]'>style</span>=
                    <span className='text-[#D69D85]'> 'darkgrid' </span>)
                  </code>
                  <div className='absolute bottom-1 left-2 text-xs font-medium text-emerald-300'>
                    ✔ 0.3s
                  </div>
                  <div className='absolute bottom-1 right-2 text-xs font-medium text-gray-500'>
                    Python
                  </div>
                </pre>
              </div>
            </div>
          </div>

          <div>
            <pre
              className={`text-xs p-3 rounded ${selectedCode === 0 ? 'border-[#007ACC]' : 'border-neutral-700'} border-2`}
              onClick={() => handleCodeClick(0)}
            >
              <code className='text-zinc-300'>
                print(
                <span className='text-[#D69D85]'>
                  <TypingEffect text='"Join DASOM"' />
                </span>
                )
              </code>
            </pre>
            <div className='text-xs font-medium text-zinc-500'>
              Ctrl + Enter to run
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PythonEditor
