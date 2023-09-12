# Project README

MVP Stage. The code can be improved and refactored 😆

## Overview

This project aims to provide a solution for finding companies that are most similar to a given profile, based on company descriptions. It leverages various services and technologies to achieve this, including similarity search.

## Functionality

The core functionality of this project can be summarized as follows:

1. **Data Retrieval**: The project collects information about companies from a source (YC website) to create a dataset.

2. **Data Processing**: It processes this data to create a set of documents, each representing a company along with its description.

3. **Embedding Model**: The project uses an embedding model to convert these company descriptions into numerical vectors, facilitating similarity calculations.

4. **Similarity Search**: Users can input a profile and a company description. The project then performs a similarity search to find the most similar companies to the given profile based on the provided description.

5. **Results**: The project returns a list of companies that are similar to the provided profile.

## Usage

To use this project, you can interact with it via an API or user interface. You will need to provide a profile and a company description, and the system will return a list of similar companies.

## Dependencies

This project relies on several external libraries and services to function effectively. These include:

- **Express**: Used for building the API.
- **Langchain**: Provides tools for natural language processing and vectorization.
- **YC API**: Used to fetch company information.
- **MemoryVectorStore**: Part of Langchain, used to store and search for vectorized documents.

## Getting Started

To set up and run this project, follow these steps:

1. Install the required dependencies and ensure the necessary services (e.g., YC website) are accessible.

2. Configure any environment variables or settings required for the project.

3. Start the project, and it will be ready to accept requests for finding similar companies.

## Contributors

This project is maintained and developed by Fernando Mellone.
