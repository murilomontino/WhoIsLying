import type { Skill } from '~/components/molecules/card-skill/card-skill'

export type IPlayer = {
    _id: string
    name: string
    score: number
    reveal: boolean
    balance: number
    canAnswer: boolean
    blackListQuestioners: string[]
    votes: string[]
    displayVotes: number
    skillsDefense: Skill[]
    skillsAttack: Skill[]
    boughtSkillsInRound: Skill[]
    canVote: boolean
    canAsk: boolean
    __protocol: string
}

export const Player: IPlayer = {
    _id: '',
    name: '',
    score: 0,
    displayVotes: 0,
    votes: [],
    balance: 300,
    reveal: false,
    boughtSkillsInRound: [],
    skillsAttack: [],
    skillsDefense: [],
    canAnswer: true,
    canVote: true,
    blackListQuestioners: [],
    canAsk: true,
    __protocol: 'player',
}

export const build = (player: IPlayer) => Object.assign({}, Player, player)
