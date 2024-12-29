import AntDesign from '@expo/vector-icons/AntDesign'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { Button } from '~/components/atoms/button'
import { ButtonPrimary } from '~/components/atoms/button/button'
import Title from '~/components/atoms/title'
import ControlInput from '~/components/molecules/control-input'
import { useAppDispatch, useAppSelector } from '~/store/hooks'

const schema = Yup.object().shape({
    name: Yup.string().trim().required('Required'),
})

export default function Page() {
    const { players } = useAppSelector((state) => state.players)
    const dispatch = useAppDispatch()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePress = (data: { name: string }) => {
        console.log(data)
    }

    return (
        <View className="flex items-center justify-start flex-1 py-4 space-y-8 bg-emerald-400">
            <Title />

            {players.map((player) => (
                <Text key={player._id}>{player.name}</Text>
            ))}

            <View className="flex flex-row items-center justify-center w-full space-x-4">
                <ControlInput
                    control={control}
                    name="name"
                    className="text-2xl"
                    errors={errors}
                />
                <Button onPress={handleSubmit(handlePress)} disabled={!isValid}>
                    <AntDesign
                        name="pluscircleo"
                        size={48}
                        className="text-gray-800 "
                    />
                </Button>
            </View>
            <View className="flex flex-row items-center justify-center w-full space-x-4">
                <ButtonPrimary className="w-1/2">
                    <Text
                        className="text-gray-800"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 42,
                        }}
                    >
                        Start Game
                    </Text>
                </ButtonPrimary>
            </View>
        </View>
    )
}
