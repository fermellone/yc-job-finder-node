import { MemoryVectorStore } from "langchain/vectorstores/memory";

import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export const getCompaniesVectorStore = async (
  documents: Document[],
  embeddingModel: OpenAIEmbeddings
) => {
  console.log("documents", documents);
  return MemoryVectorStore.fromDocuments(documents, embeddingModel);
};
