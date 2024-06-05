import { Loader } from 'lucide-react'
import React from 'react'

const ButtonLoading = ({ text, isLoading }: { text: string, isLoading: boolean }) => {
    return (
        <div className='flex items-center'>
            {
                isLoading && <Loader className='animate-spin mr-4 size-5' />
            }
            <span>{text}</span>
        </div>
    )
}

export default ButtonLoading