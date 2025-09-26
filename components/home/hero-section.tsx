import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
const HeroSection = () => {
  return (
    <section className='relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-950 to-indigo-950 '>
        {/* Dradient overlay  */}
        <div className='absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px]  before:w-[500px] before:rounded-full before:bg-g before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl'/>
        
        <div className='container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32 '>
            <div className='text-center md:text-left flex-1 space-y-8'>
                <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl'>Exploer the world Through
                    <span className='bg-gradient-to-r from-violet-400 bg-clip-text text-transparent'>
                       {" "}
                        Words</span>
                </h1>
                <p className='mx-auto max-w-2xl text-lg text-gray-300 md:text-xl'>Discover insightful articles, through-provoking stories,and expert prespective on technology, lifestyle and innovation. </p>
           
                <div className='flex flex-col gap-4 items-center sm:flex-row md:justify-start'>
                    <Button className='rounded-full '>Start Reading</Button>
                    <Button className='rounded-full' variant={"outline"} >Explore Topics</Button>
                </div>
                <div className='grid grid-cols-3 gap-4 pt-8 txt-white md:mx-w-md'>

                    <div className='space-y-4'>
                        <div className='text-2xl font-bold dark:text-primary text-white'>1K+</div>
                        <div className='text-sm text-gray-400'>Published Articles</div>
                    </div>
                    <div className='space-y-4'>
                        <div className='text-2xl font-bold dark:text-primary text-white'>50+</div>
                        <div className='text-sm text-gray-400'>Expert Writers</div>
                    </div>
                    <div className='space-y-4'>
                        <div className='text-2xl font-bold dark:text-primary text-white'>10M</div>
                        <div className='text-sm text-gray-400'>Monthly Readers</div>
                    </div>
                    
                </div>

                </div>
                {/* Image frame */}
                <div className='mt-12 flex-1 md:mt-0'>
                    <div className={cn("relative mx-auto w-64 h-64 rounded-2xl overflow-hidden", "bg-gradient-to-br from-white/5 to-transparent", "border border-primary/20 backdrop:blur-lg","shadow-2xl shadow-indigo-500/10")}> 
                    <img src="https://tse3.mm.bing.net/th/id/OIP.pZ2mAOsVqYcwKOfcsOkmHgHaLG?rs=1&pid=ImgDetMain&o=7&rm=3" alt="hero-image" className='object-cover' />    
                    </div>
                </div>

            
        </div>
        
    </section>
  )
}

export default HeroSection