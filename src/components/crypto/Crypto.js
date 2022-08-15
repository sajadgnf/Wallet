import React, { useEffect, useState } from 'react'

// component
import Coin from './Coin'

// funciton
import Pagination from '../shared/Pagination'

// api
import { getCoin } from '../../services/api'

// styles
import styles from "./Crypto.module.css"
import { Audio } from 'react-loader-spinner'

const Crypto = () => {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [coinsPerPage, setCoinsPerPage] = useState(20)

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await getCoin())
        }

        fetchAPI()
    }, [])

    const searchHnadler = event => {
        setSearch(event.target.value)
    }

    const searchCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    const indexOfLastPage = currentPage * coinsPerPage
    const indexOfFirstPage = indexOfLastPage - coinsPerPage
    const currentCoins = searchCoins.slice(indexOfFirstPage, indexOfLastPage)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    const changePage = (event, number) => {
        if (event.target.classList.contains("prev")) {
            setCurrentPage((oldPage) => {
                let prevPage = oldPage - 1
                if (prevPage < 1) {
                    prevPage = number
                }
                return prevPage
            })
        }
        else {
            setCurrentPage((oldPage) => {
                let nextPage = oldPage + 1
                if (nextPage > number) {
                    nextPage = 1
                }
                return nextPage
            })
        }
    }

    return (
        <div className={styles.mainContainer}>
            <input className={styles.search} type="text" placeholder="Search" value={search} onChange={searchHnadler} />
            {
                coins.length ?
                    <div>
                        <div className={styles.container}>
                            {
                                currentCoins.map(coin => <Coin key={coin.id}
                                    image={coin.image}
                                    name={coin.name}
                                    price={coin.current_price}
                                    symbol={coin.symbol}
                                    marketCap={coin.market_cap}
                                    priceChanges={coin.market_cap_change_percentage_24h}
                                />)
                            }
                        </div>
                        <div className={styles.paginateContainer}>
                            <Pagination
                                totalCoins={searchCoins.length}
                                coinsPerPage={coinsPerPage}
                                currentPage={currentPage}
                                paginate={paginate}
                                changePage={changePage}
                            />
                        </div>
                    </div> :
                    <Audio color='#333' />
            }
        </div>
    )
}

export default Crypto