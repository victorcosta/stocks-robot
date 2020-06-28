import { getStockValue } from '../services/FastRobot';

const index = async (_, res) => {
  const stockValue = Array();
  stockValue.push(await getStockValue('IBOV'));
  stockValue.push(await getStockValue('ITUB4'));
  stockValue.push(await getStockValue('B3SA3'));
  stockValue.push(await getStockValue('BBDC4'));
  stockValue.push(await getStockValue('ABEV3'));
  stockValue.push(await getStockValue('ITSA4'));

  return res.json(stockValue);
};

const view = async (req, res) => {
  const { stockName } = req.params;

  if (!stockName) {
    return res.status(400).json({ error: 'Stock not exists' });
  }

  try {
    const stockValue = await getStockValue(stockName);
    return res.json(stockValue);
  } catch (error) {
    return res.status(400).json({ error: 'Stock not exists' });
  }
};

export { index, view };
