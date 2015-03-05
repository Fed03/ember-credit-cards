import cards from 'ember-credit-cards/utils/cards';

var cardFromNumber = cards.fromNumber;
var cardFromType = cards.fromType;
var luhnCheck = cards.luhnCheck;

function validateNumber(num) {
  num = (num + '').replace(/\s+|-/g, '');

  if (!/^\d+$/.test(num)) {
    return false;
  }

  var card = cardFromNumber(num);

  if (!card) {
    return false;
  }
  
  return (card.length.contains(num.length)) && (card.luhn === false || luhnCheck(num));
}


function validateExpiration(month, year) {
  
  if (typeof month === 'string') {
    month = parseInt(month);
  }

  if (typeof year === 'string') {
    year = parseInt(year);
  }

  if (typeof month !== 'number') {
    return false;
  }
  
  if (typeof year !== 'number') {
    return false;
  }

  if (month > 12) {
    return false;
  }

  if (year < 70) {
    year = 2000 + year;
  }

  var edate = new Date(year, month);
  var today = new Date(); 

  //Months start from 0 in JavaScript
  edate.setMonth(edate.getMonth() - 1);

  // The cc expires at the end of the month,
  // so we need to make the expiry the first day
  //  of the month after
  edate.setMonth(edate.getMonth() + 1, 1);

  return edate > today;
}


function validateCVC(cvc, type) {
  cvc = (cvc + '').trim();

  if (!/^\d+$/.test(cvc)) {
    return false;
  }

  var card = cardFromType(type);

  if (card) {
    return card.cvcLength.contains(cvc.length);
  } else {
    return cvc.length >= 3 && cvc.length <= 4;
  }
}


export default {
  validateNumber: validateNumber,
  validateExpiration: validateExpiration,
  validateCVC: validateCVC
};
