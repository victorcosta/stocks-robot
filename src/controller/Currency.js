import { getCurrencyValue } from '../services/FastRobot';

const index = async (_, res) => {
  const value = await getCurrencyValue('dolar');

  return res.json(value);
};

const view = async (req, res) => {
  const { currencyName } = req.params;

  if (!currencyName) {
    return res.status(400).json({ error: 'Currency not exists' });
  }

  try {
    const currencyValue = await getCurrencyValue(currencyName);
    return res.json(currencyValue);
  } catch (error) {
    return res.status(501).json({ error: 'Internal Server Error' });
  }
};

export { index, view };
