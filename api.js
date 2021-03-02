const modtask = () => {};
modtask.request = (queryObject, cb) => {
    const domain = queryObject.domain || 'api.mindflash.com';
    const url = `https://${domain}${queryObject.path}`;
    const method = queryObject.method || 'GET';
    let { body } = queryObject;
    if (typeof(body) == 'object') {
        try {
            body = JSON.stringify(body);
        } catch(e) {
            console.log(`error serializing JSON body: ${e.message}`);
            return ;
        }
    }
    modtask.doChain([
        ['log', '-------------------------------------------'],
        ['log', `${method} ${url}`],
        ['net.httprequest', {
            url,
            method,
            headers: {
                'x-mindflash-apikey': queryObject.key,
                'content-type': 'application/json'
            },
            body
        }],
        chain => {
            const { status, responseText } = chain.get('outcome');
            if (status != 200) {
                console.log(`Returned status ${status} which is not 200.`);
            } else {
                console.log(`API call successful.`);
            }
            console.log('Response below:');
            console.log(responseText);
        },
        ['outcome', { success: true }]
    ])
}
