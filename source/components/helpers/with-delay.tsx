import { type ComponentType, useEffect, useState } from 'react'

export type DelayProps = {
    delay?: number
}

function withDelay<T extends {}>(WrappedComponent: ComponentType<T & DelayProps>) {
    return ({ delay = 0, ...props }: T & DelayProps) => {
        const [show, setShow] = useState(delay === 0)

        useEffect(() => {
            const timer = setTimeout(() => {
                setShow(true)
            }, delay) // 1 segundo de delay

            return () => clearTimeout(timer) // Limpar timeout ao desmontar
        }, [])

        if (!show) return null

        return <WrappedComponent {...(props as T)} />
    }
}

export default withDelay
