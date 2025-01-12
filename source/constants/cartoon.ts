import cartoons from './cartoon.json'

export type Cartoon = {
    name: string
    genre: string
    year_of_release: number
    brief_description: string
    tags: string[]
    clues: string[]
    difficulty: 0 | 1 | 2 | 3 | 4 | 5
}

const cartoon: Cartoon[] = cartoons as Cartoon[]

export default cartoon
