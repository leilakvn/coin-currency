import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Coin from "../Coin";
import { PER_PAGE } from "../constants";
export function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(200);
  const [offset, setOffset] = useState(-PER_PAGE);
  const isEmptyCoin = !coins || coins.length === 0;
  const fetchCoins = async () => {
    setLoading(true);
    const newOffset = offset + PER_PAGE;
    const response = await axios
      .get("https://api.coincap.io/v2/assets", {
        params: { limit: PER_PAGE, offset: newOffset },
      })
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data.data) {
      const newCoins = [...coins, ...response.data.data];
      await wait(1000);
      if (newCoins.length >= totalCount) setHasMore(false);
      setCoins(newCoins);
      console.log(newCoins);
      setOffset(newOffset);
    }
    setLoading(false);
  };
  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchCoins}
        hasMore={hasMore}
        initialLoad={true}
        loader={
          <div
            style={{ marginRight: "auto", marginLeft: "auto", display: "flex" }}
            key={0}
          >
            Loading ...
          </div>
        }
      >
        {!isEmptyCoin &&
          coins.map((coin, index) => (
            <Coin key={index} rank={coin.rank} name={coin.name}></Coin>
            // coin.name
          ))}
      </InfiniteScroll>
    </>
  );
}
