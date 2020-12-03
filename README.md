# Stocks Robot

A simple NodeJS robot to get the values of Brazilian stocks


## API Sample


### /stocks
```json
[
{
  "stock": "IBOV",
  "companyName": "IBOVESPA",
  "value": 113.00,
  "variation": "+1.12%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
},
{
  "stock": "ITUB4",
  "companyName": "Itaú Unibanco",
  "value": 30.38,
  "variation": "+1.33%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
},
{
  "stock": "B3SA3",
  "companyName": "B3 S.A. - Brasil, Bolsa, Balcão",
  "value": 59.01,
  "variation": "-0.99%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
},
{
  "stock": "BBDC4",
  "companyName": "Banco Bradesco",
  "value": 26.19,
  "variation": "+1.04%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
},
{
  "stock": "ABEV3",
  "companyName": "Ambev",
  "value": 14.80,
  "variation": "-0.54%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
},
{
  "stock": "ITSA4",
  "companyName": "Itaúsa",
  "value": 11.32,
  "variation": "+2.63%",
  "uptdatedAt": "2001-12-03T19:35:00.000Z"
}
]
```

### /stocks/:stock-name
#### /stocks/itsa4
```json
{
  "stock": "ITSA4",
  "companyName": "Itaúsa",
  "value": 11.32,
  "variation": "+2.63%",
  "uptdatedAt": "2001-12-03T19:32:00.000Z"
}
```

### /currency
```json
{
  "currency": "USD",
  "name": "Dólar Comercial",
  "value": 5.14,
  "uptdatedAt": "2020-12-03 16:53:18"
}
```

### /currency/:currency-name
#### /currency/eur
```json
{
  "currency": "EUR",
  "name": "Euro",
  "value": 6.23,
  "uptdatedAt": "2020-12-03 16:53:18"
}
```


