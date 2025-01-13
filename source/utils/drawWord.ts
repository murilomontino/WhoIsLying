import { getRandomBytesAsync } from 'expo-crypto'
import cartoon from '~/constants/cartoon.json'
import type { Cartoon, Categories } from '~/constants/categories'
import { shuffleArray } from './shuffleArray'

// Função para gerar um número inteiro aleatório dentro de um intervalo (min inclusivo, max exclusivo)
const getRandomInt = async (min: number, max: number): Promise<number> => {
    const randomBytes = await getRandomBytesAsync(4) // Gera 4 bytes aleatórios
    const randomNumber = new Uint32Array(randomBytes.buffer)[0] // Converte para inteiro
    return Math.floor((randomNumber / (0xffffffff + 1)) * (max - min)) + min
}

export const drawWord = async (cartoons: Categories[]): Promise<Cartoon> => {
    const randomIndex = await getRandomInt(0, cartoons.length)
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
        const randomWord = await drawWord(words)
        if (conditions(randomWord)) {
            word = randomWord
        }
    }

    return word as Cartoon
}

// quero que gere 7 palavras aleatórias
export const generateWords = async (
    category: Categories,
    numberOfWords = 7,
): Promise<Cartoon[]> => {
    const words = [category]
    for (let i = 0; i < numberOfWords; i++) {
        const word = await drawWord(cartoon as Categories[])
        words.push(word)
    }
    const items = shuffleArray(words)
    return items
}
