/*
# O que pontua?
- Impostor acertar a palavra correta: 100 pontos
- Acertar o impostor: 25 pontos
- Identificar o impostor em maioria de votos: 75 pontos (Condição de Vitória dos Jogadores)
- Impostor não ser identificado: 75 pontos (Condição de Vitória do Impostor)
- Decréscimo de 15 pontos por rodada a partir da 2ª rodada, até o mínimo de 25 pontos,
afeta todos os jogadores e impostor, pois facilita a identificação do impostor e da palavra correta
*/

import type { IPlayer } from '~/store/slices/players/player'

export const calcScorePlayer = (
    player: IPlayer,
    disguised_player: IPlayer,
    winner: IPlayer,
    questionRound: number,
) => {
    let score = 0

    // Acertar o impostor: 25 pontos
    if (disguised_player.votes.includes(player._id)) {
        score += 25
    }

    // Identificar o impostor em maioria de votos: 75 pontos
    // (Condição de Vitória dos Jogadores)
    if (disguised_player._id === winner._id) {
        score += 75
    }

    // Decréscimo de 15 pontos por rodada a partir da 2ª rodada, até o mínimo de 25 pontos
    const decrease = 15 * (questionRound - 1)
    score = questionRound > 1 && score > 0 ? Math.max(25, score - decrease) : score

    return score
}

export const calcScoreDisguisedPlayer = (
    disguised_player: IPlayer,
    winner: IPlayer,
    questionRound: number,
    choose: string,
    item: string,
) => {
    let score = 0

    // Identificar o impostor em maioria de votos: 75 pontos
    // (Condição de Vitória dos Jogadores)
    if (disguised_player._id !== winner._id) {
        score += 75
    }

    // Impostor acertar a palavra correta: 100 pontos
    if (choose === item) {
        score += 100
    }

    // Decréscimo de 15 pontos por rodada a partir da 2ª rodada, até o mínimo de 25 pontos
    const decrease = 15 * (questionRound - 1)
    score = questionRound > 1 && score > 0 ? Math.max(25, score - decrease) : score

    return score
}
