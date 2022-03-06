/**
 *  options
 *  method: 'POST', // *GET, POST, PUT, DELETE, etc.
 *  mode: 'cors', // no-cors, *cors, same-origin
 *  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 *  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 *  headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
 *  redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
 *
 */
const initialOption = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}
async function enhancedFetch(input, option = {}) {
  const enhancedOption = {
    ...initialOption,
    ...option,
  };
  if (option.body) {
    enhancedOption.body = JSON.stringify(option.body);
  }
  let response = null;

  try {
    response = await fetch(input, enhancedOption);
    // fetch 只有网络错误或者无法连接时才会报错 其他情况都不会报错而是认为请求成功
    // 可以根据状态码或者ok判断
    console.log(response, 'fetch');
    if (response.ok) {
      return response;
    }
    throw new Error(response.statusText);
  } catch (e) {
    return Promise.reject(e.message? e.message : response)
  }
}

export default enhancedFetch;