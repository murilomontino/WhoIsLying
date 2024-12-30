import { type ComponentType, useEffect, useState } from 'react'

// Estas são as props que o HOC irá adicionar
export type ControlProps = {
    condition?: boolean | string | number | null | undefined
    conditionReRender?: boolean
}

// Este é o nosso HOC. Ele aceita um componente e retorna um novo componente.
function withIf<T extends {}>(WrappedComponent: ComponentType<T & ControlProps>) {
    // E este é o novo componente.
    return ({
        condition = true,
        conditionReRender,
        ...props
    }: T & ControlProps) => {
        const [firstRender, setFirstRender] = useState(true)
        const [isLoading, setIsLoading] = useState(false)
        // Verifica a prop "if".

        useEffect(() => {
            if (firstRender) {
                setFirstRender(false)
                return
            }

            setIsLoading((prev) => !prev)
            setTimeout(() => {
                setIsLoading((prev) => !prev)
            }, 1)
        }, [conditionReRender])

        if (!condition || isLoading) {
            // Se a prop "if" é falsa, não renderiza o componente.
            return null
        }

        // Adiciona uma prop "condition".
        return <WrappedComponent {...(props as T)} condition={condition} />
    }
}

function withControl<T extends {}>(
    WrappedComponent: ComponentType<T & ControlProps>,
) {
    // E este é o novo componente.
    return (props: T & ControlProps) => {
        return withIf(WrappedComponent)(props)
    }
}

export default withControl
