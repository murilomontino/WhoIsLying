import { FontAwesome5 } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modalize } from 'react-native-modalize'
import { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import DefaultLayout from '~/components/_layout/default'
import Text from '~/components/atoms/text'
import CardSkill from '~/components/molecules/card-skill'
import type { Skill as ISkill } from '~/components/molecules/card-skill/card-skill'
import GoBack from '~/components/molecules/go-back'
import Skill from '~/components/organisms/skill'
import View from '~/components/ui/view'
import skills from '~/constants/skills.json'
import { useAppSelector } from '~/store/hooks'
import type { IPlayer } from '~/store/slices/players/player'
import { delay } from '~/utils/delay'

const SkillsRevealScreen = () => {
    const [isExiting, setIsExiting] = useState(false)
    const [skill, setSkill] = useState<ISkill | null>(null)
    const modalizeRef = useRef<Modalize>(null)
    const { id } = useLocalSearchParams()
    const { players } = useAppSelector((state) => state.players)
    const router = useRouter()
    const player = useMemo(() => {
        const p = players.find((p) => p._id === id)
        if (!p) {
            router.push('/reveal')
        }
        return p
    }, [id, players])

    const onOpen = async (skill: ISkill) => {
        setSkill(skill)
        await delay(100)
        modalizeRef.current?.open()
    }

    const handleReveal = useCallback(async () => {
        setIsExiting(true)

        await delay(1000) // Aguarda a animação de saída

        router.push('/reveal')
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <DefaultLayout>
                <GoBack />
                <View className="flex flex-col max-h-[20%] items-center justify-center w-full px-2 h-fit ">
                    <Text>Loja de Habilidades</Text>
                    <View className="flex-row">
                        <Text
                            entering={FadeInRight}
                            exiting={FadeOutLeft}
                            demount={isExiting}
                            as="h2"
                            className="!text-white text-shadow-outlined-red"
                        >
                            {player?.name}
                        </Text>
                        <Text
                            entering={FadeInRight}
                            exiting={FadeOutLeft}
                            demount={isExiting}
                            as="h4"
                            className="!text-white text-shadow-outlined-red"
                        >
                            ({player?.balance} DinDin)
                        </Text>
                    </View>
                </View>
                <View className="h-full flex-2">
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        className="w-full"
                        contentContainerClassName="w-full gap-2 flex-row flex-wrap pb-[120px] md:justify-evenly "
                    >
                        <TouchableOpacity
                            onPress={handleReveal}
                            className="w-48 h-48 p-2 px-1 mb-4 bg-white rounded-lg"
                        >
                            <View
                                style={{
                                    borderColor: '#000',
                                }}
                                className="border-2 !h-full justify-between rounded-lg"
                            >
                                <View className="items-center w-full">
                                    <Text as="h6" className="text-center">
                                        Continuar
                                    </Text>
                                    <FontAwesome5
                                        name={''}
                                        size={24}
                                        color={'#000'}
                                    />
                                </View>
                                <View className="items-start justify-start flex-1 px-[0.5rem] ">
                                    <Text
                                        className="px-0 text-sm text-gray-800 text-start"
                                        style={{
                                            fontFamily: 'Helvetica',
                                        }}
                                    >
                                        Clique Aqui para continuar. Tenha certeza de
                                        que já comprou todas as habilidades que
                                        deseja.
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {skills.map((skill) => (
                            <CardSkill
                                disabled={(player?.balance || 0) < skill.price}
                                onPress={onOpen.bind(null, skill as ISkill)}
                                skill={skill as ISkill}
                                key={skill.id}
                            />
                        ))}
                    </ScrollView>
                </View>
                <Modalize ref={modalizeRef}>
                    <Skill skill={skill as ISkill} player={player as IPlayer} />
                </Modalize>
            </DefaultLayout>
        </GestureHandlerRootView>
    )
}

export default SkillsRevealScreen
