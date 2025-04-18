interface Config {
  apiBaseUrl: string;
}
  
const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api'
};
  
export default config;