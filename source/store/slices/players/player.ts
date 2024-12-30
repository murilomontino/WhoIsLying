export const Player = {
    _id: '',
    name: '',
    score: 0,
    reveal: false,
    canAnswer: true,
    canVote: true,
    canAsk: true,
    __protocol: 'player',
}

export type IPlayer = {
    _id: string
    name: string
    score: number
    reveal: boolean
    canAnswer: boolean
    canVote: boolean
    canAsk: boolean
    __protocol: string
}

export const build = (player: IPlayer) => Object.assign({}, Player, player)
