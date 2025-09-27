"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import Link from "next/link";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import { ToggleMode } from "./toggle-mode";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Byte
                </span>
                <span className="text-foreground">Code</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/articles"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Right Section: Search, Theme, Auth */}
          <div className="flex items-center gap-4">
            {/* Search bar (desktop) */}
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {/* Theme Toggle */}
            <ToggleMode />

            {/* Auth Buttons */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton>
                  <Button variant="outline">Login</Button>
                </SignInButton>
                <SignUpButton>
                  <Button>Sign Up</Button>
                </SignUpButton>
              </div>
            </SignedOut>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 text-foreground hover:text-purple-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-4">
            {/* Search Bar */}
            <div className="px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/tutorials"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tutorials
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">Sign Up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}



// import React from 'react'
// import Link from 'next/link'
// import SearchInput from './search-input'
// import {ToggleMode} from './toggle-mode'
// import { Button } from '@/components/ui/button'
// const Navbar = () => {
//   return (
//     <div className='sticky top-0 z-50 w-full border border-b bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60 '>
//        <div className='container mx-auto px-4 sm:px-6 lg:px-8 '>
//         <div className='flex h-16 items-center justify-between '>
//               {/* Left Section */}
//               <div className='flex items-center gap-8'>
//                   <Link href={"/"} className='flex items-center space-x-2'>
//                     <span className='text-2xl font-bold'>
//                         <span className='bg-gradient-to-r from purple-600 to bg-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent '>Byte</span>
//                          <span className='text-foreground'>Code</span>
//                     </span>
//                   </Link>
//               </div>   
//                 {/* Desktop menu */}
//                 <div className='hidden md:flex items-center gap-4'>
//                     <Link href={"/articles"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>Articles</Link>
                
//                      <Link href={"/tutorial"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>Tutorial</Link>
               
//                      <Link href={"/about"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>About</Link>
               
//                      <Link href={"/dashboard"} className='text-sm font-medium text-foreground hover:text-foreground transition-colors'>DashBoard</Link> 
//                 </div>

//                 {/* Right Section */}
//                     <div className='flex items-center gap-4 '>
//                         <SearchInput/>
//                         <ToggleMode/>
//                 <div className='hidden md:flex items-center gap-4'>
//                       <Button>Login</Button>
//                       <Button>Sign Up</Button>
//                 </div>
               

//                     </div>
//         </div>
//        </div>
//     </div>
//   )
// }

// export default Navbar