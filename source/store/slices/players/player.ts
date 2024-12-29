export class Player {
    _id: string
    name: string
    score: number

    constructor(id: string, name: string) {
        this._id = id
        this.name = name.trim()
        this.score = 0
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
}
