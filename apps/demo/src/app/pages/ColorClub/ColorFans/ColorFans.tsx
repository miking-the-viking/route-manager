import { useParams } from 'react-router-dom';

const ColorFans: React.FC = () => {
  const { color } = useParams();

  return (
    <div>
      <h3>Color Fans for {color}</h3>
      <p>Hey Fans will be listed here:</p>
    </div>
  );
};

export default ColorFans;
