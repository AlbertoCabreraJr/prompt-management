'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers'

const Nav = () => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const initProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    initProviders()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src='/assets/images/logo.svg' width={30} height={30} alt='PromptVerse Logo' />
        <p className='logo_text'>PromptVerse</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Signout
            </button>

            <Link href='/profile'>
              <Image src={session?.user.image || ''} alt='Profile' width={37} height={37} className='rounded-full' />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                    Sign In
                  </button>
                )
              })}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image || ''}
              alt='Profile'
              width={37}
              height={37}
              className='rounded-full'
              onClick={() => {
                setToggleDropdown((prev) => !prev)
              }}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown-link' onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link href='/create-prompt' className='dropdown-link' onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                    Sign In
                  </button>
                )
              })}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
