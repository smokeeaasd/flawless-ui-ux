// Original local studies. All state is in memory; nothing is sent or persisted.
const study = document.body.dataset.study;
if (study === 'software') {
  document.querySelector('#demo-toggle').addEventListener('click', event => {
    const expanded = event.currentTarget.getAttribute('aria-expanded') !== 'true';
    event.currentTarget.setAttribute('aria-expanded', String(expanded));
    document.querySelector('#demo-detail').hidden = !expanded;
  });
}
if (study === 'finance') {
  const periods = { week: { label: 'This week', income: 2800, due: 1700 }, month: { label: 'This month', income: 6100, due: 4200 } };
  let paid = false;
  const currency = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  const update = () => {
    const period = periods[document.querySelector('#period').value];
    const due = period.due - (paid ? 500 : 0);
    const balance = 4800 - (paid ? 500 : 0);
    document.querySelector('#cash').textContent = currency(balance);
    document.querySelector('#expected').textContent = currency(period.income);
    document.querySelector('#due').textContent = currency(due);
    document.querySelector('#projected').textContent = currency(balance + period.income - due);
    document.querySelector('#period-label').textContent = period.label;
    document.querySelector('#bill-status').textContent = paid ? 'Paid locally' : 'Due Friday';
    document.querySelector('#pay').disabled = paid;
  };
  document.querySelector('#period').addEventListener('change', update);
  document.querySelector('#pay').addEventListener('click', () => {
    paid = true; update();
    document.querySelector('#finance-feedback').textContent = 'Studio rent marked paid in this local demo. Cash and unpaid obligations both decreased by $500; projected cash is unchanged.';
  });
  update();
}
if (study === 'queue') {
  const rows = [...document.querySelectorAll('#records tr')];
  const search = document.querySelector('#search');
  const filter = document.querySelector('#filter');
  function update() {
    let count = 0;
    for (const row of rows) {
      const matches = row.textContent.toLowerCase().includes(search.value.trim().toLowerCase()) && (filter.value === 'all' || row.dataset.state === filter.value);
      row.hidden = !matches;
      if (matches) count++;
    }
    document.querySelector('#count').textContent = `${count} of ${rows.length} repairs shown`;
    document.querySelector('#no-results').hidden = count !== 0;
  }
  search.addEventListener('input', update); filter.addEventListener('change', update);
  document.querySelector('#clear').addEventListener('click', () => { search.value = ''; filter.value = 'all'; update(); search.focus(); });
  for (const button of document.querySelectorAll('[data-ready]')) button.addEventListener('click', () => {
    const row = button.closest('tr'); row.dataset.state = 'ready';
    const badge = row.querySelector('.status'); badge.dataset.state = 'ready'; badge.textContent = 'Ready';
    button.hidden = true; row.querySelector('.ready-note').hidden = false;
    document.querySelector('#queue-feedback').textContent = `${row.dataset.id} marked ready in memory. No customer was contacted.`;
    update();
    // The action disappears; focus remains on a surviving task control.
    search.focus();
  });
  update();
}
if (study === 'form') {
  const form = document.querySelector('#inquiry');
  const summary = document.querySelector('#error-summary');
  const fields = ['name', 'email', 'message'];
  const messages = { name: 'Enter your name.', email: 'Enter an email address such as name@example.com.', message: 'Describe what you need help with.' };
  const valid = id => {
    const field = document.getElementById(id);
    return !!field.value.trim() && (id !== 'email' || field.validity.valid);
  };
  function fieldState(id, show) {
    const field = document.getElementById(id);
    const error = document.getElementById(`${id}-error`);
    error.hidden = !show;
    if (show) field.setAttribute('aria-invalid', 'true'); else field.removeAttribute('aria-invalid');
  }
  function summaryState() {
    const invalid = fields.filter(id => document.getElementById(id).hasAttribute('aria-invalid'));
    const list = summary.querySelector('ul'); list.replaceChildren();
    for (const id of invalid) {
      const li = document.createElement('li'); const a = document.createElement('a');
      a.href = `#${id}`; a.textContent = messages[id];
      a.addEventListener('click', event => { event.preventDefault(); document.getElementById(id).focus(); });
      li.append(a); list.append(li);
    }
    summary.hidden = !invalid.length;
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    document.querySelector('#form-result').textContent = '';
    for (const id of fields) fieldState(id, !valid(id));
    summaryState();
    if (!summary.hidden) summary.focus();
    else document.querySelector('#form-result').textContent = 'Your inquiry is valid in this local example. Nothing was sent or saved; your entries remain available.';
  });
  for (const id of fields) document.getElementById(id).addEventListener('input', () => {
    document.querySelector('#form-result').textContent = '';
    if (document.getElementById(id).hasAttribute('aria-invalid') && valid(id)) { fieldState(id, false); summaryState(); }
  });
}
if (study === 'collection') {
  const dialog = document.querySelector('#work-detail');
  for (const button of document.querySelectorAll('[data-work]')) button.addEventListener('click', () => {
    document.querySelector('#work-title').textContent = button.dataset.work;
    document.querySelector('#work-description').textContent = button.dataset.description;
    document.querySelector('#work-art').replaceChildren(button.querySelector('svg').cloneNode(true));
    dialog.showModal();
  });
  document.querySelector('#close-work').addEventListener('click', () => dialog.close());
}
