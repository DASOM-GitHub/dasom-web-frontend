import React from 'react'

interface CoreValueCardProps {
  index: string
  title: string
  mobileSubtitle: string
  mobileBody: React.ReactNode
  hoverSubtitle: string
  hoverBody: React.ReactNode
  imageSrc: string
  mobileImageClass: string
  defaultImageClass: string
  hoverImageClass: string
  defaultBgClass?: string
  hoverBgClass?: string
  mobileSubtitleClass?: string
  hoverSubtitleClass?: string
  titleDefaultClass?: string
  titleHoverClass?: string
}

const CoreValueCard: React.FC<CoreValueCardProps> = ({
  index,
  title,
  mobileSubtitle,
  mobileBody,
  hoverSubtitle,
  hoverBody,
  imageSrc,
  mobileImageClass,
  defaultImageClass,
  hoverImageClass,
  defaultBgClass = 'md:w-[352px] lg:w-[400px] h-[560px] md:left-0 lg:left-0 top-[63px]',
  hoverBgClass = 'md:w-[352px] lg:w-[400px] h-[560px] md:left-0 lg:left-0 top-[54px]',
  mobileSubtitleClass = 'text-base',
  hoverSubtitleClass = 'text-3xl',
  titleDefaultClass = 'text-5xl',
  titleHoverClass = 'text-5xl',
}) => {
  return (
    <div className="mx-auto">
      {/* Mobile: simplified fluid card */}
      <div className="md:hidden rounded-2xl bg-zinc-800 p-6 relative overflow-hidden min-h-[200px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white text-3xl font-bold font-mono">{index}</div>
            <div className="mt-3 text-white text-2xl font-semibold">{title}</div>
            <div className={`mt-2 text-white/80 ${mobileSubtitleClass}`}>{mobileSubtitle}</div>
          </div>
          <img src={imageSrc} alt={title} className={mobileImageClass} />
        </div>
        <div className="mt-4 text-white text-sm">{mobileBody}</div>
      </div>

      {/* Desktop/Tablet: absolute-positioned with hover variant */}
      <div className="hidden md:block group md:w-[352px] lg:w-[400px] h-[685px] relative overflow-hidden">
        {/* Default state */}
        <div className="absolute inset-0 transition-opacity duration-300 ease-out group-hover:opacity-0">
          <div className={`${defaultBgClass} absolute bg-zinc-800 rounded-2xl`} />
          <div className={`left-12 top-[543px] absolute text-center text-white font-normal ${titleDefaultClass}`}>{title}</div>
          <div className="left-12 top-[105px] absolute text-center text-white text-3xl font-bold font-mono">{index}</div>
          <img src={imageSrc} alt={`${title} illustration`} className={defaultImageClass} />
        </div>

        {/* Hover state (Variant2) */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
          <div className={`${hoverBgClass} absolute bg-neutral-100 rounded-2xl`} />
          <div className={`left-12 top-[343px] absolute text-center text-zinc-900 font-semibold ${titleHoverClass}`}>{title}</div>
          <div className={`left-12 top-[415px] absolute text-center text-black font-normal ${hoverSubtitleClass}`}>{hoverSubtitle}</div>
          <div className="left-12 top-[98px] absolute text-center text-zinc-900 text-3xl font-bold font-mono">{index}</div>
          <div className="left-12 top-[505px] absolute text-black text-2xl font-normal">{hoverBody}</div>
          <img src={imageSrc} alt={`${title} illustration`} className={hoverImageClass} />
        </div>
      </div>
    </div>
  )
}

export default CoreValueCard
