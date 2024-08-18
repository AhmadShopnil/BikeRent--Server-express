import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
let port = config.port || 5000;
const a = 10;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Bike Rent Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('error from server:', error);
  }
}

main();
