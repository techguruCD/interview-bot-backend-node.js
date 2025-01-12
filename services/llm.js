const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { Pinecone } = require('@pinecone-database/pinecone')
const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { Document } = require('langchain/document')
const { BaseLLM } = require('langchain/llms/base')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
// const { OpenAI } = require('langchain/llms/openai')
const { loadQAChain, LLMChain, RetrievalQAChain, VectorDBQAChain } = require('langchain/chains')
const { ChatOpenAI } = require('langchain/chat_models/openai')
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai')
// const Together = require('together-ai')
// const MarkdownHeaderTextSplitter = require('langchain/text_splitter')
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter')
const SelfqueryRetriever = require('langchain/retrievers/self_query')

const path = require('path')

global.CONVERSATION_CHAIN = {}

const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_KEY,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_CHAT_VERSION,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
})

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME)

// const pineconeStore = new PineconeStore(embeddings, { pineconeIndex })
const openAIClient = new OpenAIClient(process.env.AZURE_OPENAI_BASE_URL, new AzureKeyCredential(process.env.AZURE_OPENAI_KEY))

async function saveFileEmbedding({fileName, profileId, fileId}) {
  const loader = new PDFLoader(path.join(__dirname, '../', fileName))
  const docs = (await loader.load()).map(doc => ({
    pageContent: doc.pageContent,
    metadata: {
      profileId,
      fileId,
      type: 'cv'
    }
  }))
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {pineconeIndex})
  await vectorStore.addDocuments(docs)
}

async function saveDocsEmbedding({docs}) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {pineconeIndex})
  await vectorStore.addDocuments(docs)
}

async function delFileEmbedding({profileId, fileId, fileName}) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {pineconeIndex})
  await vectorStore.delete({filter: {
    profileId: {$eq: '' + profileId},
    fileId: {$eq: fileId},
    type: {$eq: 'cv'}
  }})
}

async function saveProfileEmbedding({profileId, content}) {
  let docs = [
    {
      pageContent: content,
      metadata: {
        profileId,
        type: 'profile'
      }
    }
  ]

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {pineconeIndex})
  await vectorStore.delete({filter: {profileId: {$eq: '' + profileId}, type: {$eq: 'profile'}}})
  await vectorStore.addDocuments(docs)
}

async function saveEmbedding({ profileId, profile, file }) {
  let docs = [];
  let metaFilters = [];
  if (profile) {
    docs.push({
      pageContent: profile,
      metadata: {
        profileId,
        type: 'profile'
      }
    })
    metaFilters.push('profile')
  }
  if (file) {
    try {
      const loader = new PDFLoader(path.join(__dirname, '../', file))
      docs = docs.concat((await loader.load()).map(doc => ({
        pageContent: doc.pageContent,
        metadata: {
          profileId,
          type: 'cv'
        }
      })))
      metaFilters.push('cv')
    } catch (err) {
      console.log(err)
    }
  }
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  await vectorStore.delete({ filter: { profileId: { $eq: '' + profileId }, type: { $in: metaFilters } } })
  await vectorStore.addDocuments(docs)
}

async function generateMessage({profileId, sitePrompt, profilePrompt, messages}) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  const inputDocs = (await vectorStore.similaritySearch(messages[messages.length - 1].content, 5, { profileId: { $eq: '' + profileId } }))
  let systemContent = ""
  
  for (let i = 5; i > 1; i --) {
    let inputDoc = inputDocs.slice(0, i).map((doc, index) => `- Document ${index + 1}: ${doc.pageContent}`).join('\n')
    systemContent = `Similarity Docs: ${inputDoc}\n\nPrompt:"${sitePrompt}\n${profilePrompt}\n********************************\n"`
    if (systemContent.length <= 8192) break;
  }

  try {
    const result = await openAIClient.getChatCompletions(process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_ID, [
      {
        role: 'system',
        content: systemContent
      },
      ...messages
    ])
    return result.choices?.[0]?.message?.content
  } catch (err) {
    return null;
  }
}

module.exports = {
  saveEmbedding,
  saveFileEmbedding,
  saveProfileEmbedding,
  delFileEmbedding,
  generateMessage,
  saveDocsEmbedding
}