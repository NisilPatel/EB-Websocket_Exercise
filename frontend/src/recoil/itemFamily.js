import { atomFamily } from "recoil";

const itemFamily = atomFamily({
  key: "itemFamily",
  default: "",
});

export default itemFamily