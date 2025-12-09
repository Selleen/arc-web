# ARC-WORLD

A platform for exploring and classifying software-based artworks

### To Run the project:

- Run the frontend:

Run the following command inside the folder `/arc-web`: 

```bash
npm run dev
```

or

If is in a remote server:

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

- Run the backend:

Move to the folder `'/backend'`:

```bash
cd /backend
```

And run the following command:

```bash
python -m uvicorn api:app --reload --port 8001
```

### Organization of the folders

- `/LLM_architecture`: This folder contains everything related to calling the LLM. It includes the following files:
    - config.py: Configuracion usada en inference.py(file name of LLM response, maximum number of tokens per batch, among others).
    - inference.py: Main core of the project, where it calls to the LLM. It's implemented to LLAMA-3.1-70B and LLAMA-3.1-8B, depending on the amount of GPU that you have available.
    - prompt_template.py: The prompt that is send to the LLM, inside the inference.py file we build the prompt with the information bring it in the `/data`.
    - result.jsonl: It's the file where we are going to append the response of the LLM.
    - new_input.jsonl: It just used for testing the model, contains the format that the LLM will read.

- `/src/componenets`: Compenents used in the frontend
- `/src/data`: Here we have different files:
    - artworks.json: Where we storage the metadata of 74 artworks. This is our library.
    - reference.json: Where we storage the reference used in this reseach that represent the base of our project. This references will be show in the References page.
    - watercolor_paint_sketch.js: An example of piece of art(code) to test the model in the Classification page.
- `/src/p5`: The `darkflowers2Sketch.js` file is the artwork that is running in the homepage.
- `/src/pages`: The pages of the framework:
    - `HomePage.jsx`: The home page.
    - `LibraryPage.jsx`: Where we show the list of 74 artworks with 3 filters. Each card in the list represent an artwork and have the following interactions if apply, `1)` Reference: Link to the online repo where the artwork was place it the first time, `2)` Live Demo: how the artwork looks like, the outcome.
    - `ClassificationPage.jsx`: Here we can upload a single file in .js and Run the classification. This will call the backend and send the prompt to the LLM and wait for the classification response.
    - `BestPracticesPage.jsx`: A list of best practices of preservation of digital arts and how to document them, taken from the article `"Preservation of software-based art at Tate"`.
    - `ReferencesPage.jsx`: A list of the references used for the development of the project.


