import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Text from '~/components/atoms/text'

export const TypeSkills = {
    investigation: 'investigation',
    defense: 'defense',
    strategic: 'strategic',
    manipulation: 'manipulation',
    attack: 'attack',
} as const
export type TypeSkills = (typeof TypeSkills)[keyof typeof TypeSkills]

export const IconSkills = {
    investigation: 'search',
    defense: 'shield-alt',
    strategic: 'chess',
    manipulation: 'hand-paper',
    attack: 'fist-raised',
} as const
export type IconSkills = (typeof IconSkills)[keyof typeof IconSkills]

export const NamedTypeSkills = {
    investigation: 'Investigação',
    defense: 'Defesa',
    strategic: 'Estratégia',
    manipulation: 'Manipulação',
    attack: 'Ataque',
} as const
export type NamedTypeSkills = (typeof NamedTypeSkills)[keyof typeof NamedTypeSkills]

export type Skill = {
    id: string
    name: string
    description: string
    help: string
    identifier: string
    icon: string
    color: string
    price: number
    type: TypeSkills
}

type CardSkillProps = {
    skill: Skill
    onPress?: () => void
}

const CardSkill = ({ skill, onPress }: CardSkillProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
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
                <View className="flex-row items-start justify-between px-[0.5rem]">
                    <View className="flex-row items-center gap-2">
                        <FontAwesome5
                            name={IconSkills[skill.type]}
                            size={24}
                            color={skill.color}
                        />
                        <Text as="overline" className="p-0">
                            {NamedTypeSkills[skill.type]}
                        </Text>
                    </View>
                    <Text className="p-0">{skill.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardSkill
