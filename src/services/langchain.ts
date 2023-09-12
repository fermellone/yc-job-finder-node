import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Company } from "../types";

export const parseCompaniesToDocuments = (companies: Company[]) => {
  const metadata = companies.filter((company) => {
    return company;
  });

  const contents = companies.map((company) => JSON.stringify(company));

  const documents = metadata
    .filter((metadata, index) => {
      const isMetadataValid = !Object.values(metadata).includes(undefined);

      if (!isMetadataValid) {
        console.error("Invalid metadata", metadata, companies[index]);
      }

      return isMetadataValid;
    })
    .map((metadata, index) => {
      return new Document({
        metadata,
        pageContent: contents[index],
      });
    });

  return documents;
};

export const getEmbeddingModel = () =>
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    modelName: "text-embedding-ada-002",
    maxRetries: 2,
  });
