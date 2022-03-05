//REACT
import { useState, useEffect, useRef, useCallback, } from 'react';
//MAIN COMPONENTS
import Layout from 'components/layout';
import Pin from 'components/pin';
import Template from 'components/template';
import Loader from 'components/loader';
import MyLoder from 'components/myLoder';
import Button from 'components/modal-area';
import useFetch from 'utils/useFetch';

// working with axios for fetching data
import http from '../controllers/http'


const HomePage = ({ data, maxPages }) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { loading, error, list } = useFetch(query, page, maxPages);
  const loader = useRef(null);
  const foucsOn = useRef(null);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && page < maxPages && !loading) {
      setPage((prev) => prev + 1);
    }
  }, []);

  //use effect section
  useEffect(() => {
    // prevent scrolling to the bottom the page
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);
  const Comp = () => {
    if (error) return <div>Error !!</div>;
    // else if (!isLoaded) return <Loader />;
    else
      return (
        <Template>
          {list.map((e, index) => {
            return <Pin
              key={e.slug}
              className='pin'
              title={e.name}
              desc={e.rating}
              image={e.thumbnail}
              href={'http://google.com.tr'}
              withTitle
              slug={e.slug}
            />
          }
          )}
        </Template>
      );
  };

  return (
    <Layout>
      <Comp />
      {loading && <MyLoder />}
      {error && <p>Error..!</p>}
      {page <= maxPages && <div ref={loader} />}
    </Layout>
  );
};
export default HomePage;


// make a server side request using get ServerSideProps
export async function getServerSideProps() {
  const res = await http.get(`/recipes/recipes-list/`);
  const data = await res.data;
  return {
    props: {
      data: data.data,
      maxPages: data.max_pages,
    },
  };
}