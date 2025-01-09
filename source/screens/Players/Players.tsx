import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import {
    BounceIn,
    BounceInDown,
    BounceOutRight,
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
import { Button, ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import Title from '~/components/atoms/title'
import ControlInput from '~/components/molecules/control-input'
import Restart from '~/components/molecules/restart'
import View from '~/components/ui/view'
import { useAppDispatch, useAppSelector } from '~/store/hooks'
import {
    onAddPlayers,
    onDeletePlayers,
    onResetScore,
} from '~/store/slices/players/actions'
const schema = Yup.object().shape({
    name: Yup.string().trim().required('Required'),
})

export default function Page() {
    const { players } = useAppSelector((state) => state.players)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [isExiting, setIsExiting] = useState(false)

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

    const handlePressZeroPoints = () => {
        dispatch(onResetScore())
    }

    const handleDelete = async (id: string) => {
        dispatch(onDeletePlayers({ id }))
    }

    const totalScore = useMemo(() => {
        return players.reduce((acc, player) => acc + player.score, 0)
    }, [players])

    const handleToGoCategories = () => {
        setIsExiting(true)
        setTimeout(() => {
            router.push('/categories')
        }, 500)
    }

    return (
        <DefaultLayout>
            <Restart />
            <View
                demount={isExiting}
                entering={BounceIn}
                exiting={BounceOutRight}
                className={'flex flex-[2] max-h-[30vh] md:max-h-[15vh] mb-2 h-fit'}
            >
                <Title />
                <View className="items-center h-fit">
                    <Text
                        delay={100}
                        demount={isExiting}
                        entering={FadeInUp}
                        exiting={FadeOutDown}
                        as="h3"
                        className={cn(
                            { '!text-red-400': players.length < 3 },
                            'text-gray-800 text-center py-2',
                        )}
                    >
                        {players.length}{' '}
                        {players.length === 1 ? 'Jogador' : 'Jogadores'}{' '}
                        <Text>(Min 3)</Text>
                    </Text>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={[
                    {
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                ]}
            >
                <ScrollView className="flex max-h-[38vh] w-full overflow-y-auto flex-col   py-2 px-2 overflow-auto flex-[2] h-52 md:w-1/2">
                    {players.map((player, index) => (
                        <View
                            demount={isExiting}
                            delay={(index + 1) * 100}
                            entering={FadeInLeft}
                            exiting={FadeOutRight.delay(100 * index)}
                            key={player._id}
                            className="flex flex-row items-center flex-1 gap-4 px-4 my-2 bg-white rounded-full md:py-2 h-fit md:h-10 min-h-10 max-h-10"
                        >
                            <Text className="text-2xl flex-[8] text-center text-gray-800">
                                {player.name}
                            </Text>
                            <Text className="text-2xl min-w-[48px] flex-[1] text-center text-gray-800">
                                {player.score}
                            </Text>
                            <Button
                                className="flex-[1] border-none"
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
                </ScrollView>

                <View className="items-center justify-start flex-1 w-full py-4 min-h-fit">
                    <Button
                        delay={200}
                        onPress={handlePressZeroPoints}
                        condition={totalScore > 0}
                        className="items-center justify-center bg-gray-500 rounded-full h-11 w-60"
                    >
                        <Text
                            style={[
                                {
                                    textShadowColor: '#ef4444',
                                    textShadowOffset: { width: -2, height: 2 },
                                    textShadowRadius: 10,
                                    fontFamily: 'Bangers_400Regular',
                                },
                            ]}
                            className="!text-white text-shadow-outlined-red"
                            as="h5"
                        >
                            Zerar Pontuação
                        </Text>
                    </Button>
                    <View
                        delay={250}
                        entering={FadeInDown}
                        exiting={FadeOutUp}
                        className="flex-row items-center justify-center w-full px-8 py-2 mb-2 "
                    >
                        <View className="w-full">
                            <Text>Nome do Jogador</Text>
                            <ControlInput
                                onSubmitEditing={() => handleSubmit(handlePress)()}
                                name="name"
                                control={control}
                                className="mr-2 text-2xl"
                                errors={errors}
                            />
                        </View>
                        <Button
                            shadow={null}
                            className="!bg-transparent"
                            onPress={handleSubmit(handlePress)}
                            disabled={!isValid}
                        >
                            <AntDesign
                                name="pluscircleo"
                                size={24}
                                className="mt-10 text-gray-800"
                            />
                        </Button>
                    </View>
                    <View
                        delay={100}
                        demount={isExiting}
                        entering={BounceInDown.duration(1000)}
                        exiting={BounceOutUp.duration(1000)}
                        className="w-[95vw] items-center justify-center"
                    >
                        <ButtonPrimary
                            className="w-full"
                            onPress={handleToGoCategories}
                            disabled={players.length < 3}
                        >
                            <Text
                                className="w-full py-2 text-center text-white"
                                style={[
                                    {
                                        textShadowColor: '#ef4444',
                                        textShadowOffset: { width: -2, height: 2 },
                                        textShadowRadius: 10,
                                        fontFamily: 'Bangers_400Regular',
                                    },
                                ]}
                            >
                                Ir Para Categorias
                                {'  '}
                                <AntDesign name="play" size={24} />
                            </Text>
                        </ButtonPrimary>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </DefaultLayout>
    )
}
