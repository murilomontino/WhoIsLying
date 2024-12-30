export class Player {
    _id: string
    name: string
    score: number
    reveal: boolean

    constructor(id: string, name: string) {
        this._id = id
        this.name = name.trim()
        this.score = 0
        this.reveal = false
    }

    addScore(score: number): this {
        this.score += score
        return this
    }

    removeScore(score: number): this {
        this.score -= score
        return this
    }

    defineScore(score: number): this {
        this.score = score
        return this
    }

    revealPlayer(): this {
        this.reveal = true
        return this
    }

    hidePlayer(): this {
        this.reveal = false
        return this
    }
}
