import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
function CustomInput({className, placeholder, field}) {
  return (
    <div>
        <Input
        className={cn("border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300",className)}
        placeholder={placeholder}
        {...field}
        />
    </div>
  )
}

export default CustomInput;