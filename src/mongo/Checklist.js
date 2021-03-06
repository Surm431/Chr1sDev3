class Checklist {
  constructor(db) {
    this.collection = db.collection("checklist");
  }
  async addItem(item) {
    /* Structure of checklist item object
    {
      id: number
      content: "",
      creator: "user id",
      completed: false
    }
    */
    const newItem = await this.collection.insertOne(item);
    return newItem;
  }
  async editItem(item) {
    const anItem = await this.collection.updateOne(
      { id: item.id },
      {
        $set: {
          id: item.id,
          content: item.content,
          creator: item.creator,
          completed: item.completed,
        },
      }
    );
    return anItem;
  }
  async removeItem(id) {
    let query = { id: id };
    await this.collection.deleteOne(query);
    return;
  }
  async checkItem(id) {
    await this.collection.updateOne(
      { id: id },
      {
        $set: {
          completed: true,
        },
      }
    );
    return;
  }
  async uncheckItem(id) {
    await this.collection.updateOne(
      { id: id },
      {
        $set: {
          completed: false,
        },
      }
    );
    return;
  }
  async getItem(id) {
    let query = { id: id };
    const anItem = await this.collection.find(query).toArray();
    return anItem[0];
  }
  async getAll() {
    const allItems = await this.collection.find({}).toArray();
    return allItems;
  }
}
module.exports = Checklist;
