import { realmApp } from "./realm";

let client;
try {
  client = realmApp.currentUser.mongoClient("mongodb-atlas");
} catch (err) {
  console.error("Failed to log in", err);
}


let saveCategories = async (categories) => {
  try {
    const insertCat = await client
      .db("quizapp")
      .collection("categories")
      .insertMany(categories);
  } catch (err) {
    console.error("Failed to log in", err);
  }
};

let saveBoard = async (catList, boardName) => {
  try {
    const insertBoard = await client
      .db("quizapp")
      .collection("gameBoard")
      .insertOne({
        name: boardName,
        categories: catList,
        _partition: "quizboard",
      });
  } catch (err) {
    console.log("err", err);
  }
};

export { saveCategories, saveBoard };
