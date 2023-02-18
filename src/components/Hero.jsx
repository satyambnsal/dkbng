import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

import backgroundImage from '@/images/background.jpg'

export function Hero() {
  return (
    <div className="relative pt-10 pb-20 sm:py-24">
      <div className="absolute inset-x-0 -top-48 -bottom-14 overflow-hidden bg-indigo-50">
        <Image
          className="absolute top-0 left-0 translate-y-[-10%] translate-x-[-55%] -scale-x-100 sm:left-1/2 sm:translate-y-[-6%] sm:translate-x-[-98%] lg:translate-x-[-106%] xl:translate-x-[-122%]"
          src={backgroundImage}
          alt=""
          width={918}
          height={1495}
          priority
          unoptimized
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-4xl lg:max-w-4xl lg:px-6">
          <h1 className="font-display text-5xl font-bold text-rose-800 sm:text-7xl">
            <span className="block text-center">Poetry and love,</span>
            <span className='block text-center text-3xl'>hand-delivered to your special someone.</span>
          </h1>
          <div className="mt-10 space-y-6 font-display text-2xl tracking-wide text-rose-900">
            <p>
              Daak Bangla is reviving the cherished tradition of exchanging postcards in a way that embraces the advancements of technology. Our platform offers a warm and convenient way to subscribe to monthly poetry postcards and send heartwarming poems to your loved ones.
            </p>
          </div>
          <Button href="#" className="mt-10 w-full sm:hidden">
            Join us!
          </Button>
          {/* <dl className="mt-10 grid grid-cols-2 gap-y-6 gap-x-10 sm:mt-16 sm:gap-y-10 sm:gap-x-16 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ['Speakers', '18'],
              ['People Attending', '2,091'],
              ['Venue', 'Staples Center'],
              ['Location', 'Los Angeles'],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-blue-600">{name}</dt>
                <dd className="mt-0.5 text-2xl font-semibold tracking-tight text-blue-900">
                  {value}
                </dd>
              </div>
            ))}
          </dl> */}
        </div>

        <div className="w-full hidden mt-20 sm:flex justify-center lg:grow lg:basis-0 ">
          <Button href="#" className="px-10">Send your postcard!</Button>
        </div>
      </Container>
    </div>
  )
}
