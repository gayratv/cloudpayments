select
id,
Amount,
Currency,
currency,
InvoiceId,
PaymentCurrency,
State,
TransactionId,
timestamp,
currency,
from payments;

select
TransactionId,
Amount,
Currency,
currency
PaymentAmount,
PaymentCurrency,
InvoiceId,
Success
from SuccesTransactionData;

delete from payments;
delete from SuccesTransactionData;
