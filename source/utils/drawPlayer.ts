import type { IPlayer } from '~/store/slices/players/player'
import { shuffleArray } from './shuffleArray'

export const drawPlayer = (players: IPlayer[]): IPlayer => {
    const randomIndex = Math.floor(Math.random() * players.length)
    const selectedIndex = randomIndex % players.length
    const shuffledPlayers = shuffleArray(players)
    const player = shuffledPlayers[selectedIndex]
    return player
}

export const drawPlayerWithConditions = async (
    players: IPlayer[],
    conditions: (player: IPlayer) => boolean,
): Promise<IPlayer> => {
    let player = null
    let i = 0
    while (player === null && i < 1000) {
        if (players.length === 0) {
            break
        }
        const randomPlayer = drawPlayer(players)
        if (conditions(randomPlayer)) {
            player = randomPlayer
        }
        i++
    }

    return player as IPlayer
}
