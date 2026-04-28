import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    dateOfBirth: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const countries = {
    'Uganda': '+256',
    'Albania': '+355', 'Andorra': '+376', 'Austria': '+43', 'Belarus': '+375',
    'Belgium': '+32', 'Bosnia and Herzegovina': '+387', 'Bulgaria': '+359',
    'Croatia': '+385', 'Cyprus': '+357', 'Czech Republic': '+420', 'Denmark': '+45',
    'Estonia': '+372', 'Finland': '+358', 'France': '+33', 'Germany': '+49',
    'Greece': '+30', 'Hungary': '+36', 'Iceland': '+354', 'Ireland': '+353',
    'Italy': '+39', 'Kosovo': '+383', 'Latvia': '+371', 'Liechtenstein': '+423',
    'Lithuania': '+370', 'Luxembourg': '+352', 'Malta': '+356', 'Moldova': '+373',
    'Monaco': '+377', 'Montenegro': '+382', 'Netherlands': '+31', 'North Macedonia': '+389',
    'Norway': '+47', 'Poland': '+48', 'Portugal': '+351', 'Romania': '+40',
    'Russia': '+7', 'San Marino': '+378', 'Serbia': '+381', 'Slovakia': '+421',
    'Slovenia': '+386', 'Spain': '+34', 'Sweden': '+46', 'Switzerland': '+41',
    'Turkey': '+90', 'Ukraine': '+380', 'United Kingdom': '+44'
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setFormData({
      ...formData,
      country,
      countryCode: countries[country] || ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Ugazo</h1>
        <p className="subtitle">Find Your Perfect Match</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step">
              <h2>Create Your Account</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="next-btn"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <h2>Personal Information</h2>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select name="country" value={formData.country} onChange={handleCountryChange} required>
                <option value="">Select Country</option>
                {Object.keys(countries).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />

              <div className="phone-input">
                <input type="text" value={formData.countryCode} disabled className="country-code" />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="step-buttons">
                <button type="button" className="back-btn" onClick={() => setStep(1)}>
                  Back
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
