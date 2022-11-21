import Loading from '../components/Loading';
import useDetails from './../hooks/useDetails';
const Details = () => {
 // custom hook to getting the post details > record
 const { loading, error, record } = useDetails();

 return (
  <>
   <Loading loading={loading} error={error}>
    <h1>{record?.title}</h1>
    <p>{record?.desc}</p>
   </Loading>
  </>
 );
};

export default Details;
