'use client'
import runChat from "@/codes/gemini";
import { Box, Button, TextField } from "@mui/material";
import { headers } from "next/headers";
import { useState } from "react";
import { json } from "stream/consumers";

// let key = process.env.GEMINI_API_KEY;

async function getData(prompt: string) {
  const res = await fetch('http://localhost:3000/api', {
    headers: {
      prompt: prompt,
      history: JSON.stringify([
        {
          role: "user",
          parts: [{ text: "Qual a capital do Brasil?" }]
        },
        {
          role: 'model',
          parts: [{ text: "Brasilia" }]
        }
      ])
    }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}



export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [conversa, setConversa] = useState("")
  let resposta
  function papear() {
    if (prompt != "") {
      resposta = getData(prompt)
        .then(resp => {
          console.log(resp)
          setConversa(`${conversa} \n ${resp.prompt} \n ${resp.resposta}`);
          return resp
        })

    }
  }

  return (
    <main>
      <Box component='section'>
        <p>{conversa}</p>
      </Box>
      <h1>Bora paear</h1>
      <TextField id="prompt" placeholder="Digite o comando" value={prompt} onChange={(event) => setPrompt(event.target.value)}></TextField>
      <Button variant="contained" onClick={papear} >Enviar</Button>
    </main>
  )
}