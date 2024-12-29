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
import { onAddPlayers, onDeletePlayers } from '~/store/slices/players/actions'

const schema = Yup.object().shape({
    name: Yup.string().trim().required('Required'),
})

export default function Page() {
    const { players } = useAppSelector((state) => state.players)
    const dispatch = useAppDispatch()

    const {
        control,
        handleSubmit,
        resetField,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePress = (data: { name: string }) => {
        dispatch(onAddPlayers(data))
        resetField('name')
    }

    const handleDelete = (id: string) => {
        dispatch(onDeletePlayers({ id }))
    }

    return (
        <View className="flex items-center justify-start flex-1 py-4 space-y-8 bg-emerald-400">
            <Title />
            <View className="flex flex-col w-1/2 space-y-4">
                {players.map((player) => (
                    <View
                        key={player._id}
                        className="flex flex-row items-center flex-1 px-4 py-2 space-x-4 bg-white rounded-full"
                    >
                        <Text className="text-2xl flex-[4] text-center text-gray-800">
                            {player.name}
                        </Text>
                        <Button onPress={() => handleDelete(player._id)}>
                            <AntDesign
                                name="delete"
                                size={24}
                                className="text-gray-800"
                            />
                        </Button>
                    </View>
                ))}
            </View>

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
                        className="text-white"
                        style={{
                            fontFamily: 'Bangers_400Regular',
                            fontSize: 42,
                            textShadowColor: 'black', // Cor da borda
                            textShadowOffset: { width: 2, height: 2 }, // Offset da sombra
                            textShadowRadius: 2, // Raio para suavizar a sombra
                        }}
                    >
                        Start Game
                    </Text>
                </ButtonPrimary>
            </View>
        </View>
    )
}
