import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, cn } from 'ui'
import { LOCAL_STORAGE_KEYS } from 'common'
import announcement from '../../layout/banners/data/Announcement.json'
import CountdownComponent from '../CountdownWidget/Countdown'
import PromoBg from './PromoBg'

const LWXLogo =
  'https://dev.openmodels.co/storage/v1/object/public/images/lwx/assets/lwx_logo.svg?t=2023-11-22T17%3A45%3A52.077Z'

const PromoToast = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const shouldHide =
      !localStorage?.getItem(LOCAL_STORAGE_KEYS.TELEMETRY_CONSENT) ||
      localStorage?.getItem(LOCAL_STORAGE_KEYS.HIDE_PROMO_TOAST) === 'true'

    if (!shouldHide) {
      setVisible(true)
    }
  }, [])

  const handleHide = () => {
    setVisible(false)
    localStorage?.setItem(LOCAL_STORAGE_KEYS.HIDE_PROMO_TOAST, 'true')
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className={cn(
        'opacity-0 translate-y-3 transition-all grid gap-4 fixed z-50 bottom-8 right-8 w-[80vw] sm:w-[350px] bg-alternative hover:bg-alternative border border-default rounded p-6 shadow-lg overflow-hidden',
        visible && 'opacity-100 translate-y-0'
      )}
    >
      <div className="relative z-10 text-foreground flex flex-col text-base uppercase tracking-[1px]">
        <div className="flex gap-1.5 items-center">
          <p>Launch Week</p>
          <Image src={LWXLogo} alt="OpenModels Launch Week X Logo" width={14} height={14} />
        </div>
        <span className="font-mono text-sm">Dec 11-15 / 8am PT</span>
        <CountdownComponent date={new Date(announcement.launchDate)} showCard={false} />
      </div>

      <div className="relative z-10 flex items-center space-x-2">
        <Button asChild type="secondary">
          <Link target="_blank" rel="noreferrer" href="https://open-models-platform.com/launch-week">
            Claim your ticket
          </Link>
        </Button>
        <Button type="default" onClick={handleHide}>
          Dismiss
        </Button>
      </div>
      <PromoBg className="absolute z-0 inset-0 w-full h-auto my-auto -right-5 left-auto" />
    </div>
  )
}

export default PromoToast