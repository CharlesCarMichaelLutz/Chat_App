import React from 'react'
import {useRef, useEffect, useState} from 'react'

export const useChatScroll = (dependency) => {
    const ref = useRef(null)
    const [isAtBottom, setIsAtBottom] = useState(true)

    useEffect(() =>  {
        const el = ref.current
        if(!el) return 

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = el
            setIsAtBottom(scrollHeight - scrollTop - clientHeight <= 5 )
        }
        el.addEventListener('scroll', handleScroll)
        return () => el.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const el = ref.current;

        if( el && isAtBottom)
        {
            el.scrollTo({ top: el.scrollHeight, behavior: 'smooth'})
        }
    }, [dependency, isAtBottom])

  return { ref }
}

