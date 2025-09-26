
import React from 'react'
import Link from 'next/link'
import SearchInput from './search-input'
import {ToggleMode} from './toggle-mode'
import { Button } from '@/components/ui/button'
const Navbar = () => {
  return (
    <div className='sticky top-0 z-50 w-full border border-b bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60 '>
       <div className='container mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='flex h-16 items-center justify-between '>
              {/* Left Section */}
              <div className='flex items-center gap-8'>
                  <Link href={"/"} className='flex items-center space-x-2'>
                    <span className='text-2xl font-bold'>
                        <span className='bg-gradient-to-r from purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent '>Byte</span>
                         <span className='text-foreground'>Code</span>
                    </span>
                  </Link>
              </div>   
                {/* Desktop menu */}
                <div className='hidden md:flex items-center gap-4'>
                    <Link href={"/articles"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>Articles</Link>
                
                     <Link href={"/tutorial"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>Tutorial</Link>
               
                     <Link href={"/about"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>About</Link>
               
                     <Link href={"/dashboard"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>DashBoard</Link> 
                </div>

                {/* Right Section */}
                    <div className='flex items-center gap-4 '>
                        <SearchInput/>
                        <ToggleMode/>
                <div className='hidden md:flex items-center gap-4'>
                      <Button>Login</Button>
                      <Button>Sign Up</Button>
                </div>
               

                    </div>
        </div>
       </div>
    </div>
  )
}

export default Navbar