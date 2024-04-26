import { clientConfig } from '@/const/clientConfig'
import { Character } from '@/types/Character'
import { endpoints } from '@/const/endpoints'
import { Result } from '@/types/Result'

export async function getCharacter(id: number): Promise<Character> {
  const response = await fetch(
    new URL(`${endpoints.getCharacter}/${id}`, clientConfig.apiHost),
  )
  const character: Character = await response.json()
  return character
}

export async function getAllCharacters(): Promise<Character[]> {
  const response = await fetch(
    new URL(endpoints.getCharacter, clientConfig.apiHost),
  )
  const result: Result<Character[]> = await response.json()
  return result.results ?? []
}
