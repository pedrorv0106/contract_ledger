const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('dashboard/dashboard', {title: 'Dashboard'});
});

router.get('/asset_and_liabilities', (req, res) => {
  res.render('dashboard/asset_and_liabilities', {title: 'Dashboard'});
});

router.get('/credit_check', (req, res) => {
  res.render('dashboard/credit_check', {title: 'Dashboard'});
});

router.get('/title', (req, res) => {
  res.render('dashboard/title', {title: 'Dashboard'});
});

router.get('/company_dashboard', (req, res) => {
  res.render('dashboard/company_dashboard', {title: 'Dashboard'});
});

router.get('/loan_status', (req, res) => {
  res.render('dashboard/loan_status', {title: 'Dashboard'});
});

module.exports = router;
