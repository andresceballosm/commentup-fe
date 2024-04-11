import type { NextApiRequest, NextApiResponse } from 'next';
import { PineconeClient } from '@pinecone-database/pinecone';
import { Configuration, OpenAIApi } from 'openai';
import { Vector } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

const values = [
  'Commentup is an AI-powered assistant that helps a recruiter find suitable candidates for a position.We will help you filter out the best candidates for your company, saving you time and money.',
  'To see all the positions you have created you must call the following query:getPositions',
  'To see all the positions you have open today, you must call the following query:getPositionsOpen',
  'To see all the positions you have paused today, you must call the following query:getPositionsPaused',
  'To see all the positions you have closed today, you must call the following query:getPositionsClosed',
  'To see the detail for a position id, you must call the following query:getPositionDetail',
  'To see all the candidates or postulations for a position number x, you must call the following query:getAllPostulations',
  'To see all the candidates in status X for a position id, you must call the following query:getPostulationsByStatus',
  'To create or add a new position id, you must call the following query:createPosition',
  'Comment has many interesting features like: 1)Recruiting candidates, 2)Filter the best candidates, 3)Chat, 4)Share information about social network.',
  'At our company, we have developed a cutting-edge that uses AI system that generates customized tests for each job position to accurately assess the skills and qualifications of job candidates.',
  'CommentUp is free!, we would love to hear your feedback, this is only the first feature, the idea is create more with the help of our early adopter as result of your comments. Our goal is to create payment plans in the future, but as an early adopter, you will receive exclusive benefits.',
  'Commentup es un asistente impulsado por inteligencia artificial que ayuda a un reclutador a encontrar candidatos adecuados para un puesto. Lo ayudaremos a filtrar a los mejores candidatos para su empresa, ahorrandole tiempo y dinero',
  'Para ver todas las posiciones que has creado debes llamar a la siguiente query:getPositions.',
  'Para ver todas las posiciones que tiene abiertas hoy, debe llamar a la siguiente query: getPositionsOpen.',
  'Para ver todas las posiciones que ha pausado hoy, debe llamar a la siguiente query:getPositionsPaused',
  'Para ver todas las posiciones que ha cerrado hoy, debe llamar a la siguiente query:getPositionsClosed',
  'Para ver el detalle de una identificaci&#243;n de posici&#243;n, debe llamar a la siguiente query:getPositionDetail',
  'Para ver todos los candidatos o postulaciones para un puesto numero x, debe llamar a la siguiente query:getAllPostulations',
  'Para ver todos los candidatos en estado X para una identificaci&#243;n de posici&#243;n, debe llamar a la siguiente query:getPostulationsByStatus',
  'Para crear o agregar una nueva identificaci&#243;n de posici&#243;n, debe llamar a la siguiente query:createPosition',
  'Comment tiene muchas caracter&#237;sticas interesantes como: 1)Reclutar candidatos, 2)Filtrar a los mejores candidatos, 3)Chatear, 4)Compartir informaci&#243;n sobre la red social',
  'En nuestra empresa, hemos desarrollado un sistema de vanguardia que utiliza inteligencia artificial que genera pruebas personalizadas para cada puesto de trabajo para evaluar con precisi&#243;n las habilidades y calificaciones de los candidatos',
  'CommentUp es gratis! Nos encantar&#237;a escuchar sus comentarios, esta es solo la primera caracter&#237;stica, la idea es crear m&#225;s con la ayuda de nuestros primeros usuarios como resultado de sus comentarios. Nuestro objetivo es crear planes de pago en el futuro, pero como uno de los primeros en adoptar, recibir&#225; beneficios exclusivos',
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT || '',
      apiKey: process.env.PINECONE_API_KEY || '',
    });

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const index = pinecone.Index('text-index-name');

    const pineconeVectors: Vector[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const parrafo of values) {
      // eslint-disable-next-line no-await-in-loop
      const vector = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: parrafo,
      });
      const dataVector = vector?.data?.data[0].embedding;
      pineconeVectors.push({
        id: parrafo.toString(),
        values: dataVector,
        metadata: { texto: parrafo },
      });
    }

    const upsertRequest = {
      vectors: pineconeVectors,
      namespace: 'queries-namespace-international-v5',
    };
    // Upsert vectors to the index
    const upsertResponse = await index.upsert({ upsertRequest });
    res.status(200).json('Index Upserted!');
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
