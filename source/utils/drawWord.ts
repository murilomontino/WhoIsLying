import type { Cartoon } from '~/constants/cartoon'
import cartoon from '~/constants/cartoon'
import type { Categories } from '~/constants/categories'
import { shuffleArray } from './shuffleArray'
export const drawWord = (cartoons: Categories[]): Categories => {
    const randomIndex = Math.floor(Math.random() * cartoons.length)
    const selectedIndex = randomIndex % cartoons.length
    const shuffledCartoons = shuffleArray(cartoons)
    const cartoon = shuffledCartoons[selectedIndex]
    return cartoon
}

export const drawWordWithConditions = async (
    words: Categories[],
    conditions: (player: Categories) => boolean,
): Promise<Cartoon> => {
    let word = null
    while (word === null) {
        if (words.length === 0) {
            break
        }
        const randomWord = drawWord(words)
        if (conditions(randomWord)) {
            word = randomWord
        }
    }

    return word as Cartoon
}

// quero que gere 7 palavras aleatórias
export const generateWords = (
    category: Categories,
    numberOfWords = 7,
): Categories[] => {
    const words = [category]
    for (let i = 0; i < numberOfWords; i++) {
        const word = drawWord(cartoon)
        words.push(word)
    }
    const items = shuffleArray(words)
    return items
}
