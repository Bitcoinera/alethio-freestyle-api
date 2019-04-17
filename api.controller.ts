export async function get_smart_contracts_by_transaction(req, res, next) {
    const hash = '0xe3a18b08b5fa88a63a5dfe686437f038e19af4e97b738f120888c6a782fa2249';
    const base_url = process.env.BASE_URL;
    http.get(`${base_url}/transactions/${hash}/contractMessages`, res => { console.log(res)});
    res
        .json( http.get(`${base_url}/transactions/${hash}/contractMessages`) )
}