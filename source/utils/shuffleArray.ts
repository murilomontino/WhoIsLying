export function shuffleArray<T>(array: Array<T>): Array<T> {
    const newArray = [...array] // Cria uma cópia do array original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray // Retorna o array embaralhado
}
