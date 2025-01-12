import { Link, Redirect, withRouter, } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import {  useSetRecoilState } from "recoil";
import { useQuery } from "react-query";
import { fetchCoins } from "../../api/api";
import { isDarkAtom } from "../../../atoms";
import axios from 'axios';
import { useEffect } from "react";




const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
`

const Container = styled.div`
  padding: 1px 20px;
  width: 460px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;

  
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Title = styled.h1`
  font-size: 48px;
  color: gold;
  font-weight: 700;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const LoggedButton = styled.button`
background-color: ${(props) => props.theme.cardBgColor};
color: ${(props) => props.theme.textColor};
border-radius: 15px;

border: 0px solid white;
padding: 10px;
transition: color 0.2s ease-in;
display: flex;
align-items: center;
`;

const Button = styled.button`
background-color: ${(props) => props.theme.cardBgColor};
color: ${(props) => props.theme.textColor};
border-radius: 15px;
border: 0px solid white;
padding: 10px;
transition: color 0.2s ease-in;
display: flex;
align-items: center;
`;

 /*interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}*/





function Home(props){
  console.log(props)
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery("allcoins", fetchCoins)
  /*  const [coins, setCoins] = useState<CoinInterface[]>([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
       (async () => {
           const response = await axios.get("https://api.coinpaprika.com/v1/coins");
           setCoins(response.data.slice(0, 100));
           setLoading(false);
       })();
   }, []); */
   

   useEffect(() => {
    axios.get('/api/hello')
        .then(response => { console.log(response)})
}, [])

const onClickHandler = () => {
  axios.get('/api/users/logout')
      .then(response => {
          if (response.data.success) {
              props.history.push("/")
          } else {
              alert('로그아웃 하는데 실패 했습니다.')
          }
      })
      
}

  return (
    <Wrapper>
      <Header>
      <LoggedButton onClick={onClickHandler}>
              로그아웃
            </LoggedButton>
        <Title>SKYROKET</Title>
            <Button onClick={toggleDarkAtom}>Dark Mode</Button>
      </Header>
      <Container>
       
        {isLoading ? (
          <Loader>코인떡상중</Loader>
        ) : (
          <CoinsList>
            {data?.slice(0, 100).map((coin) => (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            ))}
          </CoinsList>
        )}
      </Container>
    </Wrapper>


  );
}
export default withRouter(Home)