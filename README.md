# Open Data Maturity Report

The [Open Data Maturity Report 2024](https://data.europa.eu/en/publications/open-data-maturity/2024) ([2023](https://data.europa.eu/en/publications/open-data-maturity/2023)) shows the current implementation status of open data across the EU. It is based on a survey of all member states. The result of the report is available as a PDF and all raw data has been published as Excel files. A website with a dashboard exists.

Try the current version [here](https://demo.govdata.de/maturity-report/)

## Why this website then?

![Logo](https://raw.githubusercontent.com/tursics/maturity-report/main/assets/icon-256x256.png)

The PDF summarizes the results very well, but does not shed light on every detail in the participating states. The Excel files are super detailed, but not fun to research. The dashboard is very superficial and contains missing and incomplete translations.

That's why I built my own visualization of the Maturity Report. I valued the following features:

- Show all questions and all answers
- Show all information from all states on the same page
- Zoom in on a state's response
- Compare the answers from all states in a simple way
- Show only the states you want
- Translate all questions and answers (from Germany) into German
- Use a nice look and layout
- A simple search, even across all states
- All totals are recalculated (and no longer contain any errors)
- A graphical view of which question is worth how many points and if it was answered correctly
- Overview of all questions, whether you achieved full points, from all states, on one screen
- Sort the states according to the points achieved, both overall but also in the topic groups and at the individual question level

## Prepare data

You are invited to prepare the data for another year or another state. Here is a guide on how the current data was prepared:

1. Download the zip file "Download Country Questionnaire 2024" from the site [Open Data Maturity 2024](https://data.europa.eu/en/publications/open-data-maturity/2024)
2. Extract the content of the zip file to folder `/2024` in the root of this project
3. Copy the files with question and answers to folder `/2024/1-source-data`.

  - If available, rename the questionnaire file to `00_ODM2023...` (found in year 2023 but not in 2024)

4. Convert all Excel files to csv file and save them in folder `/2024/2-csv-files`.

  - If available, save the 4 pages of questionnaire Excel file to 4 csv files
  - in 2024 the 1 page Excel file was changed to a 4 page Excel file. Convert all pages to csv file

5. Open all csv files, improve the files and save the results in folder `/2023/3-simplified`

- fill in the first column with valid values. No cell may remain empty
- remove duplicate heading lines
- remove subtotal rows
- remove table (a table in a table!) with HVD
- remove columns "Question" and "Guide to Answering"

6. Duplicate all exisiting csv and append ISO code of choosen language like `/2023/3-simplified/AL_ODM_2023_de.csv`

- remove column "Score"
- translate all cells
- or: just leave the headline and row "R1" to translate the name of the state

## Copyright

The code is licensed under MIT license (the code is free to use and can be modified). The flag icons are free too, see https://github.com/lipis/flag-icons. The used data are from the [European Union Maturity Report 2023](https://data.europa.eu/en/publications/open-data-maturity/2023) and licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/) (and are modified, e.g. translated).
