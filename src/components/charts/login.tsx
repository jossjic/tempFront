import { useState } from "react";
import Bunnies from "./bunnies";
import BunniesStatic from "./bunnies-static";

const Login = () => {
  const [populationData, setPopulationData] = useState([]);
  const [birthRate, setBirthRate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setBirthRate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/bunnies/', {
        method: 'POST', // Specify the request method
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({ 'Birth Rate': parseFloat(birthRate) }),
      });

      // Check if the request was successful (status code in the range 200-299)
      if (response.ok) {
        const json = await response.json();
        console.log('response', json);
        setPopulationData(json['Population']);
      } else {
        // Handle errors, if any
        console.error('Failed to fetch data:', response.status, response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <h1>Population Chart</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Birth Rate:
          <input
            type="number"
            step="0.01"
            value={birthRate}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {populationData.length > 0 ? (
        <Bunnies data={populationData} />
      ) : (
        <p>{loading ? 'Loading data...' : 'Please submit a birth rate to see the data.'}</p>
      )}
    </div>
  );
};

export default Login;
