import cli from '@sanity/cli'


export const sanityClient = cli({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: '2022-12-25',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})