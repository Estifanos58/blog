import React from 'react'
import { FormLabel } from '../ui/form';
import { cn } from '@/lib/utils';

function CustomLabel({className, title}) {
  return (
    <FormLabel className={cn("font-bold text-[18px] text-black uppercase",className)}>
        {title}
    </FormLabel>
  )
}

export default CustomLabel;