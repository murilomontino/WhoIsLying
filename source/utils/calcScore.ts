/*
# O que pontua?
- Impostor acertar a palavra correta: 100 pontos
- Acertar o impostor: 25 pontos
- Identificar o impostor em maioria de votos: 75 pontos (Condição de Vitória dos Jogadores)
- Impostor não ser identificado: 75 pontos (Condição de Vitória do Impostor)
- Decréscimo de 15 pontos por rodada a partir da 2ª rodada, até o mínimo de 25 pontos,
afeta todos os jogadores, pois facilita a identificação do impostor
- Acréscimo de 10 pontos por rodada a partir da 2ª rodada, até o máximo de 50 pontos, afeta
somente o impostor, pois os jogadores podem identificar o impostor com mais facilidade
*/

import type { IPlayer } from '~/store/slices/players/player'

type CalcScoreParams = {
    player: IPlayer
    disguised_player: IPlayer
    winner: IPlayer | null
    questionRound: number
}

export const calcScorePlayer = ({
    disguised_player,
    player,
    questionRound,
    winner,
}: CalcScoreParams) => {
    let score = 0

    // Acertar o impostor: 25 pontos
    if (disguised_player.votes.includes(player._id)) {
        score += 25
    }

    // Identificar o impostor em maioria de votos: 75 pontos
    // (Condição de Vitória dos Jogadores)
    if (disguised_player._id === winner?._id) {
        score += 75
    }

    // Decréscimo de 15 pontos por rodada a partir da 2ª rodada, até o mínimo de 25 pontos
    const decrease = 15 * (questionRound - 1)
    score = questionRound > 1 && score > 0 ? Math.max(25, score - decrease) : score

    return score
}

type CalcScoreDisguisedParams = {
    disguised_player: IPlayer
    winner: IPlayer | null
    questionRound: number
    choose: string
    item: string
}

export const calcScoreDisguisedPlayer = ({
    choose,
    disguised_player,
    item,
    questionRound,
    winner,
}: CalcScoreDisguisedParams) => {
    let score = 0

    // Identificar o impostor em maioria de votos: 75 pontos
    // (Condição de Vitória dos Jogadores)
    if (disguised_player._id !== winner?._id) {
        score += 75
    }

    // Impostor acertar a palavra correta: 100 pontos
    if (choose.trim().toLowerCase() === item.trim().toLowerCase()) {
        score += 100
    }

    // Acréscimo de 10 pontos por rodada a partir da 2ª rodada, até o máximo de 50 pontos
    const increased = 10 * (questionRound - 1)
    score += questionRound > 1 ? Math.min(50, increased) : 0

    return score
}
