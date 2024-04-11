import type { NextApiRequest, NextApiResponse } from 'next';
import { PineconeClient, QueryRequest } from '@pinecone-database/pinecone';
import { Configuration, OpenAIApi } from 'openai';

function getHighestScoreUrl(items: any) {
  const highestScoreItem = items.reduce((prev: any, curr: any) => (prev.score > curr.score ? prev : curr));

  if (highestScoreItem.score > 0.8) {
    return { text: highestScoreItem.metadata.texto };
  }
  return { text: "Sorry, I don't know" };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;

  // only accept post requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  if (!question) {
    // eslint-disable-next-line consistent-return
    return res.status(400).json({ message: 'No question in the request' });
  }

  try {
    // OpenAI recommends replacing newlines with spaces for best results
    const sanitizedQuestion = question.trim().replaceAll('\n', ' ');

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

    const vector = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: sanitizedQuestion,
    });

    const queryRequest: QueryRequest = {
      vector: vector?.data?.data[0].embedding,
      topK: 5,
      includeValues: true,
      includeMetadata: true,
      namespace: 'queries-namespace-international-v4',
    };
    const searchResponse = await index.query({ queryRequest });
    const text = getHighestScoreUrl(searchResponse.matches);
    res.status(200).json(text);
  } catch (error: any) {
    console.log('error', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
