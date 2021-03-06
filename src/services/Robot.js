import puppeteer from 'puppeteer';

const getStockValue = async (stockName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.google.com/search?rlz=1C5CHFA_enBR882BR883&sxsrf=ALeKk01BFCt0Ei5p0AXzIVGLnaVMThw_tw%3A1593059348371&ei=FCj0XoWfFsfU5OUPj6K_6AU&q=${stockName}&oq=${stockName}&gs_lcp=CgZwc3ktYWIQAzIFCAAQsQMyBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yAggAMgYIABAHEB4yBggAEAcQHjIGCAAQBxAeMgYIABAHEB4yBggAEAcQHjoECCMQJzoICAAQBxAKEB5Q8hNY8hNg_hVoAHAAeACAAWSIAb0BkgEDMS4xmAEAoAEBqgEHZ3dzLXdpeg&sclient=psy-ab&ved=0ahUKEwiF-cLEkJzqAhVHKrkGHQ_RD10Q4dUDCAw&uact=5`;
  await page.goto(url);

  try {
    const query = await page.evaluate(() => {
      const date = new Date();

      const value = document.querySelector('.IsqQVc.NprOob.XcVN5d').innerHTML;

      const companyName = document.querySelector('.oPhL2e').innerHTML;

      const stringDate = document
        .querySelector('.TgMHGc')
        .querySelectorAll('span')[1]
        .innerText.replace('·', '')
        .replace(' BRT', '')
        .replace(' de ', '')
        .replace('.', `${date.getFullYear()} `)
        .trim();

      const uptdatedAt = new Date(stringDate).toISOString();

      const variationString = document.querySelector('.WlRRw.IsqQVc').querySelectorAll('span')[1]
        .ariaLabel;

      const variation = variationString.split(' ');

      let variationPercentage = variation[0];

      if (variation[0] === 'Aumentou') {
        variationPercentage = `+${variation[1]}`;
      }

      if (variation[0] === 'Diminuiu') {
        variationPercentage = `-${variation[1]}`;
      }

      return {
        value,
        companyName,
        variationPercentage,
        uptdatedAt
      };
    });

    const stockValue = {
      stock: stockName.toUpperCase(),
      companyName: query.companyName,
      stockValue: parseFloat(query.value.replace('.', '').replace(',', '.')).toFixed(2),
      variation: query.variationPercentage,
      uptdatedAt: query.uptdatedAt
    };

    return stockValue;
  } catch (error) {
    throw new error();
  } finally {
    await browser.close();
  }
};

const getCurrencyValue = async (currencyName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.google.com/search?q=${currencyName}&rlz=1C5CHFA_enBR882BR883&oq=${currencyName}&aqs=chrome..69i57j0l7.3717j1j4&sourceid=chrome&ie=UTF-8`;
  await page.goto(url);

  try {
    const query = await page.evaluate(() => {
      const value = document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value;

      const uptdatedAt = new Date().toISOString();

      return {
        value,
        uptdatedAt
      };
    });

    const currencyValue = {
      currency: currencyName,
      value: query.value,
      uptdatedAt: query.uptdatedAt
    };

    return currencyValue;
  } catch (error) {
    throw new error();
  } finally {
    await browser.close();
  }
};

export { getStockValue, getCurrencyValue };
