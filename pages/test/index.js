import axios from 'axios';

const Index = ({ mezigzs }) => (
  <>
    {/* Create a card for each pet */}
    {mezigzs.map((mezigz) => (
      <p>{mezigz.firstName}</p>
    ))}
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3020/api/mezigzs/');

  return {
    props: {
      mezigzs: res.data,
    },
  };
}

export default Index;
