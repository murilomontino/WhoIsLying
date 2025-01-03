import AntDesign from '@expo/vector-icons/AntDesign'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { Link } from 'expo-router'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
    BounceInDown,
    BounceOutUp,
    FadeInDown,
    FadeInLeft,
    FadeInUp,
    FadeOutDown,
    FadeOutRight,
    FadeOutUp,
} from 'react-native-reanimated'
import * as Yup from 'yup'
import DefaultLayout from '~/components/_layout/default'
import { Button } from '~/components/atoms/button'
import { ButtonPrimary } from '~/components/atoms/button/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import ControlInput from '~/components/molecules/control-input'
import View from '~/components/ui/view'
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
        setValue,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const handlePress = (data: { name: string }) => {
        dispatch(onAddPlayers(data))
        setValue('name', '')
    }

    const handleDelete = async (id: string) => {
        dispatch(onDeletePlayers({ id }))
    }

    const totalScore = useMemo(() => {
        return players.reduce((acc, player) => acc + player.score, 0)
    }, [players])

    return (
        <DefaultLayout>
            <Title />
            <Text
                delay={100}
                entering={FadeInUp}
                exiting={FadeOutDown}
                as="h2"
                className={cn(
                    { '!text-red-500': players.length < 3 },
                    'text-gray-800 text-center',
                )}
            >
                {players.length} {players.length === 1 ? 'Jogador' : 'Jogadores'}{' '}
                <Text>(Min 3)</Text>
            </Text>
            <View className="flex flex-col w-full px-4 space-y-4 overflow-auto h-52 md:w-1/2">
                {players.map((player, index) => (
                    <View
                        delay={(index + 1) * 100}
                        entering={FadeInLeft}
                        exiting={FadeOutRight}
                        key={player._id}
                        className="flex flex-row items-center flex-1 h-10 px-4 py-2 space-x-4 bg-white rounded-full min-h-10 max-h-10"
                    >
                        <Text className="text-2xl flex-[10] text-center text-gray-800">
                            {player.name}
                        </Text>
                        <Text className="text-2xl flex-[1] text-center text-gray-800">
                            {player.score}
                        </Text>
                        <Button
                            className="flex-[1]"
                            onPress={() => handleDelete(player._id)}
                        >
                            <AntDesign
                                name="delete"
                                size={24}
                                className="text-gray-800"
                            />
                        </Button>
                    </View>
                ))}
            </View>

            <View
                delay={250}
                entering={FadeInDown}
                exiting={FadeOutUp}
                className="flex flex-row items-center justify-center w-[70vw] px-8 "
            >
                <ControlInput
                    name="name"
                    control={control}
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter') {
                            handleSubmit(handlePress)()
                        }
                    }}
                    className="mr-5 text-2xl"
                    errors={errors}
                />
                <Button
                    className="!bg-transparent"
                    onPress={handleSubmit(handlePress)}
                    disabled={!isValid}
                >
                    <AntDesign
                        name="pluscircleo"
                        size={48}
                        className="text-gray-800"
                    />
                </Button>
            </View>
            <View
                delay={100}
                entering={BounceInDown.duration(1000)}
                exiting={BounceOutUp.duration(1000)}
                className="flex flex-col items-center justify-center w-full px-4 space-x-4 space-y-2"
            >
                <Button
                    delay={200}
                    condition={totalScore > 0}
                    className="items-center justify-center bg-gray-500 rounded-full h-11 w-60"
                >
                    <Text className="!text-white text-shadow-outlined-red" as="h5">
                        Zerar Pontuação
                    </Text>
                </Button>
                <Link href="/categories" asChild>
                    <ButtonPrimary
                        className="w-full md:w-1/2 "
                        disabled={players.length < 3}
                    >
                        Ir Para Categorias
                    </ButtonPrimary>
                </Link>
            </View>
        </DefaultLayout>
    )
}
