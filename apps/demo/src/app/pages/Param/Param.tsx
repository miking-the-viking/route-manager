import { useParams } from 'react-router-dom';

export default () => {
  const params = useParams();

  const entries = Object.entries(params);
  const list = entries.map(([key, val]) => (
    <p key={key}>
      {key}:{val}
    </p>
  ));
  return <>{list} </>;
};
