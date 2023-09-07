import { Client } from 'appwrite';
const client = new Client();
const Connection = () => {
    client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6491591cdff307cf903b');
};
export default Connection;
