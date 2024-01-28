import axios from 'lib/axios'
import { useNavigate, useParams } from 'react-router-dom';

export const useAuth = () => {
    let navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const login = async ({ setErrors, setSuccessResponse, ...props}) => {
        await csrf()
        axios
            .post('/login', props)
            .then(() => {
                  setSuccessResponse();
                  navigate('/dashboard2');
              })
            .catch(error => {
                navigate('/dashboard3');
                setErrors(error);
            })
    }

    const register = async ({ setErrors, setSuccessResponse, ...props}) => {
      await csrf()
      axios
          .post('/register', props)
          .then(() => {
                setSuccessResponse();
                navigate('/dashboard');
            })
          .catch(error => {
              setErrors(error);
          })
  }

    return {
        login,
        register
    }
}