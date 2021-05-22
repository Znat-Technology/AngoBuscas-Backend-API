const People = require("../models/People");
const messages = require("../libs/messages");

exports.index = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const peoples = await People.find({
      accepted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(peoples);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.search = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;
  const { search, category } = req.body;
  const filter = {
    $or: [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
      {
        category: { $regex: search, $options: "i" },
      },
    ],
    accepted: true,
  };

  if (category !== "Todas categorias") {
    filter.category = category;
  }
  try {
    const peoples = await People.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(peoples);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.count = async (req, res, next) => {
  const { search, category } = req.body;
  const filter = {
    $or: [
      {
        name: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
      {
        category: { $regex: search, $options: "i" },
      },
    ],
    accepted: true,
  };

  if (category !== "Todas categorias") {
    filter.category = category;
  }
  try {
    const peoples = await People.find(filter)
      .count()
      .exec();
    res.json(peoples);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.countSubmited = async (req, res, next) => {
  try {
    const peoples = await People.find({
      accepted: false,
    })
      .count()
      .exec();
    res.json(peoples);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.post = async (req, res, next) => {
  const { name, age, found, description, category } = req.body;
  const images = [];
  req.files.forEach((file) => {
    images.push(file.location);
  });

  const people = new People({
    images,
    name,
    age,
    found,
    description,
    category,
  });
  try {
    const response = await people.save();
    res.json(response);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.getFirst16 = async (req, res, next) => {
  try {
    const peoples = await People.find(null, {
      name: 1,
      images: 1,
    })
      .limit(16)
      .sort({ createdAt: 1 })
      .exec();
    res.json(peoples);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.allAccepted = async (req, res, next) => {
  const listId = req.body.ids;

  try {
    listId.forEach(async (id) => {
      const response = await People.updateOne(
        { _id: id },
        {
          accepted: true,
        }
      );
    });
    res.json({ ok: true });
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.submited = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const response = await People.find({
      accepted: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};
