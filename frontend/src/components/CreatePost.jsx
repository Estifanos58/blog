import React, { useState } from 'react'
import customButton from '@/components/custom/button.'
import FancyButton from '@/components/custom/button.'
import useStore from '../store/store'

function CreatePost() {
  const {user} = useStore();
   return (
    <div>
        <div className='flex flex-col items-center gap-4 md:flex-row justify-between mx-5 md:mx-20 lg:mx-40 mt-10 '>
            <h2 className='text-4xl font-serif '>Make Your Thought Count</h2>
            <a href={user?.firstName ?'/post': 'auth'}><FancyButton title={"Create a new Post"} /></a>
        </div>
    </div>
  )
}

export default CreatePost