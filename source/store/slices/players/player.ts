export type IPlayer = {
    _id: string
    name: string
    score: number
    reveal: boolean
    canAnswer: boolean
    blackListQuestioners: string[]
    votes: string[]
    displayVotes: number
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
    reveal: false,
    canAnswer: true,
    canVote: true,
    blackListQuestioners: [],
    canAsk: true,
    __protocol: 'player',
}

export const build = (player: IPlayer) => Object.assign({}, Player, player)
