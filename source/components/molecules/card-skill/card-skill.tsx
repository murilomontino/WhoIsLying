import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import Text from '~/components/atoms/text'

export const TypeSkills = {
    investigation: 'investigation',
    defense: 'defense',
    strategic: 'strategic',
    control: 'control',
    manipulation: 'manipulation',
    attack: 'attack',
} as const
export type TypeSkills = (typeof TypeSkills)[keyof typeof TypeSkills]

export type Skill = {
    id: string
    name: string
    description: string
    help: string
    icon: string
    color: string
    type: TypeSkills
}

type CardSkillProps = {
    skill: Skill
}

const CardSkill = ({ skill }: CardSkillProps) => {
    return (
        <View
            key={skill.id}
            className="w-48 h-48 p-2 px-1 mb-4 bg-white rounded-lg"
        >
            <View
                style={{
                    borderColor: skill.color,
                }}
                className="border-2 !h-full justify-between rounded-lg"
            >
                <View className="items-center flex-1 w-full">
                    <Text
                        as="h6"
                        className="text-center"
                        style={{
                            color: skill.color,
                        }}
                    >
                        {skill.name}
                    </Text>
                    <FontAwesome5 name={skill.icon} size={24} color={skill.color} />
                </View>
                <View className="items-start justify-start flex-1 px-[0.5rem] ">
                    <Text
                        className="px-0 text-sm text-gray-800 text-start"
                        style={{
                            fontFamily: 'Helvetica',
                        }}
                    >
                        {skill.description}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CardSkill
