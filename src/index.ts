import app from "./app";
import config from "./config";

app.listen(config.PORT, (): void => {
  console.log(`Server started successfully on port ${config.PORT}`);
});
