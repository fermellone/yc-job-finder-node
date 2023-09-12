import { Company } from "../types";

export const getCompanyIds = async (): Promise<string[]> => {
  const ALGOLIA_URL = "https://45bwzj1sgc-2.algolianet.com/1/indexes/*/queries";
  const headers = {
    "Content-Type": "application/json",
  };

  const params = {
    "x-algolia-application-id": "45BWZJ1SGC",
    "x-algolia-api-key":
      "MjA5YzZlNjI1NmZkYWE4NmYwNWQyNDM2M2U2MmIzOTEwYThjODliOTFiNzBhNDczZjdlMjI4ZWNhYjYwNWJiYXRhZ0ZpbHRlcnM9JTVCJTVCJTIyam9ic19hcHBsaWNhbnQlMjIlNUQlNUQmYW5hbHl0aWNzVGFncz0lNUIlMjJ3YWFzJTIyJTVEJnVzZXJUb2tlbj03SiUyRnFmZjdJMVBRUzAlMkIwRmxSb2I2NyUyQm1vTFZaNCUyRlQ0TFlRODB5SXVoUDQlM0Q=",
  };

  const body = {
    requests: [
      {
        indexName: "WaaSPublicCompanyJob_created_at_desc_production",
        params:
          "query=&page=0&filters=(remote%3Ayes%20OR%20remote%3Aonly)%20AND%20(us_visa_required%3Anone%20OR%20us_visa_required%3Apossible)&attributesToRetrieve=%5B%22company_id%22%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&hitsPerPage=1&clickAnalytics=true&distinct=true",
      },
    ],
  };

  const idsResponse = await fetch(
    `${ALGOLIA_URL}?${new URLSearchParams(params)}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const data = await idsResponse.json();

  const matchQty = data.results[0].nbHits;

  const fullBody = {
    requests: [
      {
        indexName: "WaaSPublicCompanyJob_created_at_desc_production",
        params: `query=&page=0&filters=(remote%3Ayes%20OR%20remote%3Aonly)%20AND%20(us_visa_required%3Anone%20OR%20us_visa_required%3Apossible)&attributesToRetrieve=%5B%22company_id%22%5D&attributesToHighlight=%5B%5D&attributesToSnippet=%5B%5D&hitsPerPage=${matchQty}&clickAnalytics=true&distinct=true`,
      },
    ],
  };

  const response = await fetch(
    `${ALGOLIA_URL}?${new URLSearchParams(params)}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(fullBody),
    }
  );

  const json = await response.json();

  const companyIds = json.results[0].hits
    .map((hit: { company_id: string }) => hit.company_id)
    .filter((id: string) => !!id) as string[];

  return companyIds;
};

export const getCompaniesByIds = async (
  companyIds: string[]
): Promise<Company[]> => {
  const headers = {
    "Content-Type": "application/json",
    Cookie:
      "_sso.key=13qd5kDmV4-fyd9MgCPEdZlxR5YehDLH; _bf_session_exists=eyJfcmFpbHMiOnsibWVzc2FnZSI6ImRISjFaUT09IiwiZXhwIjpudWxsLCJwdXIiOiJjb29raWUuX2JmX3Nlc3Npb25fZXhpc3RzIn19--c09bf3da17accf4c53e92f910eef613c6f99527b; waasInboxSortBy=newest; _bf_session_key=c0vEuxaAOrT0%2BEwIVGuSBvhskfdb6tHaOVgxTfYGj8FJVVypmga7BX2hjgGxk6AlBHvU9EUblDsSoGLlstktwlvvJsce5GdsF7G%2Bu2Xfu5wfdQ1NwIN3GDEBJlpvcKkiaKcHCo3BLWp6S%2BLcP%2Fk3oEIbd%2Fi4QU28fpT1buqRA21%2FcONVjPmwyEs59ETO4vGHspD9pdL1GIyfHdiNE3elQXkgksHyr1R5llDAqgBDp88c%2Brdk3hYqkYUSizlMBAznNAuR%2BUmAEbq0Mk7RdtqJG0hWagMsdr0%3D--KFAP02dGTjmCOjJq--xLa23iI4vgDu%2B0wahl2CDg%3D%3D",
    Referer:
      "https://www.workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=any&layout=list-compact&sortBy=created_desc&tab=any&usVisaNotRequired=any",
    "X-Csrf-Token":
      "blm2HBi6T4oNcADBbrMOk4apydQ7R0bTf_v5D6yNWQZPu8Kff9p5CVhwnrDBtS8toGyKAWvtLqHr_kgjYZpfYA",
  };

  const body = {
    ids: companyIds,
  };

  const response = await fetch(
    "https://www.workatastartup.com/companies/fetch",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  const companies: Company[] = data.companies
    .filter(
      (company: {
        primary_vertical: string;
        hiring_description: string;
        tech_description: string;
      }) => {
        const thereAreNoneFields = [
          company.primary_vertical,
          company.hiring_description,
          company.tech_description,
        ].includes("null");

        return !thereAreNoneFields;
      }
    )
    .map(
      (company: {
        id: string;
        name: string;
        website: string;
        slug: string;
        description: string;
        primary_vertical: string;
        one_liner: string;
        hiring_description: string;
        tech_description: string;
      }) => {
        return {
          id: company.id,
          name: company.name,
          website: company.website,
          slug: company.slug,
          description: company.description,
          primaryVertical: company.primary_vertical,
          oneLiner: company.one_liner,
          hiringDescription: company.hiring_description,
          techDescription: company.tech_description,
        } as Company;
      }
    );

  return companies;
};
