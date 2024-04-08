import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
  const getTokenFromStorage = localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'));
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromStorage?.token === undefined) {
      navigate('/', { replace: true });
    }
  }, [getTokenFromStorage?.token, navigate]);

  return getTokenFromStorage?.token !== undefined ? children : null;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
