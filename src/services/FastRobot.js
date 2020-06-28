import axios from 'axios';
import cheerio from 'cheerio';

const getStockValue = async (stockName) => {
  const url = `https://www.google.com/search?rlz=1C5CHFA_enBR882BR883&sxsrf=ALeKk01BFCt0Ei5p0AXzIVGLnaVMThw_tw%3A1593059348371&ei=FCj0XoWfFsfU5OUPj6K_6AU&q=${stockName}&oq=${stockName}&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yAggAMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjoECCMQJzoICAAQBxAKEB5Q8hNY8hNg_hVoAHAAeACAAWSIAb0BkgEDMS4xmAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwiF-cLEkJzqAhVHKrkGHQ_RD10Q4dUDCAw&uact=5`;
  const date = new Date();
  const stockValue = {
    stock: stockName.toUpperCase(),
    companyName: null,
    stockValue: null,
    variation: null,
    uptdatedAt: null
  };

  try {
    const { data } = await axios.request({
      method: 'GET',
      url,
      responseType: 'arraybuffer',
      reponseEncoding: 'binary'
    });

    const $ = cheerio.load(data.toString('latin1'));

    const companyName = $('.BNeawe.deIvCb.AP7Wnd').first().text();

    const value = $('.BNeawe.iBp4i.AP7Wnd').first().text().split(' ');

    const valuation = parseFloat(value[0].replace('.', '').replace(',', '.')).toFixed(2);

    const valueVariation = parseFloat(value[1].replace(',', '.'));

    const variationPercentage = `${valueVariation > 0 ? '+' : '-'}${value[2]
      .replace('(', '')
      .replace(')', '')}`;

    const stringDate = $('.r0bn4c.rQMQod')
      .text()
      .split(')')[1]
      .split('·')[0]
      .replace(' BRT', '')
      .replace('.,', '')
      .replace(' de ', '')
      .replace('.', `${date.getFullYear()} `)
      .trim();

    const uptdatedAt = new Date(stringDate).toISOString();

    stockValue.companyName = companyName;
    stockValue.stockValue = valuation;
    stockValue.variation = variationPercentage;
    stockValue.uptdatedAt = uptdatedAt;
  } catch (error) {
    throw new error();
  }

  return stockValue;
};

const getCurrencyValue = async (currencyName) => {
  const currency = currencyName.toUpperCase();
  const url = `http://economia.awesomeapi.com.br/json/all/${currency}-BRL`;
  const currencyValue = {
    currency: null,
    name: null,
    value: null,
    uptdatedAt: null
  };
  try {
    const { data } = await axios.get(url);
    const { code, name, bid, create_date } = data[currency];

    currencyValue.currency = code;
    currencyValue.name = name;
    currencyValue.value = parseFloat(bid).toFixed(2);
    currencyValue.uptdatedAt = create_date;
  } catch (error) {
    throw new error();
  }

  return currencyValue;
};

export { getStockValue, getCurrencyValue };
