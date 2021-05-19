/**
 * Autor: Znat team
 * Data: 22/03/2021
 * Descricao: Metodos que executam todos os recursos de um documento na API
 * Parametros padroes:
 * @param {*} req : Recebe a requisiçao http ou seja os dados vindo do Client-side
 * @param {*} res : Parametro que retorna
 * @param {*} next : Passa para o proximo callback
 */
// Carrega o modulo da Model Document
const Document = require("../models/Document");

// Modulo com mensagens da API
const messages = require("../libs/messages");
const Lifting = require("../models/Lifting");

/**
 * Metodo que permite consultar todos os dados da coleçao documentos
 * Primeiro criamos uma variavel que vai armazenar os dados da consulta
 * A seguir executamos o metodo find que retorna os dados de uma coleçao
 * Se metodo for executado enviamos uma response com os dados da coleçao
 * Se ao ativa o bloco catch que envia uma mensagem de erro
 *
 */

exports.count = async (req, res, next) => {
  try {
    const documents = await Document.find({
      accepted: true,
    })
      .count()
      .exec();
    res.json(documents);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.countSubmited = async (req, res, next) => {
  try {
    const documents = await Document.find({
      accepted: false,
    })
      .count()
      .exec();
    res.json(documents);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.count = async (req, res, next) => {
  const { search, category } = req.body;
  const filter = {
    $or: [
      {
        onwner: { $regex: search, $options: "i" },
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
    const documents = await Document.find(filter)
      .count()
      .exec();
    res.json(documents);
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
        onwner: { $regex: search, $options: "i" },
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
    const documents = await Document.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(documents);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.index = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skipIndex = (page - 1) * limit;

  try {
    const documents = await Document.find({
      accepted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: error, message: messages.NOT_FOUND });
  }
};

/**
 * Metodo que permite registrar um documento com todos os atributos
 * Primeiro Armazenamos os dados da requisicao num objecto para termos controle dos dados
 * A seguir executamos o metodo save() que salva os dados no MongoDB
 * Se a metodo for executado com sucesso envia uma response com os dados cadastrados
 * Se nao ativa o bloco catch que envia uma mensagem de erro.
 */
exports.post = async (req, res, next) => {
  try {
    const {
      onwner,
      province,
      category,
      institute,
      county,
      street,
      typePlace,
      description,
    } = req.body;
    const images = [];
    req.files.forEach((file) => {
      images.push(file.location);
    });
    const depositedPlace = {
      province,
      county,
      typePlace,
      street,
      institute,
    };
    const document = new Document({
      onwner,
      depositedPlace,
      description,
      category,
      images,
    });
    const response = await document.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error, message: messages.ERROR_REGISTER });
  }
};

exports.documentsReceived = async (req, res, next) => {
  let _id = req.params.id;
  try {
    const response = await Document.findByIdAndUpdate(_id, {
      $set: { received: true },
    });
    await Lifting.updateMany({ documents: _id }, { $set: { done: true } });
    res.send("<h1>Confirmado, AngoBuscas agradece!!!</h1>");
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getById = async (req, res, next) => {
  let _id = req.params.id;
  try {
    const document = await Document.find({ _id: _id });
    res.json(document);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.allAccepted = async (req, res, next) => {
  const listId = req.body.ids;

  try {
    listId.forEach(async (id) => {
      let response = await Document.updateOne(
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
    const response = await Document.find({
      accepted: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: "Error Occured while fetching the data" });
  }
};
