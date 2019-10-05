'use strict';

const store = {
  subTotal: 0.0,
  tip: 0.0,
  total: 0.0,
  tipTotal: 0.0,
  mealCount: 0.0,
  avgTip: 0.0
};

function resetButton() {
  $('.reset-button').on('click', event => {
    event.preventDefault();
    store.subTotal = 0;
    store.tip = 0;
    store.total = 0;
    store.tipTotal = 0;
    store.mealCount = 0;
    store.avgTip = 0;
    renderCharges();
    renderEarnings();
  });
}

function cancelButton() {
  $('.cancel-button').on('click', event => {
    event.preventDefault();
    $('.meal-price-entry').val('');
    $('.tax-rate-entry').val(7.5);
    $('.tip-percentage-entry').val('');
  });
}

function renderCharges() {
  $('.right-charges').html(`
      <h2>Charges</h2>
      <p>Subtotal $${store.subTotal.toLocaleString()}</p>
      <p>Tip $${store.tip.toLocaleString()}</p>
      <p>Total $${store.total.toLocaleString()}</p>
  `);
}

function renderEarnings() {
  const exactTotal = store.tipTotal.toLocaleString('en', { maximumSignificantDigits: 2 });
  $('.right-earnings').html(`
      <h2>Earnings Info</h2>
      <p>Tip Total: $${exactTotal}</p>
      <p>Meal Count: ${store.mealCount}</p>
      <p>Average Tip per Meal: $${store.avgTip.toLocaleString()}</p>
  `);
}

function watchForm() {
  $('#details-form').submit(event => {
    event.preventDefault();
    const mealCost = $('.meal-price-entry').val();
    const taxRate = $('.tax-rate-entry').val();
    const tipPercent = $('.tip-percent-entry').val();
    $('.meal-price-entry').val('');
    $('.tax-rate-entry').val(7.5);
    $('.tip-percent-entry').val('');
    mathCharges(mealCost, taxRate, tipPercent);
    mathEarnings();
  });
}

function mathCharges(mealCost, taxRate, tipPercent) {
  const addedTaxes = taxRate / 100;
  const newTipPercent = tipPercent / 100;
  store.subTotal = mealCost * 1 + mealCost * addedTaxes;
  store.tip = mealCost * newTipPercent;
  store.total = store.subTotal + store.tip;
  renderCharges();
}

function mathEarnings() {
  store.tipTotal += store.tip;
  store.mealCount++;
  store.avgTip = store.tipTotal / store.mealCount;
  renderEarnings();
}

function render() {
  watchForm();
  resetButton();
  cancelButton();
}

$(render);
