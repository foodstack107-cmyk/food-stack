export const dbConnection = {
  // Add the protocol prefix here
  url: `mongodb://${process.env.DB_HOST}`,
  DatabaseName: process.env.DB_NAME,
  options: {
    // Note: In newer MongoDB drivers (v4.0+), these options
    // are often default or deprecated, but keeping them won't hurt.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
