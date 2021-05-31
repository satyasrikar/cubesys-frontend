import axios from "axios";
import dotenv from "dotenv";
axios.defaults.headers.common = {
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
};
export default axios;
