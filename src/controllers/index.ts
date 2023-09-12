import { NextFunction } from "express";
import {
  getCompaniesVectorStore,
  getEmbeddingModel,
  parseCompaniesToDocuments,
} from "../services/langchain";
import { getCompaniesByIds, getCompanyIds } from "../services/yc-api";
import { Company, Request, Response } from "../types";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export class IndexController {
  async getIndex(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { profile, "company-description": companyDescription } = req.body;

      let companyIds: string[];

      try {
        // Get company ids from yc website
        console.log("getting company ids");
        companyIds = await getCompanyIds();
      } catch (error) {
        console.error("Failed to get company ids", error);
        throw error;
      }

      let companies: Company[];

      try {
        // Get companies from yc website
        console.log("getting companies");
        companies = await getCompaniesByIds(companyIds);
      } catch (error) {
        console.error("Failed to get companies", error);
        throw error;
      }

      let documents: Document<Company>[];

      try {
        // Parse companies to documents
        console.log("parsing companies to documents");
        documents = parseCompaniesToDocuments(companies);
      } catch (error) {
        console.error("Failed to parse companies to documents", error);
        throw error;
      }

      let companiesVectorStore: MemoryVectorStore;

      try {
        // Get the embedding model
        console.log("getting embedding model");
        const embeddingModel = getEmbeddingModel();

        // Create the chroma vectors collection
        companiesVectorStore = await getCompaniesVectorStore(
          documents,
          embeddingModel
        );
      } catch (error) {
        console.error("Failed to parse companies to documents", error);
        throw error;
      }

      let results: Document<Company>[];

      try {
        // Create the prompt
        const prompt = `Given the company description: ${companyDescription}, find the most similar companies to ${profile}`;

        //  Do similarity search
        console.log("doing similarity search");
        results = (await companiesVectorStore.similaritySearch(
          prompt,
          15
        )) as Document<Company>[];
        console.log("finished similarity search", results);
      } catch (error) {
        console.error("Failed to do similarity search", error);
        throw error;
      }

      console.log("results", results);

      console.log("mapping results");
      const companiesResult = results.map((result) => result.metadata);
      console.log("mapped results", companiesResult);

      // Return the results
      res.json({
        statusCode: 200,
        status: "success",
        companies: companiesResult ?? [{}],
      });
    } catch (error) {
      next(error);
    }
  }
}
