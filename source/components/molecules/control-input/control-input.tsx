import type { InputProps } from '~/components/atoms/input/input'
import Input from '~/components/atoms/input/input'

import React, { useMemo } from 'react'
import {
    type Control,
    Controller,
    type FieldErrors,
    type FieldValues,
    type Path,
} from 'react-hook-form'
import { Text } from 'react-native'

type ControlInputProps<Ctx extends FieldValues> = {
    name: Path<Ctx>
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    control: Control<Ctx, any>
    errors?: FieldErrors<Ctx>
} & InputProps

export default function ControlInput<Ctx extends FieldValues>({
    control,
    name,
    errors,
    ...props
}: ControlInputProps<Ctx>) {
    const hasError = useMemo(() => {
        if (errors && `${name}` in errors) {
            return true
        }
        return false
    }, [errors, name])

    const err = errors?.[name] || { message: '' }

    return (
        <>
            <Controller
                control={control}
                name={name as Path<Ctx>}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        {...props}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
            {hasError && <Text>{err?.message as any}</Text>}
        </>
    )
}
