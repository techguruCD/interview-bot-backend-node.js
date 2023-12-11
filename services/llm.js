const { Chroma } = require('langchain/vectorstores/chroma')
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

async function saveEmbedding(profile) {
  const loader = new PDFLoader(path.join(__dirname, '../', profile.file))
  const docs = (await loader.load()).map(doc => ({
    pageContent: doc.pageContent,
    metadata: {
      profileId: profile.id
    }
  }))
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  console.log("==================")
  // console.log(await vectorStore.delete({ filter: { profileId: {$eq: '' + profile.id} } }))
  console.log('-----------------')
  console.log(await vectorStore.addDocuments(docs))
  // console.log(await vectorStore.delete({filter: {profileId: profile.id}}))
  // console.log(await vectorStore.delete({ ids: ['e91d02ae-512a-4e80-8462-8a22f4a2b6f7', 'c9242333-1d26-4ff0-81d5-03eec977a850'] }))
  // vectorStore.similaritySearch()
}

async function delEmbedding(profileId) {
  console.log(await pineconeStore.delete({ profileId }))
}

async function geEmbedding(id, message) {
  pineconeStore.fromDocuments()
}

async function generateMessage(user, messages) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  console.log("*****************************")
  const inputDoc = (await vectorStore.similaritySearch(messages[messages.length - 1].content, 5, { profileId: { $eq: '' + user.profile.id } })).map((doc, index) => `- Document ${index + 1}: ${doc.pageContent}`).join('\n')
  const systemContent = `Similarity Docs: ${inputDoc}\n\nPrompt:"${user.bot.prompt}"`

  // const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {pineconeIndex})
  // const model = new OpenAI();
  // const chain = VectorDBQAChain.fromLLM(model, vectorStore, {k: 1, returnSourceDocuments: true})
  // const response = await chain.call({query: "What is pinecone?"});
  // console.log(response)
  const deploymentId = 'my-deployment'
  try {
    // const result = await openAIClient.getChatCompletions(deploymentId, [
    //   { role: "system", content: "You are a helpful assistant." },
    //   { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
    //   { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI" },
    //   { role: "user", content: "Do other Azure AI services support this too" },
    // ])
    const result = await openAIClient.getChatCompletions(deploymentId, [
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

async function initConversationChain(user) {
  // if (!global.CONVERSATION_CHAIN['' + user.id])
  // global.CONVERSATION_CHAIN['' + user.id] = loadQAChain(llm, { type: 'stuff', prompt: user.bot.prompt }).run(embedded_result, { question })
}

module.exports = {
  saveEmbedding,
  delEmbedding,
  generateMessage,
  initConversationChain
}