import runChat from '@/codes/gemini'
import { IHistory } from '@/interface/Igemini'
import { headers } from 'next/headers'
export async function GET(request: Request) {
  // carrega os dados do header da requisição
  const headersList = headers()
  let prompt = headersList.get('prompt')
  let historyString = headersList.get('history')
  //garante que não havera dados nulos
  let history:IHistory[] = []
  if (historyString) {
    history = JSON.parse( decodeURIComponent(historyString) )
  }
  prompt = prompt == null? "" : prompt
  
  //roda a api do google
  const resposta = await runChat(prompt, history).then()
  //devolve a resposta da API
  return Response.json({ prompt , resposta }) 
}