const User = require('../models/User');

const validateCountryAndGender = (req, res, next) => {
  const { gender, country } = req.body;
  
  const ugandanCountries = ['Uganda'];
  const europeanCountries = [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia and Herzegovina',
    'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia',
    'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland',
    'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg',
    'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North Macedonia',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia',
    'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine',
    'United Kingdom'
  ];

  // Uganda: only females allowed
  if (ugandanCountries.includes(country) && gender !== 'female') {
    return res.status(400).json({ 
      message: 'Only females from Uganda are allowed' 
    });
  }

  // Europe: only males allowed
  if (europeanCountries.includes(country) && gender !== 'male') {
    return res.status(400).json({ 
      message: 'Only males from European countries are allowed' 
    });
  }

  // Only Uganda and Europe allowed
  if (!ugandanCountries.includes(country) && !europeanCountries.includes(country)) {
    return res.status(400).json({ 
      message: 'Only users from Uganda and European countries are allowed' 
    });
  }

  next();
};

module.exports = validateCountryAndGender;
