var questionTree = {
    type: 'root',
    id: {2023: 'root', 2024: 'root'},
    title: 'Open Data Maturity Report',
    children: [
        {
            type: 'dimension',
            id: {2023: 'D0', 2024: 'D0'},
            title: 'info',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D0.1'},
                    title: 'Background information',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: 'R1'},
                            title: 'What is your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R2'},
                            title: 'What is your organisation?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R3'},
                            title: 'What is your name?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R4'},
                            title: 'What is your position/role?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R5'},
                            title: 'What is your email address?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R6'},
                            title: 'What is the size of national open data team ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R7'},
                            title: 'How many FTE(s) are in the national open data team?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R8'},
                            title: 'What is the annual budget of the national portal?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D0.2'},
                    title: 'data.europa.eu and national open data portals',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: 'R9'},
                            title: 'Are you satisfied with data.europa.eu as a European single point of access?'
                        },
                        {
                            type: 'entry',
                            id: {2023: 'R10'},
                            title: 'Does the portal data.europa.eu reflect the data that your national portals hosts?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'debug', 2024: 'debug'},
                    title: 'Debug',
                    children: []
                }
            ]
        },
        {
            type: 'dimension',
            id: {2023: 'D1', 2024: 'D1'},
            title: 'Dimension 1: Open Data Policy',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D1.1', 2024: 'D1.1'},
                    title: '1.1 Policy framework',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '1', 2024: 'P1'},
                            title: 'Is there a national open data policy in your country...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '2', 2024: 'P2'},
                            title: 'Is there a national open data strategy in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '3'},
                            title: 'Has this national strategy/policy been updated in the past 24 months?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '4', 2024: 'P3'},
                            title: '... open data policy/strategy at regional or local level?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '5', 2024: 'P4'},
                            title: 'Does the national strategy/policy include an action plan with measures to be implemented in the open data field?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '6a', 2024: 'P5'},
                            title: 'Does the national strategy/policy outline measures to incentivise the publication of and access to real-time or dynamic data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '6b'},
                            title: 'Does the national strategy/policy outline measures to incentivise the publication of and access to geo-spatial data (e.g. in relation to high-value datasets as specified in the implementing regulation (EU) 2023/138)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '6c', 2024: 'P6'},
                            title: 'Does the national strategy/policy outline measures to incentivise the publication of and access to citizen-generated data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '6d', 2024: 'P7'},
                            title: 'Does the national strategy/policy foster the discoverability of the aforementioned types of data from your country on data.europa.eu?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '7', 2024: 'P8'},
                            title: 'Does the national strategy/policy outline measures to support the reuse of open data by the public sector?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '8', 2024: 'P9'},
                            title: 'Does the national strategy/policy outline measures to support the reuse of open data by the private sector?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '9a', 2024: 'P10-a'},
                            title: 'Does the national strategy/policy mandate carrying out and maintaining a data inventory by public bodies, whether at national or local level?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '9b', 2024: 'P10-b'},
                            title: '... include the data collected by public bodies that cannot be published as open data (e.g. in relation to the EU Data Governance Act (EU) 2022/868)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '10a'},
                            title: 'Has your country started working towards the application of the implementing regulation (EU) 2023/138 on high-value datasets?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '10b'},
                            title: 'Are there measures in place to assist other stakeholders’ involvement in this prioritisation process?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '10c'},
                            title: 'Are the public bodies in your country progressing in denoting relevant datasets as high-value datasets in their metadata following the publication of the implementing regulation (EU) 2023/138 on high-value datasets?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a'},
                            title: 'Are the objectives/actions of the national open data policy/strategy in place in your country in line with one or more of the European Commission priorities for 2019-2024?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.1'},
                            title: 'A European Green Deal'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.2'},
                            title: 'A Europe fit for the digital age'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.3'},
                            title: 'An economy that works for people'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.4'},
                            title: 'A stronger Europe in the world'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.5'},
                            title: 'Promoting our European way of life'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11a.6'},
                            title: 'A new push for European democracy'
                        },
                        {
                            type: 'entry',
                            id: {2023: '11b'},
                            title: 'Are there any other overarching objectives or specific actions of your country´s open data policy/strategy that you would like to mention?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'P11'},
                            title: 'Is your country applying the implementing regulation (EU) 2023/138 on high-value datasets?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'P12'},
                            title: 'Have the public bodies in your country denoted relevant datasets as high-value datasets in their metadata following the publication of the implementing regulation (EU) 2023/138 on high-value datasets?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D1.2', 2024: 'D1.2'},
                    title: 'Governance of open data',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '12', 2024: 'P13'},
                            title: 'Is there a governance structure in place that enables the participation and/or inclusion of various open data stakeholders?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '13', 2024: 'P14'},
                            title: '... the model used for governing open data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '14', 2024: 'P15'},
                            title: 'Does the governance structure ensure that the local and regional open data initiatives are facilitated and supported at national level?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '15', 2024: 'P16'},
                            title: 'To what degree do local/regional public bodies conduct open data initiatives?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '16'},
                            title: 'Are the governance structure and its operating model (including the people and the team responsbile for open data activities) published online and accessible to the public?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '17a', 2024: 'P17'},
                            title: 'Is a document describing the responsibilities and governance structure of the national (and/or regional/local) open data team publicly available?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '17b', 2024: 'P18'},
                            title: 'Is there a regular exchange of knowledge or experiences between the national open data team and the team maintaining the national portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '18', 2024: 'P19'},
                            title: 'Does the governance model include the appointment of official roles in civil services that are dedicated to open data (e.g. open data officers)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '19', 2024: 'P20'},
                            title: 'Is there a regular exchange of knowledge or experiences between the national open data team and the wider network of open data ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '20', 2024: 'P21'},
                            title: 'Is there a regular exchange of knowledge or experiences between public sector bodies (i.e. the providers) and open data reusers (e.g. academia, citizens, businesses)?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D1.3', 2024: 'D1.3'},
                    title: 'Open data implementation',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '21', 2024: 'P22'},
                            title: 'Do data publication plans exist at public body level?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '22a', 2024: 'P23'},
                            title: 'Are there processes to ensure that the open data policies/strategy previously mentioned are implemented (e.g. monitoring)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '22b'},
                            title: 'If yes, would you describe the status of implementation as satisfactory/neutral/unsatisfactory?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'P24'},
                            title: 'Do you update your policy/strategy as appropriate to ensure its success, such as based on data collected for monitoring?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '23a', 2024: 'P25'},
                            title: '... if public sector bodies are charging for data above marginal cost? (please see directive (EU) 2019/1024 on open data and the ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '23b'},
                            title: 'If yes [to Q23a], to what degree is data provided by public sector bodies free of charge?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '23c'},
                            title: 'How has this degree changed compared to the previous year?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '24a', 2024: 'P26-a'},
                            title: 'What are the top 3 challenges that your country is facing in the implementation of the mentioned open data policies/strategy?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '24b', 2024: 'P26-b'},
                            title: 'Are there activities in place to address these challenges in your country (e.g. with specific national/regional/local plans or initiatives)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '25a', 2024: 'P27'},
                            title: 'Are there any activities in place to assist data ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '25b'},
                            title: 'Are there activities to assist real-time and/or dynamic data holders in their publication process?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '25c'},
                            title: 'Are there activities to assist geo-spatial data holders in their publication process?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '25d'},
                            title: 'Are there activities to assist citizens or their working organisations in the publication of citizen-generated data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '26a', 2024: 'P28'},
                            title: 'Is there a professional development or training plan for civil servants working with data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '26b'},
                            title: 'If yes [to Q26a], do these training activities offer a certification that is formally recognised?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '27a', 2024: 'P29'},
                            title: 'Are there annually held national, regional or local events (e.g. hackathons, courses, conferences, users meet-ups, summer/winter schools) to promote open data and open data literacy ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '27b'},
                            title: 'Who organises most open data related events?'
                        }
                    ]
                }
            ]
        },
        {
            type: 'dimension',
            id: {2023: 'D3', 2024: 'D2'},
            title: 'Open Data Portal',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D3.1', 2024: 'D2.1'},
                    title: 'Portal features',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '59', 2024: 'PT1'},
                            title: 'Is there a national portal in your country for ...'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT2'},
                            title: 'What is the technology stack of your portal (e.g. based on uData, CKAN, etc.)'
                        },
                        {
                            type: 'entry',
                            id: {2023: '60'},
                            title: 'Does the national portal offer an advanced data search function (multiple field search, filter options, etc.)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '61'},
                            title: 'Does the national portal offer the possibility for users to download datasets (e.g. via a link)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '62a'},
                            title: 'Does the national portal offer the possibility for users to search by file format?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '62b'},
                            title: 'Does the national portal offer the possibility for users to search by data domain?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '63'},
                            title: 'Does the national portal offer to its users a way to programmatically query the metadata (e.g. via an API or a SPARQL access point)?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT3'},
                            title: 'Does the national portal offer to its users a way to programmatically query the metadata via an API?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT4'},
                            title: 'Does the national portal offer to its users a way to programmatically query the metadata via a SPARQL access point?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '64'},
                            title: 'Does the national portal offer documentation on the use of APIs and other tools that enable working with the aforementioned metadata?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT5'},
                            title: 'Does the national portal offer/link to documentation on the use of APIs?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT6'},
                            title: 'Does the national portal offer/link to documentation on the use of SPARQL?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '65'},
                            title: 'Does the national portal enable users to provide content for the portal (e.g. to link documentation and supporting materials to a given dataset)?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT7'},
                            title: 'Does the national portal provide functionality for users to contribute datasets they have produced or enriched?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '66a', 2024: 'PT8'},
                            title: 'Does the national portal offer a general feedback mechanism for users (e.g. a ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '66b', 2024: 'PT9'},
                            title: 'Does the national portal offer a feedback mechanism at dataset level? (e.g. a ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '66c', 2024: 'PT10'},
                            title: 'Does the national portal provide a mechanism for users to rate datasets?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '67', 2024: 'PT11'},
                            title: 'Does the national portal enable users to find information and news on relevant open data topics in the country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '68', 2024: 'PT12'},
                            title: 'Does the national portal offer the possibility for users to receive notifications when new datasets are available on the national portal (RSS, ATOM feeds, email notifications etc.)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '69a', 2024: 'PT13'},
                            title: 'Does the national portal offer the possibility for users to request datasets?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '69b'},
                            title: 'If yes [to Q69a], what is the frequency of these requests?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '69c', 2024: 'PT14'},
                            title: 'Are these requests and their progress status presented in a transparent manner on the national portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '70a', 2024: 'PT15'},
                            title: 'Does the team monitor the extent to which requests (either via the portal or otherwise) result in the publication of the requested data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '70b'},
                            title: 'If yes [to Q70a], to what degree do these requests result in the publication of the requested data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '71', 2024: 'PT16'},
                            title: 'Does the national portal include a discussion forum ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '72', 2024: 'PT17'},
                            title: 'Does the national portal have a designated area to showcase use cases?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '73', 2024: 'PT18'},
                            title: 'Does the national portal reference the datasets that the showcased ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '74', 2024: 'PT19'},
                            title: 'Does the national portal provide the possibility for users to submit their own ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '75', 2024: 'PT20'},
                            title: 'Does the national portal offer a preview function for tabular data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '76', 2024: 'PT21'},
                            title: 'Does the national portal offer a preview function for geospatial data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '77', 2024: 'PT22'},
                            title: '... HVD ... are you progressing in the promotion of such datasets on your national portal ...'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D3.2', 2024: 'D2.2'},
                    title: 'Portal usage',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '78'},
                            title: 'Is the national portal mobile as responsive as the desktop version?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '79', 2024: 'PT23'},
                            title: 'Do you monitor the portal\'s traffic ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '90a', 2024: 'PT24'},
                            title: 'Do you run analytics on API usage ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '90b'},
                            title: 'If yes [to Q90b], what percentage of outgoing portal traffic is generated by API usage only?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '80a'},
                            title: 'Are traffic and usage statistics used to better understand users´ behaviour and needs and to update the portal accordingly?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '80b', 2024: 'PT25'},
                            title: 'Do you perform further activities to better understand ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '81a'},
                            title: 'What is the typical profile of the portal visitor, as learned from activities such as web analytics, surveys, or social media analyses?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '81b'},
                            title: 'Does this profile match the type of audience your national portal wants to cater to?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT26'},
                            title: 'Do you used the insights about portal usage and about the behaviour and needs of portal users to improve the portal accordingly?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'PT27'},
                            title: 'Do you undertake any activities to promote the portal and attract new users or new audiences?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '82'},
                            title: 'How many unique visitors visit the national portal on average per month?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '83'},
                            title: 'What percentage of the unique visitors to the national portal is foreign?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '84', 2024: 'PT28'},
                            title: 'Do you monitor what keywords are used to search for data and content on the portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '85', 2024: 'PT29'},
                            title: 'Do you monitor the most and least consulted pages?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '86'},
                            title: 'What data categories are the top 5 most frequently consulted on the portal ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '87'},
                            title: 'What datasets are the top 5 most frequently consulted on the portal ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '88', 2024: 'PT30'},
                            title: 'Do you take measures to optimise the search and discoverability of content (data and editorial)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '89', 2024: 'PT31'},
                            title: 'Is the metadata on your portal available in clear plain language to enable both humans and machines to read and understand it?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D3.3', 2024: 'D2.3'},
                    title: 'Data provision',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '91', 2024: 'PT32'},
                            title: 'To what degree do public sector data providers contribute data to the portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '92a', 2024: 'PT33'},
                            title: 'Do you identify the data providers that are not yet publishing data on the national portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '92b', 2024: 'PT34'},
                            title: 'Were there concrete actions taken to assist these data providers with their publication process?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '93a', 2024: 'PT35'},
                            title: 'Besides the national open data portal, are there other regional and local portals?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '93b', 2024: 'PT36'},
                            title: '... their data sources discoverable via the national portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '93c', 2024: 'PT37'},
                            title: '... to what degree are existing regional and local sources harvested automatically?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '94a', 2024: 'PT38'},
                            title: 'Does the national portal include datasets that are real-time or dynamic?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '94b'},
                            title: 'If yes [to Q94a], what percentage of metadata links to such data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '95', 2024: 'PT39'},
                            title: 'Does the national portal provide a separate section where non-official data ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '96'},
                            title: 'Do you have an overview of the data providers (official and non-official) on your national portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '97', 2024: 'PT40'},
                            title: 'Does the national portal allow users to see what data exists but cannot be made available as open data?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D3.4', 2024: 'D2.4'},
                    title: 'Portal sustainability',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '98', 2024: 'PT41'},
                            title: 'Does the national portal have a strategy to ensure its sustainability?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '99'},
                            title: 'Does this strategy include a description of the porta’s target audience and measures to reach this audience?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '100', 2024: 'PT42'},
                            title: 'Is your national portal active on social media?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '101'},
                            title: 'Do you take actions to promote the national portal’s activities and the available open data ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '102', 2024: 'PT43'},
                            title: 'Are the portals source code ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '103'},
                            title: 'Was there a user satisfaction survey concerning the national portal conducted in the past year?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '104a'},
                            title: 'Is there a process by which the portal is reviewed and improved regularly?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '104b'},
                            title: 'If yes [to Q104a], what is the frequency of these reviews?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '104c'},
                            title: 'If yes [to Q104a], is the users’ feedback considered in the review process?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '105a', 2024: 'PT44'},
                            title: '... the characteristics of the data published on the portal, such as the distribution across categories, ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '105b', 2024: 'PT45'},
                            title: 'Does this monitoring enable the portal team and/or data providers to take action to improve their performance on the national portal?'
                        }
                    ]
                }
            ]
        },
        {
            type: 'dimension',
            id: {2023: 'D4', 2024: 'D3'},
            title: 'Open Data Quality',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D4.1', 2024: 'D3.1'},
                    title: 'Currency and completeness',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '106', 2024: 'Q1'},
                            title: 'Is there a pre-defined approach to ensure that metadata is kept up-to-date?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '107', 2024: 'Q2'},
                            title: '... is obtained from the source automatically, rather than edited manually?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '108', 2024: 'Q3'},
                            title: 'What is the average delay from the moment the metadata describing a dataset is updated at ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '109', 2024: 'Q4'},
                            title: '... published data cover the full period from when it was first published ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '110'},
                            title: '... high-value datasets, is your country progressing in ensuring interoperability of datasets, in particular high-value ones, alongside the datasets of another country?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q5'},
                            title: 'Have you implemented the DCAT-AP High Value Datasets (semiceu.github.io) tag to denote the High-Value Datasets in your (national) open data portal(s)?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q6'},
                            title: 'Besides the DCAT-AP tag mentioned above, have you implemented any other measures to ensure that high-value datasets ((EU) 2023/138) are interoperable with datasets of other country?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D4.2', 2024: 'D3.2'},
                    title: 'Monitoring and measures',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '111a', 2024: 'Q7'},
                            title: 'Do you monitor the quality of the metadata available on your portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '111b', 2024: 'Q8'},
                            title: 'Do you publish information on the quality of the metadata available on the portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '112'},
                            title: 'Do you publish guidelines (e.g. written materials) and have tools in place, to assist publishers in choosing an appropriate licence for their data?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '113'},
                            title: 'Did you develop your own open licence/licencing suite to foster the publication of open data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q9'},
                            title: 'Do you publish guidelines (e.g. written materials) and have tools in place, to assist publishers in publishing high-quality metadata?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q10'},
                            title: 'Do you set any standards on metadata quality that data providers must abide by (e.g. on the use of licence, minimum metadata describes, use of certain DCAT-AP properties, etc)'
                        },
                        {
                            type: 'entry',
                            id: {2023: '114', 2024: 'Q11'},
                            title: 'Do your open data publication/licensing guidelines provide recommendations for the use of Creative Commons (CC) licences ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '115', 2024: 'Q12'},
                            title: 'What percentage of the open data available on the national portal is accompanied by licensing information?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '116'},
                            title: 'How has the percentage of datasets accompanied by licencing information changed compared to the same period last year?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '117', 2024: 'Q13'},
                            title: '... how many different licences are used on your portal?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '118'},
                            title: 'Are guidelines and tools provided for data providers to improve the quality of their data publication?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '119a'},
                            title: 'Are there regular activities conducted or mechanisms in place to incentivise and/or assist data providers in the publication of data in machine-readable formats?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '119b'},
                            title: 'Are there regular activities conducted or mechanisms in place to incentivise and/or assist data providers in the publication of high-quality metadata?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q14'},
                            title: '... are there regular activities conducted or mechanisms in place to  assist publishers in supplying high-quality datasets ...'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D4.3', 2024: 'D3.3'},
                    title: 'DCAT-AP Compliance',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '120'},
                            title: 'Do you supply data providers with documentation on DCAT-AP (e.g. factsheets, materials published on the EC websites such as the JoinUp platform, or your own documentation)?'
                        },
                        {
                            type: 'entry',
                            id: {2024: 'Q15'},
                            title: 'Does the national portal follow the DCAT-AP framework or, if not, are standards in place to ensure interoperability with DCAT-AP?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '121', 2024: 'Q16'},
                            title: 'What is the percentage of metadata on your portal that is DCAT-AP compliant, in terms of mandatory classes? (agent, catalogue, dataset, literal, resource)'
                        },
                        {
                            type: 'entry',
                            id: {2023: '122a', 2024: 'Q17'},
                            title: 'What is the percentage of metadata on your portal that uses DCAT-AP recommended classes? (category, category scheme, distribution, licence document)'
                        },
                        {
                            type: 'entry',
                            id: {2023: '122b', 2024: 'Q18'},
                            title: 'What is the percentage of metadata on your portal that uses DCAT-AP optional classes? (catalogue record, checksum, document, frequency)'
                        },
                        {
                            type: 'entry',
                            id: {2023: '123', 2024: 'Q19'},
                            title: 'Is there a national extension of the DCAT-AP standard developed for your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '124a', 2024: 'Q20'},
                            title: 'Do you investigate the most common causes for the lack of DCAT-AP compliance?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '124b'},
                            title: 'If yes [to Q124a], what are the main causes for the lack of DCAT-AP compliance?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '125a', 2024: 'Q21'},
                            title: 'What is the percentage of datasets whose metadata provides a reference to where the data can be downloaded, or its API accessed (“download-URL” in the DCAT-AP specification)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '125b', 2024: 'Q22'},
                            title: 'What is the percentage of datasets whose metadata provides a reference to a web page from where the data can be accessed (“access-URL in the DCAT-AP specification)?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D4.4', 2024: 'D3.4'},
                    title: 'Deployment quality and linked data',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '126', 2024: 'Q23'},
                            title: 'Do you use a model (such as the 5-Star Open Data or FAIR) to assess the quality of deployment of data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '127', 2024: 'Q24'},
                            title: 'Do you conduct activities to promote and familiarise data providers with ways to ensure higher quality data ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '128a', 2024: 'Q25'},
                            title: 'What percentage of datasets is made available under a standard open licence ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '128b', 2024: 'Q26'},
                            title: '... in a structured data format?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '128c', 2024: 'Q27'},
                            title: '... in an open and machine-readable format?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '128d', 2024: 'Q28'},
                            title: '... consistely use Uniform Resource Identifiers?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '128e', 2024: 'Q29'},
                            title: '... to other renowned sources to provide additional context for the users, e.g. in a linked data fashion?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '129'},
                            title: 'Do you monitor the improvements in terms of quality of open data deployment?'
                        }
                    ]
                }
            ]
        },
        {
            type: 'dimension',
            id: {2023: 'D2', 2024: 'D4'},
            title: 'Open Data Impact',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D2.1', 2024: 'D4.1'},
                    title: 'Strategic awareness',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '28', 2024: 'I1'},
                            title: 'Do you have a definition of open data reuse in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '29'},
                            title: 'Is there interest at national level to observe the level of reuse of open data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '30', 2024: 'I2'},
                            title: 'Are there any processes in place to monitor the level of reuse of your country ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '31', 2024: 'I3'},
                            title: 'Are there any activities in place to encourage public bodies to monitor the reuse of their own published data (e.g. incentives or obligations in place for public bodies or civil servants of national government)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '32', 2024: 'I4'},
                            title: '... to monitor and measure the level of reuse of high-value datasets ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '33', 2024: 'I5'},
                            title: 'Has your government specified what \'impact of open data\' means (e.g. in a strategy document)?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '34', 2024: 'I6'},
                            title: 'Do you have a methodology in place to measure the impact of open data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '35'},
                            title: 'Are there studies that have been conducted in the past year that focus on assessing the impact of open data in your country?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '36', 2024: 'I7'},
                            title: 'Is there collaboration between government and civil society or academia to create open data impact in your country?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D2.2', 2024: 'D4.2'},
                    title: 'Measuring reuse',
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '37', 2024: 'I8'},
                            title: 'Have any public bodies in your country launched or performed any activities in the past year to ... which and how (open) datasets are reused?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.1'},
                            title: 'Analysis of log files'
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.2', 2024: 'I8-a'},
                            title: 'Automated feedback mechanisms tracking users access to datasets'
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.3', 2024: 'I8-b'},
                            title: 'Surveys'
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.4', 2024: 'I8-c'},
                            title: 'Interviews/workshops with reusers'
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.5', 2024: 'I8-d'},
                            title: 'Other'
                        },
                        {
                            type: 'entry',
                            id: {2023: '38', 2024: 'I9'},
                            title: 'Have any public bodies in your country launched or performed any activities in the past year to better understand reusers ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.1', 2024: 'I9-a'},
                            title: 'Regular feedback sessions with portal users'
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.2', 2024: 'I9-b'},
                            title: 'Social media sentiment analysis '
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.3', 2024: 'I9-c'},
                            title: 'Other'
                        },
                        {
                            type: 'entry',
                            id: {2023: '39a', 2024: 'I10'},
                            title: 'Have any public bodies in your country developed any systematic way of gathering reuse cases?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '39b', 2024: 'I11'},
                            title: 'Are there any public bodies in your country that have developed a systematic ways of classifying the gathered reuse cases?'
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D2.3', 2024: 'D4.3'},
                    title: 'Created impact',
                    children: [
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3a', 2024: 'D4.3a'},
                            title: 'Governmental impact',
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '40', 2024: 'I12'},
                                    title: 'Is any data on the impact created by open data on governmental challenges (e.g. efficiency, effectiveness, transparency, decision-making capacity) available in your country ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '41', 2024: 'I13'},
                                    title: 'Is the use of open data in your country having an impact on the efficiency and effectiveness of the government (at any level) in delivering public services?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '42', 2024: 'I14'},
                                    title: 'Is the use of open data in your country having an impact on transparency and accountability of public administrations?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '43', 2024: 'I15'},
                                    title: 'Is the use of open data in your country having an impact on policy-making processes (i.e. are public administrations making use of the data as evidence for the problem identification and policy formulation)?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '44', 2024: 'I16'},
                                    title: 'Is the use of open data in your country having an impact on decision-making processes (i.e. are public administrations making use of the data as evidence to be included in their daily operations)?'
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3b', 2024: 'D4.3b'},
                            title: 'Social impact',
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '45', 2024: 'I17'},
                                    title: 'Is any data on the impact created by open data on social challenges ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '46', 2024: 'I18'},
                                    title: 'Is the use of open data in your country having an impact on society´s ability to reduce inequality and better include minorities, migrants, and/or refugees ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '47', 2024: 'I19'},
                                    title: 'Is the use of open data in your country having an impact on ... housing in urban areas?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '48', 2024: 'I20'},
                                    title: 'Is the use of open data in your country having an impact on ... health and wellbeing ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '49', 2024: 'I21'},
                                    title: 'Is the use of open data in your country having an impact on the society´s level of education and skills (e.g. data literacy)?'
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3c', 2024: 'D4.3c'},
                            title: 'Environmental impact',
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '50', 2024: 'I22'},
                                    title: 'Is any data on the impact created by open data on environmental challenges (e.g. climate change and environmental degradation, as highlighted in the Eurpean Green Deal) available in your country ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '51', 2024: 'I23'},
                                    title: 'Is the use of open data in your country having an impact on the level of protection of biodiversity (e.g. maintaining a good air and water quality)?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '52', 2024: 'I24'},
                                    title: 'Is the use of open data in your country having an impact on the achievement of more environment-friendly cities (e.g., environment-friendly transport systems, waste management etc.)?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '53', 2024: 'I25'},
                                    title: 'Is the use of open data in your country having an impact on the fight against climate change, for example by undertaking predictive monitoring, preventive actions, or a differentiated response to connected disasters?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '54', 2024: 'I26'},
                                    title: 'Is the use of open data in your country having an impact on the consumption of energy based on fuel and the switch to renewables?'
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3d', 2024: 'D4.3d'},
                            title: 'Economic impact',
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '55', 2024: 'I27'},
                                    title: 'Is any data on the economic impact (e.g. ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '56', 2024: 'I28'},
                                    title: 'Is the use of open data in your country having an impact on the level of employment?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '57', 2024: 'I29'},
                                    title: 'Is the use of open data in your country having an impact on the level of innovation and the adoption of new technologies?'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '58', 2024: 'I30'},
                                    title: 'Is the use of open data in your country having an impact on the level of entrepreneurship (especially of women and minorities) and business creation (especially with Small- and Medium-sized Enterprises)?'
                                },
                                {
                                    type: 'entry',
                                    id: {2024: 'I31'},
                                    title: 'Is the use of open data in your country having an impact on the level of productivity?'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
