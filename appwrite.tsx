import { Client, ID, Users } from 'node-appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('6491591cdff307cf903b') // Your project ID
    .setKey(
        'b73422ee8766f9d624bf5e30c0d3e7e1ba43331fcd4f49ccdecac25bec124a414e5dc5fdcef07e391d806b526b3ef67d64b833ddb449d80cffc857ec238908506bc23a9ce6a4bc94a5aac49c1675dd713890a0ba13ae468679a34cd572e83efe40b20175423a16336ffcf7e8a4488ea4061d50338023b5e4454e326a56169914'
    ); // Your secret API key
const users = new Users(client);

/* import { Client,Account,ID } from 'appwrite';
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('testing_appwrite');

const account = new Account(client); */

// Register User
