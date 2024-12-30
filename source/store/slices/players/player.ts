export const Player = {
    _id: '',
    name: '',
    score: 0,
    reveal: false,
    canAnswer: true,
    canAsk: true,
    __protocol: 'player',

    // Métodos de manipulação
    addScore(score: number) {
        this.score += score
        return this
    },

    removeScore(score: number) {
        this.score -= score
        return this
    },

    defineScore(score: number) {
        this.score = score
        return this
    },

    revealPlayer() {
        this.reveal = true
        return this
    },

    hidePlayer() {
        this.reveal = false
        return this
    },

    enableAnswer() {
        this.canAnswer = true
        return this
    },

    disableAnswer() {
        this.canAnswer = false
        return this
    },

    enableAsk() {
        this.canAsk = true
        return this
    },

    disableAsk() {
        this.canAsk = false
        return this
    },

    defineName(name: string) {
        this.name = name.trim()
        return this
    },

    defineId(id: string) {
        this._id = id
        return this
    },

    defineReveal(reveal: boolean) {
        this.reveal = reveal
        return this
    },

    defineCanAnswer(canAnswer: boolean) {
        this.canAnswer = canAnswer
        return this
    },

    defineCanAsk(canAsk: boolean) {
        this.canAsk = canAsk
        return this
    },

    defineProtocol(protocol: string) {
        this.__protocol = protocol
        return this
    },
}

export type IPlayer = {
    _id: string
    name: string
    score: number
    reveal: boolean
    canAnswer: boolean
    canAsk: boolean
    __protocol: string
}

export const build = (player: IPlayer) => Object.assign({}, Player, player)
