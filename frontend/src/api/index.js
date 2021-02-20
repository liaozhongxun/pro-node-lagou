let BaseUrl = "";
let Token = "";

/**
 * options
 *      Url
 *      Method
 *      data
 *      async
 */

let ajax = (options) => {
    try {
        Token = JSON.parse(localStorage.getItem("userInfo")).token;
        if (!Token) {
            Token = "null";
        }
    } catch (error) {
        Token = "null";
    }

    return new Promise((resolve, reject) => {
        $.ajax({
            url: BaseUrl + options.Url,
            type: options.Method || "POST",
            data: options.data || {},
            async: options.Async || true,
            headers: {
                "X-Access-Token": Token,
            },
            success: (res) => {
                resolve(res);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};

export { ajax };
