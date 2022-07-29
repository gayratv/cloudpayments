import axios, { AxiosInstance } from 'axios';

const aInst: AxiosInstance = axios.create({
  baseURL: 'https://api.cloudpayments.ru/payments/cards/charge',
});

// Параметры запроса:

export type PayerObject = {
  FirstName?: string;
  LastName?: string;
  MiddleName?: string;
  Birth?: string;
  Street?: string;
  Address?: string;
  City?: string;
  Country?: string;
  Phone?: string;
  Postcode?: string;
};

export interface PaymentData {
  Amount: number; //	Numeric	Обязательный	Сумма платежа
  Currency?: string; //	String	Необязательный	Валюта: RUB/USD/EUR/GBP (см. справочник). Если параметр не передан, то по умолчанию принимает значение RUB
  IpAddress: string; //	Обязательный	IP-адрес плательщика
  CardCryptogramPacket: string; //	String	Обязательный	Криптограмма платежных данных
  Name?: string; //		Необязательный	Имя держателя карты латиницей
  PaymentUrl?: string; //	String	Необязательный	Адрес сайта, с которого совершается вызов скрипта checkout
  InvoiceId?: string; // String	Необязательный	Номер счета или заказа
  Description?: string; //	String	Необязательный	Описание оплаты в свободной форме
  CultureName?: string; //	String	Необязательный	Язык уведомлений. Возможные значения: "ru-RU", "en-US". (см. справочник)
  AccountId?: string; //	String	Необязательный	Обязательный идентификатор пользователя для создания подписки и получения токена
  Email?: string; //	String	Необязательный	E-mail плательщика, на который будет отправлена квитанция об оплате
  Payer?: PayerObject; //	Object	Необязательный	Доп. поле, куда передается информация о плательщике. Используйте следующие параметры: FirstName, LastName, MiddleName, Birth, Street, Address, City, Country, Phone, Postcode
  JsonData?: any; //	Json	Необязательный	Любые другие данные, которые будут связаны с транзакцией, в том числе инструкции для создания подписки или формирования онлайн-чека должны обёртываться в объект cloudpayments. Мы зарезервировали названия следующих параметров и отображаем их содержимое в реестре операций, выгружаемом в Личном Кабинете: name, firstName, middleName, lastName, nick, phone, address, comment, birthDate.
}

export async function sendMoney(p: PaymentData) {
  try {
    console.log('Start post');
    const response = await aInst.post('', p, {
      auth: {
        username: process.env.USERNAME1!,
        password: process.env.PASSWORD!,
      },
    });

    /*
    // console.log(response);
    console.log(' data', response.data);
    console.log('///////////////////');
    console.log(' status', response.status);
    console.log(' statusText', response.statusText);
    console.log('///////////////////');
    console.log(' headers', response.headers);
    */

    return response;
  } catch (err) {
    console.error((err as Error).message);
    return new Error('непредвиденная ошибка в post payments/cards/charge');
  }
}
/*

async function main() {
  const p: PaymentData = {
    Amount: 5,
    IpAddress: '192.168.1.5',
    CardCryptogramPacket:
      '014242424242250102JWdmVcwEpQMSsRw5XIARJT+ItIy18Yecs4sXqx5n74rDyh0ND4IHqPK6YYuPfSrkbahYgdlKVQlhnEdqYuACx06s7y4Pno4wF7+c0jH0mWLmvo76leiR8lH+GoTZv6IqTnCgCKCdIhfcBgCdX2sJTNagVQQr+blQS3azJnhOy7UU1cczScl0IM+XgYbMt2CQ7wrGq/a60yLeYGtPbZn2yEUBVcakm6Gd//qy2fB+wm1ACF85zoFZf0OrWJA1lfZAMzxwcTPe3P7nz9MgM/RNhmw3lllUmMsoyl8Dj2kAlf0Xs6NStMUpgCldCCCQalii1pHB65RhGNibbXFwHp9Eqw==',
  };
  await sendMoney(p);
}

(async () => {
  await main();
})();
*/
