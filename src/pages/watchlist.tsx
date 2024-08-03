import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


interface StockItem {
  priceChange: number;
  currentPrice: number;
  symbol: string;
  longName: string;
  previousClose:number;
}

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookies] = useCookies(['userEmail']);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!cookies.userEmail) {
        setError('Please Login to see your Watchlist');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/get-watchlist?email=${cookies.userEmail}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Raw watchlist data:', data);

          let symbols: string[];
          if (Array.isArray(data.symbols)) {
            symbols = data.symbols;
          } else if (typeof data.symbols === 'string') {
            // If it's a single string, wrap it in an array - Was errored out when there only one item in the list
            symbols = [data.symbols];
          } else {
            throw new Error('Unexpected watchlist format');
          }

          console.log('Processed watchlist symbols:', symbols);
          setWatchlist(symbols);
        } else {
          setError('Error fetching watchlist');
        }
      } catch (error) {
        console.error('Error in fetchWatchlist:', error);
        setError('Error fetching watchlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [cookies.userEmail]);

  useEffect(() => {
    const fetchStockDetails = async () => {
     
      const stockDetails: StockItem[] = [];

      for (const symbol of watchlist) {
        try {
          const response = await fetch(`/stock/${symbol}`);
          if (response.ok) {
            const data = await response.json();
            stockDetails.push({
              symbol: data.symbol,
              longName: data.longName,
              currentPrice: data.currentPrice,
              priceChange: data.priceChange,
              previousClose: data.previousClose
            });
          } else {
            console.error(`Error fetching stock details for symbol: ${symbol}`);
          }
        } catch (error) {
          console.error(`Error fetching stock details for symbol: ${symbol}`, error);
        }
      }

      console.log('Final stock details:', stockDetails);
      setStocks(stockDetails);
    };

    if (watchlist.length > 0) {
      fetchStockDetails();
    } else {
    }
  }, [watchlist]);

  if (loading) {
    return <div className="top-trending"><p className="h3">Loading...</p></div>;
  }

  if (error) {
    return <div  className="top-trending"><p className="h3">{error}</p></div>;
  }

  const handleInputChange = (symbol: string) => {
    navigate(`/symbol/${symbol}`);
  };

 
  return (
    <div className="top-trending">
      <h1 className="cp">Watchlist</h1>
      <hr />
      <hr />
      {stocks.length > 0 ? (
        stocks.map((watchlistItem) => (
          <div className="wrapper"
            key={watchlistItem.symbol}
            onClick={() => handleInputChange(watchlistItem.symbol)}>
            <div className="h3">{watchlistItem.symbol}</div>
            <div className="h5">{watchlistItem.currentPrice}</div>
            <div className="h4">{watchlistItem.longName}</div>
            <div className="positive h6">{(watchlistItem.currentPrice - watchlistItem.previousClose).toFixed(3)}</div>
            
            <hr />
            <hr />
          </div>
        ))
      ) : (
        <p className="h3">Watchlist is Empty</p>
      )}
    </div>
  );
};

export default Watchlist;