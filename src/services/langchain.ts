import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Company } from "../types";

export const parseCompaniesToDocuments = (companies: Company[]) => {
  console.log("companies in parsecompanies 1", companies.length);
  const metadata = companies.filter((company) => {
    console.log("company", company);
    return company;
  });
  console.log("metadata in parsecompanies 2", metadata.length);

  const contents = companies.map((company) => JSON.stringify(company));

  const documents = metadata
    .filter((metadata, index) => {
      console.log("metadata", metadata);
      const isMetadataValid = !Object.values(metadata).includes(undefined);

      if (!isMetadataValid) {
        console.error("Invalid metadata", metadata, companies[index]);
      }

      return isMetadataValid;
    })
    .map((metadata, index) => {
      console.log("metadata", metadata);
      console.log("content", contents[index]);
      return new Document({
        metadata,
        pageContent: contents[index],
      });
    });

  console.log("documents in parsecompanies", documents);

  return documents;
};

export const getEmbeddingModel = () =>
  new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 512, // Default value if omitted is 512. Max is 2048
    modelName: "text-embedding-ada-002",
    maxRetries: 2,
  });
