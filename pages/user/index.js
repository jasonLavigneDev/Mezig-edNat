import axios from 'axios';

const Index = ({ mezigs }) => (
  <>
    {/* Create a card for each pet */}
    {mezigs.data.map((mezigs) => (
      <p key={mezigs.firstName}>{mezigs.firstName}</p>
    ))}
  </>
);

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  const res = await axios.get('http://localhost:3020/api/mezigs/');

  return {
    props: {
      mezigs: res.data,
    },
  };
}

export default Index;
