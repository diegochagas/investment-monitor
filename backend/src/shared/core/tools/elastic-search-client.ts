import ElasticSearch = require("elasticsearch");
import HttpAwsEs = require("http-aws-es");​
export abstract class ElasticSearchClient {

    private static client: ElasticSearch.Client;
    /**
     * Get elastic search client.
     */
    public static async getInstance() {
        if (!ElasticSearchClient.client) {
            ElasticSearchClient.client = new ElasticSearch.Client({
                hosts: process.env.ELASTICSEARCH_HOST,
                requestTimeout: parseInt(process.env.ELASTICSEARCH_TIMEOUT as string),
                connectionClass: HttpAwsEs
            });
        }
        return ElasticSearchClient.client;
    }
}
