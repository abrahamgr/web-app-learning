import { SetFavoriteCharacterRequest } from '@/app/api/character/route'
import { internalEndpoints } from '@/const/endpoints'

export function setFavoriteCharacter(characterId: number): Promise<Response> {
  const payload: SetFavoriteCharacterRequest = {
    characterId,
  }
  return fetch(new URL(internalEndpoints.setFavoriteCharacter, window.origin), {
    method: 'post',
    body: JSON.stringify(payload),
  })
}
