import { FontAwesome5 } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ButtonPrimary } from '~/components/atoms/button'
import Text from '~/components/atoms/text'
import {
    type Skill as ISkill,
    IconSkills,
    NamedTypeSkills,
} from '~/components/molecules/card-skill/card-skill'
import { useAppDispatch } from '~/store/hooks'
import type { IPlayer } from '~/store/slices/players/player'
import { onBuySkill } from '~/store/slices/skills/actions'

type SkillProps = {
    skill: ISkill
    player: IPlayer
}

const Skill = ({ skill, player }: SkillProps) => {
    const dispatch = useAppDispatch()

    const handleBuySkill = useCallback(
        ({ skill, player }: { skill: ISkill; player: IPlayer }) => {
            dispatch(onBuySkill({ skill, player }))
        },
        [],
    )

    return (
        <View key={skill.id} className="w-full h-screen p-4 bg-white rounded-lg">
            <View
                style={{
                    borderColor: skill.color,
                }}
                className="border-2 !h-full justify-between rounded-lg p-4"
            >
                <View className="items-center flex-1 w-full h-full">
                    <Text
                        as="h2"
                        className="text-center"
                        style={{
                            color: skill.color,
                        }}
                    >
                        {skill.name}
                    </Text>
                    <FontAwesome5 name={skill.icon} size={48} color={skill.color} />
                </View>
                <View className="items-start justify-start flex-1 px-2 mt-8 ">
                    <Text
                        as="h6"
                        className="px-0 text-gray-800 text-start"
                        style={{
                            fontFamily: 'Helvetica',
                        }}
                    >
                        {skill.description}
                    </Text>
                </View>
                <View className="items-start justify-start flex-1 px-2 ">
                    <Text
                        as="h6"
                        className="px-0 text-gray-800 text-start"
                        style={{
                            fontFamily: 'Helvetica',
                        }}
                    >
                        {skill.help}
                    </Text>
                </View>
                <View className="items-start justify-start flex-1 px-2 ">
                    <Text as="h6" className="px-0 text-red-400 text-start">
                        !! Importante !!
                    </Text>
                    <Text as="h6" className="px-0 text-red-400 text-start">
                        Ao comprar a habilidade seu uso é imediato, não podendo ser
                        desfeito. E será ativado automaticamente.
                    </Text>
                </View>
                <View className="flex-row items-start justify-between  px-[0.5rem]">
                    <View className="flex-row items-center gap-2">
                        <FontAwesome5
                            name={IconSkills[skill.type]}
                            size={48}
                            color={skill.color}
                        />
                        <Text as="body" className="p-0">
                            {NamedTypeSkills[skill.type]}
                        </Text>
                    </View>
                    <Text className="p-0" as="h2">
                        {skill.price} €
                    </Text>
                </View>
                <ButtonPrimary
                    onPress={() => handleBuySkill({ skill, player })}
                    style={{
                        backgroundColor: skill.color,
                        width: '100%',
                    }}
                >
                    <Text className="text-white">Comprar</Text>
                </ButtonPrimary>
            </View>
        </View>
    )
}

export default Skill
