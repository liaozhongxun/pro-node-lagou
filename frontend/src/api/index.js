let BaseUrl = "";

/**
 * options
 *      Url
 *      Method
 *      data
 *      async
 */
let ajax = (options) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: BaseUrl + options.Url,
            type: options.Method || "POST",
            data: options.data || {},
            async: options.async || true,
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
