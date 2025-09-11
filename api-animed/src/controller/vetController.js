import DataService from "../services/DataService.js";

const dataService = new DataService();

export const getAllVets = async (req, res) => {
  const vets = await dataService.readAll();
  // Adicionando um sucesso para padronizar com o app da professora
  return res.json({ success: true, data: vets });
};
