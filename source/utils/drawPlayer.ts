import { Random } from 'random-js'
import type { IPlayer } from '~/store/slices/players/player'
import { shuffleArray } from './shuffleArray'

export const drawPlayer = (players: IPlayer[]): IPlayer => {
    const random = new Random() // Usa a entropia padrão do ambiente
    const randomIndex = random.integer(1, 1000)
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
    while (player === null) {
        if (players.length === 0) {
            break
        }
        const randomPlayer = drawPlayer(players)
        if (conditions(randomPlayer)) {
            player = randomPlayer
        }
    }

    return player as IPlayer
}
