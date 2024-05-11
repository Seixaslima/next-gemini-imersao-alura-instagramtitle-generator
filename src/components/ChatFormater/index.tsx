import { IHistory } from '@/interface/Igemini'
import React, { memo } from 'react'

interface IChatFormarter {
  historico: IHistory[]
}

export default function ChatFormater({ historico }: IChatFormarter) {

  console.log(historico)
  let listaDeParagrafos: string[] = []

  historico.forEach(chat => {
    listaDeParagrafos.push(chat.role);
    const paragrafos = chat.parts[0].text.split("\n")
    paragrafos.forEach(paragrafo => listaDeParagrafos.push(paragrafo))
  })

  return (
    listaDeParagrafos.map((paragrafo, index) => {
      return <p key={index}> {paragrafo} </p>
    })
  )
}


