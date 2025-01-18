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
            id: {2023: 'D2'},
            title: 'Open Data Impact',
            children: [
                {
                    type: 'dimension',
                    id: {2023: 'D2.1'},
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '28'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '29'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '30'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '31'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '32'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '33'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '34'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '35'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '36'},
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D2.2'},
                    children: [
                        {
                            type: 'entry',
                            id: {2023: '37'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.1'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.2'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.3'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.4'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '37.5'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '38'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.1'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.2'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '38.3'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '39a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '39b'},
                        }
                    ]
                },
                {
                    type: 'dimension',
                    id: {2023: 'D2.3'},
                    children: [
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3a'},
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '40'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '41'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '42'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '43'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '44'},
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3b'},
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '45', 2024: 'I17'},
                                    title: 'Is any data on the impact created by open data on social challenges ...'
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '46'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '47'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '48'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '49'},
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3c'},
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '50'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '51'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '52'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '53'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '54'},
                                }
                            ]
                        },
                        {
                            type: 'dimension',
                            id: {2023: 'D2.3d'},
                            children: [
                                {
                                    type: 'entry',
                                    id: {2023: '55'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '56'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '57'},
                                },
                                {
                                    type: 'entry',
                                    id: {2023: '58'},
                                }
                            ]
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
                            id: {2023: '59'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '60'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '61'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '62a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '62b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '63'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '64'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '65'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '66a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '66b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '66c'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '67'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '68'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '69a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '69b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '69c'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '70a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '70b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '71'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '72'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '73'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '74'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '75'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '76'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '77'},
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
                        },
                        {
                            type: 'entry',
                            id: {2023: '79'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '80a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '80b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '81a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '81b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '82'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '83'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '84'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '85'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '86'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '87'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '88'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '89'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '90a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '90b'},
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
                            id: {2023: '91'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '92a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '92b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '93a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '93b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '93c'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '94a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '94b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '95'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '96'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '97'},
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
                            id: {2023: '98'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '99'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '100', 2024: 'PT42'},
                            title: 'Is your national portal active on social media?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '101'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '102', 2024: 'PT43'},
                            title: 'Are the portals source code ...'
                        },
                        {
                            type: 'entry',
                            id: {2023: '103'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '104a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '104b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '104c'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '105a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '105b'},
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
                            id: {2023: '106'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '107'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '108'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '109'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '110'},
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
                            id: {2023: '111a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '111b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '112'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '113'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '114'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '115', 2024: 'Q12'},
                            title: 'What percentage of the open data available on the national portal is accompanied by licensing information?'
                        },
                        {
                            type: 'entry',
                            id: {2023: '116'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '117'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '118'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '119a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '119b'},
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
                        },
                        {
                            type: 'entry',
                            id: {2023: '121'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '122a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '122b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '123'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '124a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '124b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '125a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '125b'},
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
                            id: {2023: '126'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '127'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '128a'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '128b'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '128c'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '128d'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '128e'},
                        },
                        {
                            type: 'entry',
                            id: {2023: '129'},
                        }
                    ]
                }
            ]
        }
    ]
};
