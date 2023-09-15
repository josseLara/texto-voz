import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create( { 
     baseURL: import.meta.env.VITE_HOST, 
      headers :{
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': import.meta.env.API_KEY,
          'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com'
        }
} );

axiosInstance.interceptors.response.use(
     ( res ) => res,
     ( error ) => Promise.reject( ( error.response && error.response.data ) || 'Something went wrong' )
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async ( args ) => {
     const [url,body] = Array.isArray( args ) ? args : [args];
     const encoded = encodedParamsHandler(body);
     const res = await axiosInstance.post( url,encoded );

     return res.data;
};

// -----------------------------------------------------------------------
const encodedParamsHandler = ({mensaje,idioma}) => {
     const encodedParams = new URLSearchParams();
     encodedParams.set( 'voice_code', idioma ?? 'en-US-1' );
     encodedParams.set( 'text', mensaje ?? 'MESSAGE' );
     encodedParams.set( 'speed', '1.00' );
     encodedParams.set( 'pitch', '1.00' );
     encodedParams.set( 'output_type', 'audio_url' );

     return encodedParams;
}


