import { clientConfig } from '@/const/clientConfig'
import { Character } from '@/types/character'
import { endpoints } from '@/const/endpoints'
import { Result } from '@/types/result'

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

export async function getMultipleCharacters(
  ids: number[],
): Promise<Character[]> {
  if (!ids) return []
  const response = await fetch(
    new URL(`${endpoints.getCharacter}/${ids.join(',')}`, clientConfig.apiHost),
  )
  if (ids.length === 1) {
    const singleCharacter: Character = await response.json()
    return singleCharacter ? [singleCharacter] : []
  }
  const result: Character[] = await response.json()
  return result ?? []
}
