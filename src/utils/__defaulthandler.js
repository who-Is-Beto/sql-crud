import nextConnect from "next-connect";

export default function defaultHandler() {
  return nextConnect({
    attachParams: true,
    onError(error, _, res) {
      console.error(error);

      res.status(500).json({ message: "Something went wrong :c Internal Server Error" });
    }
  });
}
